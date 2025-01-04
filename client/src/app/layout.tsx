import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/contexts/theme";
import MovieList from "@/components/movie-list";
import { MovieListPropsProvider } from "@/contexts/movie-list-props";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Movie discoverer",
  description: "Find your next favorite movie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <MovieListPropsProvider>
        <html lang="en">
          <body className={`${poppins.className} antialiased`}>
            <div className="flex flex-col pt-4 w-full">
              <Header />
              <div className="flex flex-col">{children}</div>
            </div>
          </body>
        </html>
      </MovieListPropsProvider>
    </ThemeProvider>
  );
}
