"use client"
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[100vh] p-6 flex flex-col gap-6 justify-center items-center">
      <h1 className="text-2xl font-semibold">
        User Management Using Server Actions
      </h1>
      <Link href="/user-management">
        <Button>Let's Begin</Button>
      </Link>
    </div>
  );
}
