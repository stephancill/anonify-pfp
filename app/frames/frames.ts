import { farcasterHubContext } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export const frames = createFrames({
  basePath: "/frames",
  baseUrl: process.env.APP_URL,
  middleware: [
    farcasterHubContext({
      // remove if you aren't using @frames.js/debugger or you just don't want to use the debugger hub
      ...(process.env.NODE_ENV === "production"
        ? {}
        : {
            hubHttpUrl: "http://localhost:3010/hub",
          }),
    }),
  ],
  imageRenderingOptions: async () => {
    const interSemiBoldFont = fs.readFile(
      path.join(path.resolve(process.cwd(), "public"), "Inter-SemiBold.ttf")
    );

    const [interSemiBoldFontData] = await Promise.all([interSemiBoldFont]);
    return {
      imageOptions: {
        fonts: [
          {
            name: "Inter",
            data: interSemiBoldFontData,
            weight: 600,
          },
        ],
      },
    };
  },
});
