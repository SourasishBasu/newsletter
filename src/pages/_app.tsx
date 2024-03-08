import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/toaster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faDiscord,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <Head>
        <title>MLSAKIIT Newsletter</title>
      </Head>

      <div className="min-h-screen">
        <Component {...pageProps} />
        <Toaster />
      </div>
      {/* <ThemeToggle className="absolute top-6 right-6" /> */}
      <div className="fixed bottom-0 w-full text-white text-center py-3 flex justify-center space-x-4">
        <a
          href="https://discord.gg/Cn96XCtAmg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faDiscord} />
        </a>
        <a
          href="https://www.instagram.com/mlsakiit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://www.youtube.com/@KIITKAKSHA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
    </NextThemesProvider>
  );
}
