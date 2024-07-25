import { Metadata } from "next";

export const metadata = {
  title: "Existence | Bloomify",
  description:
    "Bloomify - AI-based Assessment Creator for Educators based on Bloom's Taxonomy",
  openGraph: {
    title: "Existence | Bloomify",
    description:
      "Bloomify - AI-based Assessment Creator for Educators based on Bloom's Taxonomy",
    url: "https://existence-bloomify.vercel.app",
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
