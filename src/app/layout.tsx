import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Viewer",
  description: "Interactive 3D model viewer built with Next.js, Three.js, and React Three Fiber",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full m-0 p-0 overflow-hidden bg-[#0f0f1a]">{children}</body>
    </html>
  );
}
