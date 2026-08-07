"use client";

import Image from "next/image";

export function DesktopPet() {
  return (
    <div
      className="pointer-events-none fixed bottom-5 right-4 z-30 sm:bottom-6 sm:right-6"
      aria-hidden
    >
      <div className="relative h-[96px] w-[96px] sm:h-[112px] sm:w-[112px]">
        <Image
          src="/images/desktop-pet-ben10.png"
          alt=""
          fill
          className="object-contain"
          sizes="112px"
          unoptimized
        />
        <div className="desktop-pet-eyelids absolute left-[20%] top-[33%] h-[6%] w-[58%] rounded-full bg-[#efc5a1] shadow-[0_1px_0_rgba(0,0,0,0.08)]" />
      </div>
    </div>
  );
}
