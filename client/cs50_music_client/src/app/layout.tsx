import ReactQueryProvider from "./query-client-provider";
import type { Metadata } from "next";
import SideNavbar from "./ui/layout/side-navbar/side-navbar";
import Header from "./ui/layout/header/header";
import Player from "./ui/layout/player/player";
import { lato } from "./ui/fonts";
import styles from "./page.module.css";
import "./globals.css";

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
        <ReactQueryProvider>
          <div id="modal-root" />
          <Header />
          <div className={`${styles.content_wrap} flex`}>
            <SideNavbar />
            <main className={styles.main}>{children}</main>
          </div>
          <Player />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
