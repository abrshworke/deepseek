import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "./context/appcontext";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cloned-DeepSeek",
  description: "cloned by Mr. Abreham",
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider>
     <AppContextProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {children}
        </body>
      </html>
      </AppContextProvider>
    </ClerkProvider>

  );
}
