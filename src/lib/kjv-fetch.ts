const KJV_BASE =
  "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master";

export type KJVBook = {
  book: string;
  chapters: Array<{
    chapter: string;
    verses: Array<{ verse: string; text: string }>;
  }>;
};

function bookToFileName(book: string): string {
  return book.replace(/\s+/g, "") + ".json";
}

const bookCache = new Map<string, KJVBook>();

export async function fetchKJVBook(book: string): Promise<KJVBook> {
  const key = book.replace(/\s+/g, "");
  if (bookCache.has(key)) return bookCache.get(key)!;
  const fileName = bookToFileName(book);
  const res = await fetch(`${KJV_BASE}/${fileName}`);
  if (!res.ok) throw new Error(`Failed to fetch ${fileName}: ${res.status}`);
  const data = (await res.json()) as KJVBook;
  bookCache.set(key, data);
  return data;
}

export function getVerseFromBook(
  data: KJVBook,
  chapter: number,
  verse: number
): string | null {
  const ch = data.chapters.find((c) => c.chapter === String(chapter));
  if (!ch) return null;
  const v = ch.verses.find((v) => v.verse === String(verse));
  return v?.text ?? null;
}

export async function getKJVVerse(
  book: string,
  chapter: number,
  verse: number
): Promise<string | null> {
  const data = await fetchKJVBook(book);
  return getVerseFromBook(data, chapter, verse);
}
