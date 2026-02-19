/**
 * Build verses.json from verse-refs.json by fetching KJV text.
 * Run: node scripts/build-verses.mjs
 * Output: src/data/verses.json (KJV only; kr to be filled from 흠정역 한글성경전서)
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const KJV_BASE = "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master";

const refsPath = join(ROOT, "src/data/verse-refs.json");
const categoriesPath = join(ROOT, "src/lib/types.ts");

const refs = JSON.parse(readFileSync(refsPath, "utf-8"));

const CATEGORY_LABELS = {
  "prayer-conversation": "기도란 하나님과의 대화",
  "god-near": "하나님은 가까이 계심 / 항상 기다리심",
  "first-prayer-seek": "첫 기도와 하나님 찾기",
  "seek-to-end": "끝까지 찾아올 것",
  "time-space-limited": "시공간 제한과 기도로 이끄심",
  "death-eternal-life": "죽음, 두려움, 영생",
  "sin-salvation-mercy": "죄, 구원, 자비",
  "faith-as-gift": "믿음은 선물",
  "pray-for-faith": "믿음을 구하는 기도 (끈질기게)",
  "kingdom-first": "나라와 의를 먼저 / 먹고 사는 것으로 구하지 말 것",
  "lords-prayer": "주기도문 (형식이 아닌 내용으로)",
  "no-vain-repetition": "헛된 반복 금지",
  "pray-without-ceasing": "끊임없이 기도 / 24시간 연결",
  "spirit-helps-prayer": "성령이 우리를 위해 기도하심",
  "pray-for-church": "교회·목회자·성도를 위한 기도",
  "persecution-stand-firm": "핍박과 당당히 서기",
  "pauls-thorn-grace": "바울의 가시 / 은혜가 충분함",
  "widow-mite-portion": "과부의 두 레pta / 적절한 분량",
  "no-pray-escape-persecution": "핍박 피하려는 기도 금지",
  "wisdom-kingdom": "나라를 위한 지혜 구함",
  "prayer-education": "기도의 교육적 목적",
};

function bookToFileName(book) {
  return book.replace(/\s+/g, "") + ".json";
}

const bookCache = new Map();

async function fetchBook(book) {
  const key = book.replace(/\s+/g, "");
  if (bookCache.has(key)) return bookCache.get(key);
  const name = bookToFileName(book);
  const url = `${KJV_BASE}/${name}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch ${name}: ${res.status}`);
  const data = await res.json();
  bookCache.set(key, data);
  return data;
}

function getVerse(data, chapter, verse) {
  const ch = data.chapters.find((c) => c.chapter === String(chapter));
  if (!ch) return null;
  const v = ch.verses.find((v) => v.verse === String(verse));
  return v?.text ?? null;
}

const entries = [];
const verseCache = new Map();

for (const r of refs) {
  const refKey = `${r.book} ${r.chapter}:${r.verse}`;
  let kjv = verseCache.get(refKey);
  if (kjv === undefined) {
    const data = await fetchBook(r.book);
    kjv = getVerse(data, r.chapter, r.verse) || "";
    verseCache.set(refKey, kjv);
  }
  if (!kjv) console.warn("Missing verse:", refKey);
  entries.push({
    ref: refKey,
    book: r.book,
    chapter: r.chapter,
    verse: r.verse,
    categoryId: r.categoryId,
    categoryLabel: CATEGORY_LABELS[r.categoryId] || r.categoryId,
    kjv: kjv || "",
    kr: "",
  });
}

// Sort by category order then by ref
const order = Object.keys(CATEGORY_LABELS);
entries.sort((a, b) => {
  const oa = order.indexOf(a.categoryId);
  const ob = order.indexOf(b.categoryId);
  if (oa !== ob) return oa - ob;
  if (a.book !== b.book) return a.book.localeCompare(b.book);
  if (a.chapter !== b.chapter) return a.chapter - b.chapter;
  return a.verse - b.verse;
});

const outPath = join(ROOT, "src/data/verses.json");
writeFileSync(outPath, JSON.stringify(entries, null, 2), "utf-8");
console.log("Wrote", entries.length, "verses to", outPath);
