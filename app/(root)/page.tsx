import CookieConsent from "@/components/shared/CookieConsent";
import MobileMenu from "@/components/shared/MobileMenu";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has("smartExpenseTracker");

  return (
    <div className="min-h-screen">
      <header className="wrapper col-span-3 w-full">
        <div className="flex h-full items-center justify-between py-3">
          <Link href="/">
            <Image
              priority={true}
              src="/assets/svg/logo-no-background.svg"
              alt="logo"
              width="120"
              height="50"
            />
          </Link>
          <div className="flex w-32 items-center justify-end gap-3">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <MobileMenu />
            </SignedIn>
            <SignedOut>
              <Button size="lg">
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </header>
      <main>
        <section className="flex min-h-max items-center justify-center py-10">
          <div className="wrapper grid items-center justify-items-center gap-8 lg:grid-cols-2">
            <div className="order-2 space-y-4 md:order-1">
              <h2 className="text-2xl font-extrabold !leading-relaxed md:text-4xl">
                Track, Thrive, Transform <br /> Your Financial Journey Starts
                Here.
              </h2>
              <p className="text-md max-w-md text-slate-500">
                Smart Expense tracker analyzes your spending and automatically
                saves the perfect amount everyday so you don&apos;t have to
                think about it.
              </p>

              <SignedIn>
                <Button size="lg">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <Button size="lg">
                  <Link href="/sign-up">Create an account</Link>
                </Button>
              </SignedOut>
            </div>
            <div className="order-1 md:order-2">
              <Image
                priority={true}
                src="/assets/svg/undraw_transfer_money.svg"
                alt="wallet"
                width={1000}
                height={1000}
                className="max-w-xs object-cover object-center md:max-w-sm lg:max-w-xl"
              />
            </div>
          </div>
        </section>
        {!hasCookie && <CookieConsent />}
      </main>
    </div>
  );
}
