import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AUTHOR_EMAIL, AUTHOR_NAME } from "@/constants/author";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect('/sign-in');

  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedIn}/>
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image
            src="/icons/logo.svg"
            width={30}
            height={30}
            alt="logo"
            />
            <div>
              <MobileNav user={loggedIn} />
            </div>
          </div>
          {children}
          <div className="w-full py-2 px-4 text-center text-xs text-gray-600 border-t bg-white/80">
            Project by <span className="font-semibold">{AUTHOR_NAME}</span> — <a href={`mailto:${AUTHOR_EMAIL}`} className="underline">{AUTHOR_EMAIL}</a>
          </div>
        </div>
    </main>
  );
}
