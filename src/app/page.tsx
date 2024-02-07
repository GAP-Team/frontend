import BlogSection from "@/components/landingpage/blog";
import Features from "@/components/landingpage/features";
import OfferSection from "@/components/landingpage/offer_section";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Features />
      <OfferSection />
      <BlogSection />
    </main>
  );
}
