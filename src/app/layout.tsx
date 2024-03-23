import { SettingOutlined } from "@ant-design/icons";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });
// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Music server",
  description:
    "Non-commercial music server to allow multiple people control 1 spotify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="m-4 flex w-screen items-center font-mono *:text-sm min-[340px]:*:text-xl sm:*:text-3xl">
          <Link
            href="/"
            className="transform transition hover:scale-105 hover:text-gray-400"
          >
            Music server
          </Link>
          <div className="absolute right-0 mr-4 flex">
            <span className="!text-lg mr-4">
              {cookies().get("username")
                ? "Logged in as " + cookies().get("username")?.value
                : "Not logged in"}
            </span>
            <Link
              href="/admin"
              className="transform transition hover:scale-105 hover:text-gray-400"
            >
              <SettingOutlined className="flex aspect-square h-full justify-center" />
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
