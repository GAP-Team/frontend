import { UserCompany } from "@/screens/admin/users/types";

export interface RedactionSource {
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: Partial<UserCompany>;
}

const RENDER_SCALE = 2;
const LINE_TOLERANCE = 2;
// Letters like g, p, ü reach below the baseline; the box covers them too.
const DESCENT_RATIO = 0.3;
const BOX_PADDING = 2;

// Contact data is detected from the document itself, because an offer does
// not have to match the profile (letterhead, footer). Phone numbers are only
// matched when labelled ("Tel.", "Mobil", ...) or written with an international
// prefix, so dates and offer numbers survive; the label goes with the number.
const GENERIC_PATTERNS: RegExp[] = [
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, // E-Mail
  /\b(?:tel(?:efon)?|mobil(?:e)?|handy|fax|phone|fon)\.?\s*:?\s*\+?[\d\s/().-]*\d/gi,
  /(?:\+|\b00)\d{1,3}(?:[\s/.-]*\(0\))?[\d\s/().-]{6,}\d/g,
  /\bhttps?:\/\/[^\s<>"]+/gi, // Website
  /\bwww\.[^\s<>"]+/gi,
  /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:de|com|net|org|eu|info|biz|at|ch)\b\/?[^\s<>"]*/gi,
  // Sender line above the recipient: "Firma GmbH, Musterstr. 2, 12345 Stadt"
  /[^\n,]*?\b(?:GmbH|mbH|UG|AG|KG|OHG|GbR|e\.?\s?K\.?)\s*,\s*[^,\n]*\d+\s?[a-z]?\s*,\s*\d{5}\s+[A-ZÄÖÜ][\wäöüß-]*(?:\s+(?:am|an der|im|bei|ob der)\s+[A-ZÄÖÜ][\wäöüß-]*)?/g,
  // Bank and tax identifiers of the sender
  /\bIBAN\s*:?\s*[A-Z]{2}\d{2}(?:\s?[A-Z0-9]{4}){2,7}(?:\s?[A-Z0-9]{1,4})?\b/gi,
  /\b(?:BIC|SWIFT)\s*:?\s*[A-Z]{6}[A-Z0-9]{2}(?:[A-Z0-9]{3})?\b/gi,
  /\b[A-Z]{2}\d{2}(?:\s?[A-Z0-9]{4}){3,7}(?:\s?[A-Z0-9]{1,4})?\b/g,
  /\bUSt-?\s?Id\.?-?\s?Nr\.?\s*:?\s*[A-Z]{2}\s?\d{8,11}/gi,
  /\b(?:Steuer(?:nummer|-Nr\.?)|St\.?-?Nr\.?)\s*:?\s*[\d/ ]{8,}\d/gi,
  /\bFinanzamt\s+[A-ZÄÖÜ][\wäöüß-]*/g,
  /\bHR[AB]\s*\d+(?:\s*[A-Z]{1,2})?/g,
];

const LEGAL_FORMS =
  "(?:&\\s*Co\\.?\\s*)?(?:GmbH|UG(?:\\s*\\(haftungsbeschränkt\\))?|AG|KGaA|KG|OHG|GbR|e\\.?\\s?K\\.?|mbH|SE)(?![\\wäöüß])";
const LEGAL_FORM_SUFFIX = new RegExp(`(?:\\s*,?\\s*${LEGAL_FORMS})+\\s*$`, "i");

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Spaces match any whitespace, since a value can wrap across lines in a PDF.
const flexibleSpaces = (escaped: string): string =>
  escaped.replace(/\s+/g, "\\s+");

// "Musterstraße", "Musterstrasse" and "Musterstr." are the same street.
const streetVariants = (escaped: string): string =>
  escaped.replace(/stra(?:ß|ss)e|str\\\./gi, "(?:straße|strasse|str\\.?)");

// The company is matched with or without its legal form, and any legal form
// that follows the name is removed with it ("Volker" / "Volker GmbH & Co. KG").
const companyPattern = (name: string): RegExp => {
  const base = name.replace(LEGAL_FORM_SUFFIX, "").trim() || name.trim();
  return new RegExp(
    `${flexibleSpaces(escapeRegExp(base))}(?:\\s*,?\\s*${LEGAL_FORMS})*`,
    "gi"
  );
};

// Tolerates spaces, slashes and dashes between digits, a "(0)" after the
// country code, and a missing leading 0 / country code (the phone number is
// stored as a number).
const phonePattern = (phone: string): RegExp | null => {
  const digits = phone.replace(/\D/g, "").replace(/^(?:0049|49|0)/, "");
  if (digits.length < 6) return null;
  return new RegExp(
    `(?:(?:\\+|00)\\d{1,3}[\\s/.-]*(?:\\(0\\))?|0)?[\\s/().-]*${digits.split("").join("[\\s/.-]?")}`,
    "g"
  );
};

export const buildRedactionPatterns = (user: RedactionSource): RegExp[] => {
  const address = user.company?.address;
  const { firstName, lastName } = user;
  const texts = [
    user.email,
    firstName && lastName ? `${firstName} ${lastName}` : undefined,
    firstName && lastName ? `${lastName}, ${firstName}` : undefined,
    address?.street && address?.houseNo
      ? `${address.street} ${address.houseNo}`
      : address?.street,
    address?.zip && address?.city
      ? `${address.zip} ${address.city}`
      : undefined,
  ].filter((value): value is string => Boolean(value?.trim()));

  const specific = texts.map(
    (value) =>
      new RegExp(
        streetVariants(flexibleSpaces(escapeRegExp(value.trim()))),
        "gi"
      )
  );
  const company = user.company?.name?.trim()
    ? [companyPattern(user.company.name)]
    : [];
  const phone = user.company?.phonenumber
    ? phonePattern(String(user.company.phonenumber))
    : null;
  return [
    ...GENERIC_PATTERNS,
    ...specific,
    ...company,
    ...(phone ? [phone] : []),
  ];
};

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PdfTextItem {
  str: string;
  transform: number[];
  width: number;
  height: number;
}

// Maps match ranges of the concatenated page text back to text item boxes.
export const findMatchRanges = (
  text: string,
  patterns: RegExp[]
): [number, number][] => {
  const ranges: [number, number][] = [];
  for (const pattern of patterns) {
    for (const match of text.matchAll(new RegExp(pattern))) {
      ranges.push([match.index ?? 0, (match.index ?? 0) + match[0].length]);
    }
  }
  return ranges;
};

const itemBox = (
  item: PdfTextItem,
  viewport: { convertToViewportPoint: (x: number, y: number) => number[] },
  [from, to]: [number, number]
): Box => {
  const charWidth = (item.width * RENDER_SCALE) / Math.max(item.str.length, 1);
  const [x, y] = viewport.convertToViewportPoint(
    item.transform[4],
    item.transform[5]
  );
  const height = (item.height || Math.abs(item.transform[3])) * RENDER_SCALE;
  return {
    x: x + from * charWidth - BOX_PADDING,
    y: y - height - BOX_PADDING,
    width: (to - from) * charWidth + BOX_PADDING * 2,
    height: height * (1 + DESCENT_RATIO) + BOX_PADDING * 2,
  };
};

// Items on the same baseline are joined with a space, items on another line
// with a newline, so patterns can tell a line from the whole page.
export const joinItems = (
  items: PdfTextItem[]
): { text: string; spans: { start: number; end: number }[] } => {
  let text = "";
  const spans = items.map((item, i) => {
    const start = text.length;
    const next = items[i + 1];
    const sameLine =
      !next || Math.abs(next.transform[5] - item.transform[5]) < LINE_TOLERANCE;
    text += item.str + (sameLine ? " " : "\n");
    return { start, end: start + item.str.length };
  });
  return { text, spans };
};

const collectBoxes = (
  items: PdfTextItem[],
  patterns: RegExp[],
  viewport: { convertToViewportPoint: (x: number, y: number) => number[] }
): Box[] => {
  const { text, spans } = joinItems(items);
  const ranges = findMatchRanges(text, patterns);
  return items.flatMap((item, i) =>
    ranges
      .filter(([from, to]) => spans[i].start < to && spans[i].end > from)
      .map(([from, to]): Box => {
        const start = Math.max(from - spans[i].start, 0);
        const end = Math.min(to - spans[i].start, item.str.length);
        return itemBox(item, viewport, [start, end]);
      })
  );
};

// Small print in the bottom strip of a page is the letterhead footer (address,
// phone, bank and tax data of the sender); page numbers are kept.
const FOOTER_ZONE = 0.12;
const FOOTER_FONT_RATIO = 0.85;
const PAGE_NUMBER = /^(?:seite|page)?\s*\d+\s*(?:\/|von|of)\s*\d+$/i;

const median = (values: number[]): number => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 0;
};

const fontSize = (item: PdfTextItem): number =>
  item.height || Math.abs(item.transform[3]);

export const collectFooterBoxes = (
  items: PdfTextItem[],
  viewport: { convertToViewportPoint: (x: number, y: number) => number[] },
  page: { bottom: number; height: number }
): Box[] => {
  const texts = items.filter((item) => item.str.trim());
  const bodySize = median(texts.map(fontSize));
  const limit = page.bottom + page.height * FOOTER_ZONE;
  return texts
    .filter(
      (item) =>
        item.transform[5] < limit &&
        fontSize(item) <= bodySize * FOOTER_FONT_RATIO &&
        !PAGE_NUMBER.test(item.str.trim())
    )
    .map((item) => itemBox(item, viewport, [0, item.str.length]));
};

/**
 * Removes the uploader's contact data (name, e-mail, phone, address, company)
 * from a PDF. Pages are re-rendered as images with the matches whited out, so
 * the original text cannot be recovered afterwards. Non-PDF files are
 * returned unchanged.
 */
export const redactContactData = async (
  file: File,
  user: RedactionSource
): Promise<File> => {
  if (file.type !== "application/pdf") return file;

  const [pdfjs, { PDFDocument }] = await Promise.all([
    import("pdfjs-dist"),
    import("pdf-lib"),
  ]);
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  const patterns = buildRedactionPatterns(user);
  const source = await pdfjs.getDocument({ data: await file.arrayBuffer() })
    .promise;
  const output = await PDFDocument.create();

  for (let pageNo = 1; pageNo <= source.numPages; pageNo++) {
    const page = await source.getPage(pageNo);
    const viewport = page.getViewport({ scale: RENDER_SCALE });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    await page.render({ canvasContext: context, viewport }).promise;
    const content = await page.getTextContent();
    context.fillStyle = "#fff";
    const items = content.items as PdfTextItem[];
    const [, bottom, , top] = page.view;
    [
      ...collectBoxes(items, patterns, viewport),
      ...collectFooterBoxes(items, viewport, {
        bottom,
        height: top - bottom,
      }),
    ].forEach((box) => context.fillRect(box.x, box.y, box.width, box.height));

    const image = await output.embedJpg(
      await fetch(canvas.toDataURL("image/jpeg", 0.85)).then((r) =>
        r.arrayBuffer()
      )
    );
    const base = page.getViewport({ scale: 1 });
    output
      .addPage([base.width, base.height])
      .drawImage(image, { x: 0, y: 0, width: base.width, height: base.height });
  }

  const bytes = await output.save();
  return new File([bytes], file.name, { type: "application/pdf" });
};
