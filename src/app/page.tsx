import GBlogSection from "@/sections/GBlogSection/GBlogSection";
import GFeatures from "@/components/GFeatures/GFeatures";
import GOfferSection from "@/sections/GOfferSection/GOfferSection";
import GFunctionSection from "@/sections/GFunctionSection/GFunctionSection";
import GTestimonials from "@/components/GTestimonials/GTestimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-14">
      <GFunctionSection />
      <GOfferSection />
      <GFeatures />
      <GBlogSection />
      <GTestimonials />
    </main>
  );
}
