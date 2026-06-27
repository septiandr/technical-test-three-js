"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useViewerStore } from "@/store/useViewerStore";

export function FileUpload() {
  const { addModels, isLoading } = useViewerStore();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      console.log("handleFiles called with:", files);
      const validFiles = Array.from(files).filter((file) =>
        /\.(stl|gltf|glb)$/i.test(file.name)
      );
      console.log("validFiles:", validFiles);
      if (validFiles.length > 0) {
        addModels(validFiles);
      }
    },
    [addModels]
  );

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer?.files) {
        handleFiles(e.dataTransfer.files);
      }
    };
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("drop", handleDrop);
    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("drop", handleDrop);
    };
  }, [handleFiles]);

  return (
    <label
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-6 transition ${
        isDragging
          ? "border-blue-500 bg-blue-500/10"
          : "border-slate-600 bg-slate-900/50 hover:border-slate-500"
      }`}
    >
      <UploadCloud className="h-8 w-8 text-slate-400" />
      <div className="text-center">
        <p className="text-sm font-medium text-slate-200">
          {isLoading ? "Loading..." : "Drop 3D files here"}
        </p>
        <p className="text-xs text-slate-500">
          STL · GLTF · GLB | Multiple files supported
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept=".stl,.gltf,.glb"
        multiple
        disabled={isLoading}
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files);
          }
        }}
      />
    </label>
  );
}
