import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Afghanistan | The Land of Stories",
  description: "A cinematic storytelling experience about Afghanistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable}`}
    >
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
