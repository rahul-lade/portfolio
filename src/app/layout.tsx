import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
  description:
    "Personal portfolio showcasing projects, experience, and skills as a full-stack developer. Built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: ["portfolio", "developer", "full-stack", "next.js", "react"],
  authors: [{ name: "Developer" }],
  openGraph: {
    title: "Portfolio | Full-Stack Developer",
    description:
      "Personal portfolio showcasing projects, experience, and skills.",
    type: "website",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
