import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

//const inter = Inter({ subsets: ["latin"] });
const opensans = Open_Sans({ subsets: ["latin"], weight: '400' });

export const metadata = {
  title: "Todo App",
  description: "Manage my life",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={opensans.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
