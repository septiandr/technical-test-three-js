import dynamic from "next/dynamic";
import { Sidebar } from "@/components/ui/Sidebar";

const Scene = dynamic(
  () => import("@/components/viewer/Scene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-neutral-950">
        <p className="text-neutral-400 text-sm">Loading 3D Viewer...</p>
      </div>
    )
  }
);

export function AppLayout() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 lg:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex h-full flex-col rounded-[2rem] border border-slate-800 bg-slate-900/70 p-3 shadow-2xl">
          <div className="mb-3 flex items-center justify-between px-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Workspace</p>
              <h1 className="text-xl font-semibold text-white">Interactive 3D scene</h1>
            </div>
            <div className="rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-sm text-slate-300">
              Ready
            </div>
          </div>
          <Scene />
        </div>
      </section>
    </main>
  );
}
