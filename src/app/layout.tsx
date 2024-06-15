import type { Metadata } from "next";
import SideNavbar from "./ui/layout/side-navbar";
import { lato } from "./ui/fonts";
import "./globals.css";
import Header from "./ui/layout/header/header";

export const metadata: Metadata = {
  title: "Solar_Music",
  description: "Music app created by Solar_Phoenix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
        <Header />
        <div className="content-wrap flex">
          <SideNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}
