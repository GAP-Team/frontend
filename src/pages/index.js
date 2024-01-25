import { Inter } from "next/font/google";
import Head from "next/head";
import Blog from "../components/landingpage/blog";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>GAP Startseite</title>
      </Head>
      <Blog />
    </>
  );
}
