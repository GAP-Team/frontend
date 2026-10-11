import { UserCompany } from "@/screens/admin/users/types";

export interface RedactionSource {
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: Partial<UserCompany>;
}

const RENDER_SCALE = 2;
const BOX_PADDING = 2;

// Phone numbers are only matched when labelled ("Tel.", "Mobil", ...) or
// written with an international prefix, so dates and offer numbers survive.
const GENERIC_PATTERNS: RegExp[] = [
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, // E-Mail
  /(?<=(?:tel(?:efon)?|mobil(?:e)?|handy|fax|phone|fon)\.?\s*:?\s*)\+?\d[\d\s/().-]{5,}\d/gi,
  /(?:\+|\b00)\d{1,3}(?:[\s/.-]*\(0\))?[\d\s/().-]{6,}\d/g,
  /\bhttps?:\/\/[^\s<>"]+/gi, // Website
  /\bwww\.[^\s<>"]+/gi,
  /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:de|com|net|org|eu|info|biz|at|ch)\b\/?[^\s<>"]*/gi,
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
    height: height + BOX_PADDING * 2,
  };
};

const collectBoxes = (
  items: PdfTextItem[],
  patterns: RegExp[],
  viewport: { convertToViewportPoint: (x: number, y: number) => number[] }
): Box[] => {
  let text = "";
  const spans = items.map((item) => {
    const start = text.length;
    text += item.str + " ";
    return { start, end: start + item.str.length };
  });
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
    collectBoxes(content.items as PdfTextItem[], patterns, viewport).forEach(
      (box) => context.fillRect(box.x, box.y, box.width, box.height)
    );

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
