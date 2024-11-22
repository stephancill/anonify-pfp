import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Anonify PFP",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames",
          process.env.APP_URL ? process.env.APP_URL : "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  return <div>View on Farcaster</div>;
}
