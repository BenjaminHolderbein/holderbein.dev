export function NowList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 max-w-[640px] list-none p-0">
      {items.map((n, i) => {
        const last = i === items.length - 1;
        return (
          <li
            key={i}
            className={`grid grid-cols-[40px_1fr] gap-5 border-t border-sage-hair py-5 text-[16px] leading-[1.55] text-ink-2 ${
              last ? "border-b" : ""
            }`}
          >
            <span className="pt-1 font-mono text-[11px] font-medium tracking-[0.06em] text-sage-bright">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{n}</span>
          </li>
        );
      })}
    </ul>
  );
}
