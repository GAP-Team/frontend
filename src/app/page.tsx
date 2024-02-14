import GBlogSection from "@/sections/GBlogSection/GBlogSection";
import GFeatures from "@/components/GFeatures/GFeatures";
import GOfferSection from "@/sections/GOfferSection/GOfferSection";
import GFunctionSection from "@/sections/GFunctionSection/GFunctionSection";
import GTestimonials from "@/components/GTestimonials/GTestimonials";
import GVideoSection from "@/sections/GVideoSection/GVideoSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-20">
      <GFunctionSection />
      <GOfferSection />
      <GFeatures />
      <GVideoSection />
      <GBlogSection />
      <GTestimonials />
    </main>
  );
}
