import { Metadata } from "next";

export const metadata = {
  title: "Existence | MindSync",
  description: "MindSync - AI based Mindmap Generation",
  openGraph: {
    title: "Existence | MindSync",
    description: "MindSync - AI-based Mindmap Generation",
    url: "https://existence-mindsync.vercel.app",
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
