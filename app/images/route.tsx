import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export async function GET(req: NextRequest) {
  const bg = req.nextUrl.searchParams.get("bg");

  const interSemiBoldFont = fs.readFile(
    path.join(path.resolve(process.cwd(), "public"), "Inter-SemiBold.ttf")
  );

  const [interSemiBoldFontData] = await Promise.all([interSemiBoldFont]);

  return new ImageResponse(
    (
      <div tw="flex relative w-full h-full">
        {bg && <img src={bg} alt="" tw="w-full h-full object-cover" />}
        <div
          tw="flex absolute inset-0"
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        />
        <div
          tw="absolute inset-0 flex items-center justify-center text-white text-[900px] font-[600]"
          style={{
            fontFamily: "Inter",
          }}
        >
          ?
        </div>
      </div>
    ),
    {
      height: 1000,
      width: 1000,
      fonts: [
        {
          name: "Inter",
          data: interSemiBoldFontData,
          weight: 600,
        },
      ],
    }
  );
}
