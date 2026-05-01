export function Hero({
  tag,
  titleTop,
  titleBottom,
  blurb,
}: {
  tag: string;
  titleTop: string;
  titleBottom: string;
  blurb: string;
}) {
  return (
    <header className="relative mb-32">
      <div className="mb-9 h-14 w-14 bg-sage-bright" aria-hidden />
      <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-sage-mid">
        {tag}
      </div>
      <h1
        className="m-0 font-serif text-[64px] font-normal leading-[0.92] tracking-[-0.035em] text-[#0a0a0a] md:text-[96px]"
        style={{ textWrap: "balance" }}
      >
        {titleTop}
        <br />
        <span className="italic text-sage-mid">{titleBottom}</span>
      </h1>
      <p
        className="mt-9 max-w-[620px] text-[20px] leading-[1.5] text-ink-2 md:text-[22px]"
        style={{ textWrap: "pretty" }}
      >
        {blurb}
      </p>
    </header>
  );
}
