import { getCloudinaryProxyUrl } from "@/lib/cloudinary";
import { farcasterHubContext } from "frames.js/middleware";
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(
  async (ctx) => {
    if (!ctx.message) {
      return {
        image: (
          <div tw="flex relative w-full h-full bg-black">
            <div tw="absolute inset-0 flex items-center justify-center text-white text-[900px] font-[600]">
              ?
            </div>
          </div>
        ),
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [<Button action="post">Anonify</Button>],
      };
    }

    const profileImageUrl = ctx.message.requesterUserData?.profileImage
      ? getCloudinaryProxyUrl(
          ctx.message.requesterUserData?.profileImage,
          1000,
          1000
        )
      : null;

    const imageUrl = new URL("/images", ctx.request.url);
    if (profileImageUrl) {
      imageUrl.searchParams.set("bg", profileImageUrl);
    }

    return {
      image: imageUrl.toString(),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button action="link" target={imageUrl.toString()}>
          Save
        </Button>,
      ],
    };
  },
  {
    middleware: [farcasterHubContext()],
  }
);

export const GET = handleRequest;
export const POST = handleRequest;
