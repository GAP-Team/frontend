import GBlogSection from "@/sections/GBlogSection/GBlogSection";
import GFeatures from "@/sections/GFeatures/GFeatures";
import GOfferSection from "@/sections/GOfferSection/GOfferSection";
import GFunctionSection from "@/sections/GFunctionSection/GFunctionSection";
import GTestimonials from "@/components/GTestimonials/GTestimonials";
import GVideoSection from "@/sections/GVideoSection/GVideoSection";
import GStatSection from "@/sections/GStatSection/GStatSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-20">
      <GFunctionSection />
      <GOfferSection />
      <GFeatures />
      <GVideoSection />
      <GBlogSection />
      <GTestimonials />
      <GStatSection />
    </main>
  );
}
