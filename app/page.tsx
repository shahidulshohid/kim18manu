import BannerPage from "@/components/landingPage/BannerPage";
import HowItWorks from "@/components/landingPage/HowItWorks";
import CuratedPortfolio from "@/components/landingPage/CuratedPortfolio";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <BannerPage />
      <HowItWorks />
      <CuratedPortfolio />
    </main>
  );
}
