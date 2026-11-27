import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TouchSparkles from "@/components/TouchSparkles";
import ScrollContrastArrow from "@/components/ScrollContrastArrow";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* 60fps Interactive Touch & Tap Sparkle Bursts */}
      <TouchSparkles />

      {/* Dynamic Passing Contrast Arrow Scroll Indicator */}
      <ScrollContrastArrow />

      <Header />
      <main className="flex-grow pt-20 sm:pt-24">{children}</main>
      <Footer />
    </div>
  );
}

