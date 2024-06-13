import type { Metadata } from "next";
import "./globals.css";
import SideNavbar from "./ui/side-navbar";
import { inter } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Solar_Player",
  description: "Music app created by Solar_Phoenix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SideNavbar />
        {children}
      </body>
    </html>
  );
}
