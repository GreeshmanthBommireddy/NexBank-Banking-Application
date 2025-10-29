import Image from "next/image";
import { AUTHOR_EMAIL, AUTHOR_NAME } from "@/constants/author";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full justify-between font-inter">
          {children}
          <div className="auth-asset">
            <div>
              <Image
              src="/icons/auth-image.svg"
              alt="Auth Image"
              width={500}
              height={500}
              />
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 py-2 px-4 text-center text-xs text-gray-600 bg-white/80">
            Project by <span className="font-semibold">{AUTHOR_NAME}</span> — <a href={`mailto:${AUTHOR_EMAIL}`} className="underline">{AUTHOR_EMAIL}</a>
          </div>
      </main>
    );
  }
  