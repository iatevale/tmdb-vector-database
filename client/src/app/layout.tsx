import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/contexts/theme";
import { MovieProvider } from "@/contexts/movie-list-props";
import Debug from "@/components/debug";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Movie Finder",
  description: "Find your next favorite movie",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <MovieProvider>
        <html lang="en">
          <body className={`${poppins.className} antialiased`}>
            <div className="flex flex-col w-full">
              <Debug />
              <Header />
              <div className="flex flex-col">{children}</div>
            </div>
          </body>
        </html>
      </MovieProvider>
    </ThemeProvider>
  );
}
