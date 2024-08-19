import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Existence",
  description:
    "Existence - Products and Services - AI, Web Development, Research - Products and Services",
};

export default function RootLayout({ children }) {
  return (
		<html lang="en" className="scrollbar-none">
			<body>
				<Providers>
          <div className="bg-black m-0">
            {children}
          </div>
				</Providers>
			</body>
		</html>
  )
}
