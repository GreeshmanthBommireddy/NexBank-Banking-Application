"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

interface GlobalErrorProps {
  error: Error & { digest?: string };
}

export default function GlobalError({ error }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${ibmPlexSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-25 px-4">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="flex justify-center">
              <Image
                src="/icons/logo.svg"
                alt="NexBank Logo"
                width={60}
                height={60}
                className="mb-4"
              />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Something went wrong!
              </h1>
              <p className="text-lg text-gray-600">
                {error?.message || "An unexpected error occurred"}
              </p>
              {error?.digest && (
                <p className="text-sm text-gray-500">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="rounded-lg bg-bank-gradient px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Go to home page
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Reload page
              </button>
            </div>

            <div className="pt-6">
              <p className="text-sm text-gray-500">
                If this problem persists, please contact support.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

