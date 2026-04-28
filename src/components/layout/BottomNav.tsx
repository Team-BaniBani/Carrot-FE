"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs/tabs";
import { Home, Environmental, Encyclopedia, Plant } from "@/../public/icons/index";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  let currentTab = pathname;
  if (pathname === "/" || pathname.startsWith("/home")) currentTab = "/home";
  else if (pathname.startsWith("/diagnosis")) currentTab = "/diagnosis";
  else if (pathname.startsWith("/dictionary")) currentTab = "/dictionary";
  else if (pathname.startsWith("/my-plants")) currentTab = "/my-plants";
  else currentTab = "/home";

  return (
    <div className="z-50 w-full max-w-app border-t border-gray-100 bg-white pb-safe">
      <Tabs
        value={currentTab}
        onValueChange={(val) => router.push(val)}
        className="w-full"
      >
        <TabsList className="w-full flex justify-between h-16 bg-white rounded-none border-0 p-0">
          <TabsTrigger
            value="/home"
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 data-[state=active]:text-primary text-neutral-dark-30 data-[state=active]:bg-transparent data-[state=active]:shadow-none shadow-none rounded-none transition-none"
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">홈</span>
          </TabsTrigger>
          
          <TabsTrigger
            value="/diagnosis"
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 data-[state=active]:text-primary text-neutral-dark-30 data-[state=active]:bg-transparent data-[state=active]:shadow-none shadow-none rounded-none transition-none"
          >
            <Environmental className="w-6 h-6" />
            <span className="text-[10px] font-medium">환경 진단</span>
          </TabsTrigger>

          <TabsTrigger
            value="/dictionary"
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 data-[state=active]:text-primary text-neutral-dark-30 data-[state=active]:bg-transparent data-[state=active]:shadow-none shadow-none rounded-none transition-none"
          >
            <Encyclopedia className="w-6 h-6" />
            <span className="text-[10px] font-medium">식물 도감</span>
          </TabsTrigger>

          <TabsTrigger
            value="/my-plants"
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 data-[state=active]:text-primary text-neutral-dark-30 data-[state=active]:bg-transparent data-[state=active]:shadow-none shadow-none rounded-none transition-none"
          >
            <Plant className="w-6 h-6" />
            <span className="text-[10px] font-medium">내 식물</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
