"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { useViewerStore } from "@/store/useViewerStore";

const Scene = dynamic(() => import("@/components/viewer/Scene").then((mod) => mod.Scene), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-neutral-950">
      <p className="text-neutral-400 text-sm">Loading 3D Viewer...</p>
    </div>
  ),
});

export default function Home() {
  const { models, activeView } = useViewerStore();

  useEffect(() => {
    console.log("useEffect running");
    const { loadDefaultAssets } = useViewerStore.getState();
    console.log("Calling loadDefaultAssets");
    loadDefaultAssets();
  }, []);

  console.log("Home models:", models);

  return (
    <main className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 relative h-full">
        <Scene />
        <div className="absolute top-3 right-3 flex gap-2 rounded-lg bg-neutral-900/80 backdrop-blur px-3 py-2 text-xs text-neutral-300">
          <span>{models.length} model(s) loaded</span>
          <span>View: {activeView ?? "free"}</span>
        </div>
      </div>
    </main>
  );
}
