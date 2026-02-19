import versesData from "@/data/verses.json";
import { CATEGORIES } from "@/lib/types";
import type { VerseEntry } from "@/lib/types";
import LandingNav from "@/components/LandingNav";
import MobileNav from "@/components/MobileNav";

const verses = versesData as VerseEntry[];

function groupByCategory(entries: VerseEntry[]) {
  const order = CATEGORIES.map((c) => c.id);
  const map = new Map<string, VerseEntry[]>();
  for (const e of entries) {
    const list = map.get(e.categoryId) ?? [];
    list.push(e);
    map.set(e.categoryId, list);
  }
  return order
    .filter((id) => map.has(id))
    .map((id) => ({
      categoryId: id,
      label: CATEGORIES.find((c) => c.id === id)!.label,
      verses: map.get(id)!,
    }));
}

const groups = groupByCategory(verses);

const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 text-slate-900">
      {/* Left sidebar - fixed, scrollable nav */}
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 border-r border-slate-200/80 bg-white/80 px-3 py-6 backdrop-blur-sm lg:block">
        <LandingNav groups={groups.map((g) => ({ categoryId: g.categoryId, label: g.label }))} />
      </aside>

      {/* Main content - scrollable */}
      <main className="min-w-0 flex-1">
        {/* Hero */}
        <header className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 px-6 py-16 text-white shadow-xl sm:px-8 md:py-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
          <div className="relative mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight drop-shadow sm:text-4xl md:text-5xl">
              기도하는 방법
            </h1>
            <p className="mt-3 text-lg text-indigo-100 sm:text-xl">
              설교 말씀에 맞춘 KJV 성경 구절 · 흠정역 한글 대응 · 카테고리별 정리
            </p>
            <p className="mt-6 text-sm text-indigo-200/90">
              첫 기도, 나라와 의, 주기도문, 끊임없이 기도하기까지 — 한 페이지에서 찾아보세요.
            </p>
          </div>
        </header>

        {/* Mobile: horizontal nav to sections */}
        <div className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur-sm lg:hidden">
          <MobileNav groups={groups.map((g) => ({ categoryId: g.categoryId, label: g.label }))} />
        </div>

        {/* Sections */}
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          {groups.map((group, idx) => (
            <section
              key={group.categoryId}
              id={group.categoryId}
              className="scroll-mt-24 mb-14 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">
                  {idx + 1}
                </span>
                <h2 className="text-xl font-semibold text-slate-800">
                  {group.label}
                </h2>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/50">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/80">
                      <th className="px-4 py-3 font-semibold text-slate-600 w-28">
                        구절
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-600">
                        KJV
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-600">
                        흠정역 한글
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.verses.map((v) => (
                      <tr
                        key={`${v.ref}-${v.categoryId}`}
                        className="border-b border-slate-100 last:border-0 hover:bg-amber-50/50 transition-colors"
                      >
                        <td className="align-top px-4 py-3 font-medium text-indigo-700 whitespace-nowrap">
                          {v.ref}
                        </td>
                        <td className="align-top px-4 py-3 text-slate-800 leading-relaxed">
                          {v.kjv}
                        </td>
                        <td className="align-top px-4 py-3 text-slate-700 leading-relaxed">
                          {v.kr || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white/80 px-4 py-6 text-center text-xs text-slate-500 backdrop-blur-sm">
          KJV from public domain. 흠정역 한글성경전서는 해당 역본에서 직접 채워 넣어 주세요.
        </footer>
      </main>

      {/* Bottom-right: GitHub link */}
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg ring-2 ring-white/20 transition-all hover:scale-105 hover:bg-slate-800 hover:shadow-xl"
        aria-label="Open on GitHub"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
        GitHub
      </a>
    </div>
  );
}
