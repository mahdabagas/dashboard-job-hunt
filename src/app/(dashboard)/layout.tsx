import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import NextAuthProvider from "@/context/NextAuthProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/authOptions";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Job Hunr",
  description: "Dashboard Job Hunt",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return redirect("/auth/signIn");
  }

  return (
    <html lang="en">
      <body className={epilogue.className}>
        <main>
          <NextAuthProvider>
            <div className="border-t">
              <div className="bg-background">
                <div className="flex flex-row">
                  <div className="hidden lg:block w-[18%]">
                    <Sidebar />
                  </div>
                  <div className="col-span-3 overflow-auto lg:col-span-5 lg:border-l w-[82%]">
                    <div className="px-6 py-6 lg:px-8">
                      <Header />
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NextAuthProvider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
