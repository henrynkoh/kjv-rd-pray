"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/types";

type Group = { categoryId: string; label: string };

export default function LandingNav({ groups }: { groups: Group[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    groups.forEach((g) => {
      const el = document.getElementById(g.categoryId);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [groups]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="flex flex-col gap-0.5 py-2 pr-2">
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        목차
      </p>
      <div className="flex max-h-[calc(100vh-8rem)] flex-col gap-0.5 overflow-y-auto overflow-x-hidden rounded-lg pr-1 scrollbar-thin">
        {groups.map((g) => (
          <button
            key={g.categoryId}
            onClick={() => handleClick(g.categoryId)}
            className={`rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
              activeId === g.categoryId
                ? "bg-indigo-600 font-medium text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
