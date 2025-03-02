import type {Metadata} from "next";
import {Rubik} from "next/font/google";
import "./globals.css";
import React from "react";

const rubik = Rubik({
    weight: ["400", "500", "700"],
    subsets: ["latin"]
})

export const metadata: Metadata = {
    title: "Interactive Comments Section",
    description: "Solution by Mirror83 to 'Interactive Comments Section' challenge on Frontend Mentor",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${rubik.className} antialiased bg-very-light-gray`}
        >
        {children}
        </body>
        </html>
    );
}
