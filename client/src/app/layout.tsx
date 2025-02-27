import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/contexts/theme";
import { MovieProvider } from "@/contexts/movie-list-props";
import { Suspense } from "react";
import { EmbeddingProvider } from "@/contexts/embedding";
import { AlertDialogProvider } from "@/contexts/dialog";
import { SessionProvider } from "next-auth/react";

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
      <AlertDialogProvider>
        <SessionProvider>
          <EmbeddingProvider>
            <html lang="en">
              <body
                className={`${poppins.className} antialiased bg-gray-50 dark:bg-gray-700`}
              >
                <div className="flex flex-col max-w-7xl min-w-[320px] min-h-screen mx-auto bg-white dark:bg-gray-800 shadow-lg px-8 py-4">
                  <Suspense>
                    <MovieProvider>
                      <Header />
                      <div className="flex flex-col">{children}</div>
                    </MovieProvider>
                  </Suspense>
                </div>
              </body>
            </html>
          </EmbeddingProvider>
        </SessionProvider>
      </AlertDialogProvider>
    </ThemeProvider>
  );
}
