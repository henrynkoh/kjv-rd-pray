"use client";

type Group = { categoryId: string; label: string };

export default function MobileNav({ groups }: { groups: Group[] }) {
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-2 pt-2 lg:hidden scrollbar-hide">
      {groups.map((g) => (
        <button
          key={g.categoryId}
          onClick={() => handleClick(g.categoryId)}
          className="shrink-0 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/80 backdrop-blur-sm hover:bg-indigo-50 hover:text-indigo-800"
        >
          {g.label.length > 12 ? g.label.slice(0, 11) + "…" : g.label}
        </button>
      ))}
    </div>
  );
}
