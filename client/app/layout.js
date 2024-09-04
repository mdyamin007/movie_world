import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "@/components/Footer";
import { ThemeModeScript, DarkThemeToggle } from "flowbite-react";

// Import the Inter font from Google Fonts with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata for the page, used for SEO and other purposes
export const metadata = {
  title: "Movie World",
  description: "A movie rating website",
};

/**
 * RootLayout component that wraps the entire application.
 *
 * This component sets up the base structure of the application, including:
 * - The HTML `<head>` section with theme mode script.
 * - The main body with navigation bar, dynamic content (`children`), a dark theme toggle button, and footer.
 * - Applies global font and dark mode styling.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
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
