import { Metadata } from "next";

export const metadata = {
  title: "Existence | Sentient",
  description: "Sentient - Personalized AI Companion",
  openGraph: {
    title: "Existence | Sentient",
    description: "Sentient - Personalized AI Companion",
    url: "https://existence-sentient.up.railway.app",
    type: "website",
    images: "/existencering.png",
  },
};

export default function Layout({ children }) {
  return (
    <main>
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
