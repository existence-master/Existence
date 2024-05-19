"use client";

import { ParallaxProvider } from "react-scroll-parallax";

export function Providers({ children }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
