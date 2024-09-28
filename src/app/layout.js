import localFont from "next/font/local";

import PageLayout from "./components/PageLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import "./globals.css";

const geistBarlow = localFont({
    src: "./fonts/BarlowBlack.ttf", // Path to your local font file
    variable: "--font-geist-mono", // Optional: Custom CSS variable for font
    weight: "100 900", // Defines the range of font weights available
    display: "swap", // Optional: Improves loading behavior by swapping the font when loaded
});
export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                suppressHydrationWarning={true}
                className={` ${geistBarlow.variable} font-sans text-black bg-gray-100`}
            >
                <AuthProvider>
                    <CheckoutProvider>
                        <PageLayout>{children}</PageLayout>
                    </CheckoutProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
