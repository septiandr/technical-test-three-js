"use client";

import dynamic from "next/dynamic";
import { Sidebar } from "@/components/ui/Sidebar";

const Scene = dynamic(
  () => import("@/components/viewer/Scene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        Loading 3D scene...
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-neutral-950 text-slate-100">
      <Sidebar />
      <section className="relative flex-1 overflow-hidden bg-neutral-900">
        <Scene />
      </section>
    </main>
  );
}