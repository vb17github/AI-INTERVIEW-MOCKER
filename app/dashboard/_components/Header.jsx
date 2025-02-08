"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect } from "react";

export const Header = () => {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  });

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image
        src={'/logo.svg'}
        alt='logo'
        width={160}
        height={100}
        style={{ width: "auto", height: "auto" }}
      />
      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}`}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/recommended-courses">Recommended Courses</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/job-recommendation' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/job-recommendation">Job Recommendation</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/upgrade">Upgrade</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/how">How it works?</Link>
        </li>
      </ul>
      <UserButton />
    </div>
  );
};
