import Image from "next/image";

type Props = {
  tag: string;
  titleTop: string;
  titleBottom: string;
  blurb: string;
  portrait?: { src: string; alt: string };
};

export function Hero({ tag, titleTop, titleBottom, blurb, portrait }: Props) {
  return (
    <header className="relative mb-32">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <div>
          {!portrait && (
            <div className="mb-9 h-14 w-14 bg-sage-bright" aria-hidden />
          )}
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
        </div>

        {portrait && (
          <figure className="order-first m-0 md:order-none md:pt-12">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-2 border border-sage-hair"
              />
              <div className="relative h-[280px] w-[224px] overflow-hidden md:h-[360px] md:w-[288px]">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(max-width: 768px) 224px, 288px"
                  className="object-cover"
                  priority
                />
              </div>
              <div
                aria-hidden
                className="absolute -bottom-3 -left-3 h-7 w-7 bg-sage-bright"
              />
            </div>
          </figure>
        )}
      </div>
    </header>
  );
}
