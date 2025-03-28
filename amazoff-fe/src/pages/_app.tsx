import NavBar from "@/components/NavBar";
import "@/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Toaster />
      <NavBar />
      <div className="max-w-[1500px] mx-auto">
        <Component {...pageProps} />
      </div>
    </main>
  );
}