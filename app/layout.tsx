import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./providers";
import BurgerMenu from "./components/burgerMenu";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen m-0 overflow-hidden">
        <Providers>
          <Header />
          {children}
          <Footer />

          <BurgerMenu />
        </Providers>
      </body>
    </html>
  );
}
