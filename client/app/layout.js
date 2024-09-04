import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "@/components/Footer";
import { ThemeModeScript, DarkThemeToggle } from "flowbite-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie World",
  description: "A movie rating website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${inter.className} dark:bg-black`}>
        <NavBar />
        {children}
        <DarkThemeToggle className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 dark:bg-gray-300 dark:text-black dark:hover:bg-gray-400" />
        <Footer />
      </body>
    </html>
  );
}
