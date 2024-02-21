import GBlogSection from "@/sections/GBlogSection/GBlogSection";
import GFeatures from "@/sections/GFeatures/GFeatures";
import GOfferSection from "@/sections/GOfferSection/GOfferSection";
import GFunctionSection from "@/sections/GFunctionSection/GFunctionSection";
import GTestimonials from "@/components/GTestimonials/GTestimonials";
import GVideoSection from "@/sections/GVideoSection/GVideoSection";
import GClientSection from "@/sections/GClientSection/GClientSection";
import GStatSection from "@/sections/GStatSection/GStatSection";
import GFooter from "@/sections/GFooter/GFooter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GFunctionSection />
      <GOfferSection />
      <GFeatures />
      <GVideoSection />
      <GBlogSection />
      <GTestimonials />
      <GClientSection />
      <GStatSection />
      <GFooter />
    </main>
  );
}
