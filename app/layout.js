import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "車輛上架網站",
  description: "一個用 Next.js 製作的二手車平台",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${inter.variable} ${robotoMono.variable} min-h-screen text-black`}
        style={{ backgroundColor: "#ffffff" }}
      >
        {children}
      </body>
    </html>
  );
}