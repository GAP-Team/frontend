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
// not have to match the profile (letterhead, footer). Only ways to contact the
// sender are removed. The company name, bank details (IBAN, BIC) and tax
// identifiers (USt-IdNr, Steuernummer, Finanzamt) stay in the document.
// Phone numbers are only matched when labelled ("Tel.", "Mobil", ...) or
// written with an international prefix, so dates and offer numbers survive;
// the label goes with the number.
const CITY =
  "[A-ZÄÖÜ][\\wäöüß-]*(?:\\s+(?:am|an der|im|bei|ob der)\\s+[A-ZÄÖÜ][\\wäöüß-]*)?";
// A country written after the address goes with it.
const COUNTRY =
  "(?:Deutschland|Germany|Allemagne|Alemania|Österreich|Austria|Schweiz|Switzerland)";
const COUNTRY_SUFFIX = `(?:[\\s,.-]*\\b${COUNTRY}\\b)?`;
// Labels in front of a contact value are removed together with it.
const EMAIL_LABEL = "(?:\\b(?:e-?\\s?mail|mail)\\.?\\s*:?\\s*)?";
const WEBSITE_LABEL =
  "(?:\\b(?:website|web\\s?site|webseite|homepage|internet|web|url)\\.?\\s*:?\\s*)?";
const GENERIC_PATTERNS: RegExp[] = [
  new RegExp(`${EMAIL_LABEL}[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}`, "gi"), // E-Mail
  /\b(?:tel(?:efon)?|mobil(?:e)?|handy|fax|phone|fon)(?:\s*(?:nummer|number|no|nr))?\.?\s*:?\s*\+?[\d \t/().-]*\d/gi,
  /(?:\+|\b00)\d{1,3}(?:[\s/.-]*\(0\))?[\d\s/().-]{6,}\d/g,
  new RegExp(`${WEBSITE_LABEL}\\bhttps?:\\/\\/[^\\s<>"]+`, "gi"), // Website
  new RegExp(`${WEBSITE_LABEL}\\bwww\\.[^\\s<>"]+`, "gi"),
  new RegExp(
    `${WEBSITE_LABEL}\\b[a-z0-9-]+(?:\\.[a-z0-9-]+)*\\.(?:de|com|net|org|eu|info|biz|at|ch)\\b\\/?[^\\s<>"]*`,
    "gi"
  ),
  // Address in the sender line above the recipient: only what follows the
  // company ("Firma GmbH, Musterstr. 2, 12345 Stadt" -> "Musterstr. 2, 12345 Stadt").
  new RegExp(
    `(?<=\\b(?:GmbH|mbH|UG|AG|KG|OHG|GbR|e\\.?\\s?K\\.?)\\s*,\\s*)[^,\\n]*\\d+\\s?[a-z]?\\s*,\\s*\\d{5}\\s+${CITY}${COUNTRY_SUFFIX}`,
    "g"
  ),
];

// Street and ZIP + city without a known company in front of them. They are
// only applied to the small print in the footer, because the recipient's
// address in the body must stay.
const STREET_SUFFIX =
  "(?:stra(?:ß|ss)e|str\\.|weg|allee|platz|ring|promenade|gasse|ufer|damm|chaussee|markt|hof|park|steig|pfad|wall|kamp)";
const FOOTER_ADDRESS_PATTERNS: RegExp[] = [
  new RegExp(
    `\\b[A-ZÄÖÜ][\\wäöüß-]*${STREET_SUFFIX}\\s*\\d+\\s?[a-z]?\\b`,
    "gi"
  ),
  new RegExp(
    `\\b(?:Am|An der|An den|Auf dem|Im|In der|Zum|Zur)\\s+[A-ZÄÖÜ][\\wäöüß-]*\\s+\\d+\\s?[a-z]?\\b`,
    "g"
  ),
  new RegExp(`\\b\\d{5}\\s+${CITY}${COUNTRY_SUFFIX}`, "g"),
  new RegExp(`\\b${COUNTRY}\\b`, "g"),
];

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Spaces match any whitespace, since a value can wrap across lines in a PDF.
const flexibleSpaces = (escaped: string): string =>
  escaped.replace(/\s+/g, "\\s+");

// "Musterstraße", "Musterstrasse" and "Musterstr." are the same street.
const streetVariants = (escaped: string): string =>
  escaped.replace(/stra(?:ß|ss)e|str\\\./gi, "(?:straße|strasse|str\\.?)");

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
    address?.country,
  ].filter((value): value is string => Boolean(value?.trim()));

  const specific = texts.map(
    (value) =>
      new RegExp(
        streetVariants(flexibleSpaces(escapeRegExp(value.trim()))),
        "gi"
      )
  );
  const phone = user.company?.phonenumber
    ? phonePattern(String(user.company.phonenumber))
    : null;
  return [...GENERIC_PATTERNS, ...specific, ...(phone ? [phone] : [])];
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

// The bottom strip of a page is the letterhead footer. Only the sender's
// address is removed there (street and ZIP + city, found by their shape);
// everything else in it stays. Body text is never touched by this rule.
const FOOTER_ZONE = 0.12;

export const collectFooterBoxes = (
  items: PdfTextItem[],
  viewport: { convertToViewportPoint: (x: number, y: number) => number[] },
  page: { bottom: number; height: number }
): Box[] => {
  const limit = page.bottom + page.height * FOOTER_ZONE;
  return items
    .filter((item) => item.str.trim() && item.transform[5] < limit)
    .flatMap((item) =>
      findMatchRanges(item.str, FOOTER_ADDRESS_PATTERNS).map((range) =>
        itemBox(item, viewport, range)
      )
    );
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
