import "./globals.css";
import "./components.css";
import { Inter } from "next/font/google";
import SideBar from "../components/SideBar";
import type { AppProps } from "next/app";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className={`${inter.variable} font-sans flex flex-row`}>
        <SideBar />
        <Component {...pageProps} />
      </div>
  );
}