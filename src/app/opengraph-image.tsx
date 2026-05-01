import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [fraunces, interTight] = await Promise.all([
    readFile(join(process.cwd(), "assets/Fraunces-Regular.ttf")),
    readFile(join(process.cwd(), "assets/InterTight-Medium.ttf")),
  ]);

  const ink = "#0a0a0a";
  const ink2 = "#3a3a3a";
  const sageMid = "#5a8a6f";
  const sageBright = "#5fb87d";
  const sageHair = "#dfe8e1";
  const paper = "#ffffff";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: paper,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: `1px solid ${sageHair}`,
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Inter Tight",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: sageMid,
          }}
        >
          {site.domain}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Fraunces",
              fontSize: 156,
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              color: ink,
            }}
          >
            <div style={{ display: "flex" }}>Benjamin</div>
            <div style={{ display: "flex", color: sageMid }}>Holderbein</div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontFamily: "Inter Tight",
              fontSize: 32,
              color: ink2,
            }}
          >
            {site.role} · {site.location}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 56,
            bottom: 56,
            width: 28,
            height: 28,
            background: sageBright,
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 400 },
        { name: "Inter Tight", data: interTight, style: "normal", weight: 500 },
      ],
    },
  );
}
