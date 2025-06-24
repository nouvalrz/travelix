import { ImageResponse } from "next/og";

export const runtime = "edge";

const sizeMap = {
  sm: { width: 400, height: 209 },
  md: { width: 600, height: 315 },
  lg: { width: 800, height: 418 },
};

let fontData: ArrayBuffer;

const fontUrl = new URL(
  "../../../../public/fonts/Manrope-Bold.ttf",
  import.meta.url
);
const fontPromise = fetch(fontUrl).then((res) => res.arrayBuffer());

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const wideText = Boolean(searchParams.get("wideText") || false);
  const title = searchParams.get("title") || "Travelix Destination";
  const sizeKey = searchParams.get("size") || "sm";
  const size = sizeMap[sizeKey as keyof typeof sizeMap] || sizeMap.sm;

  fontData = await fontPromise;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="background"
          src="https://travelix.nouval.site/images/base-fallback-destination.jpg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        {/* Overlay Text */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: wideText ? "10%" : "18%",
            zIndex: 1,
            color: "white",
            fontSize: `${size.width / 15}px`,
            fontWeight: "bold",
            textShadow: "0px 4px 3px rgba(26,26,26,0.6)",
            fontFamily: "Manrope",
            maxWidth: "90%",
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Manrope",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
};
