import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { Poppins } from "@/utils/fonts";
import "../styles/globals.css";
import "../styles/lightbox.css";
import Providers from "./providers";
import TopNavbar from "@/components/ui/layout/TopNavbar";
import BottomNavbar from "@/components/ui/layout/BottomNavbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/utils/helpers";
import { IS_PRODUCTION, SpacingClasses } from "@/utils/constants";
import dynamic from "next/dynamic";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { GoogleAnalytics } from '@next/third-parties/google';
const Disclaimer = dynamic(() => import("@/components/ui/overlay/Disclaimer"));
import { env } from "@/utils/env";
import Script from 'next/script'

export const metadata: Metadata = {
  title: siteConfig.name,
  applicationName: siteConfig.name,
  description: siteConfig.description,
  manifest: "/manifest.json",
  icons: {
    icon: siteConfig.favicon,
  },
  twitter: {
    card: "summary",
    title: {
      default: siteConfig.name,
      template: siteConfig.name,
    },
    description: siteConfig.description,
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: {
      default: siteConfig.name,
      template: siteConfig.name,
    },
    description: siteConfig.description,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0C0F" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn("bg-background min-h-dvh antialiased select-none", Poppins.className)}>
        <Suspense>
          <NuqsAdapter>
            <Providers>
              {IS_PRODUCTION && <Disclaimer />}
              <TopNavbar />
              <Sidebar>
                <main className={cn("container mx-auto max-w-full", SpacingClasses.main)}>
                  {children}
                </main>
              </Sidebar>
              <BottomNavbar />
            </Providers>
          </NuqsAdapter>
        </Suspense>
        <SpeedInsights debug={false} />
        <Analytics debug={false} />
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ""} />
        <Script type="text/javascript" id="ads">
          {`
     atOptions = {
  	'key' : 'ed1dd678bfc788bb45dcf494f3a1d817',
  	'format' : 'iframe',
  	'height' : 600,
  	'width' : 160,
  	'params' : {}
  };
	`}
        </Script>
        <Script
          type="text/javascript"
          src="https://hardexpendstrategy.com/ed1dd678bfc788bb45dcf494f3a1d817/invoke.js"
        />
        <Script async strategy="afterInteractive" src="//acscdn.com/script/aclib.js" />
        <Script data-cfasync="false" strategy="lazyOnload" id="adcash">
          {`
            aclib.runPop({
        zoneId: '9033646',
    });
             `}
        </Script>
      </body>
    </html>
  );
}
