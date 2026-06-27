# Technical Test — Three.js Viewer

A clean React + Next.js 3D model viewer built with React Three Fiber, Drei, and Zustand.

## ✅ Implemented Features

- Drag-and-drop file loading for `.stl`, `.glb`, `.gltf`
- File input fallback for manual uploads
- React Three Fiber scene with model loading and asset scaling
- Drei helpers: `OrbitControls`, `Grid`, `GizmoHelper`, `GizmoViewcube`, `useGLTF`
- Smooth camera transitions with lerped animation
- Camera view presets and fit-to-view support
- Zustand state management for model list, selection, visibility, and loading state
- Model visibility toggle and delete functionality
- Sidebar UI for model management and controls

## 📋 Evaluation Checklist

| Area | Status | Notes |
| --- | --- | --- |
| Code quality and structure | ✅ | Modular components, hooks, Zustand store, clear separation of concern |
| Three.js / 3D implementation | ✅ | Uses R3F, Drei, custom loaders, model normalization, lighting, grid, gizmo |
| User interaction and camera controls | ✅ | Orbit controls, camera presets, smooth animated transitions, fit-to-view |
| UI and usability | ✅ | Sidebar, model list, drag/drop upload, clear all, visual feedback |
| Documentation quality | ✅ | README updated with usage and feature summary |
| AI usage transparency | ✅ | Documented in this README |

## 🚀 Bonus Points Checklist

- [x] Support drag-and-drop file loading
- [x] Use React Three Fiber and Drei effectively
- [x] Implement smooth camera animations
- [x] State management with Zustand
- [x] Add model visibility toggle or delete functionality

## 🧠 AI Transparency

This repository implementation does not rely on external AI model inference at runtime. All application logic and rendering are implemented directly in React, Three.js, and Zustand.

Saya menggunakan AI untuk completion, debug, dan styling selama pengembangan. Namun, aplikasi yang berjalan tetap sepenuhnya dibangun dengan kode lokal dan tidak memerlukan inferensi AI saat runtime.

Lihat dokumentasi lengkap di [AI_USAGE.md](AI_USAGE.md).

## 📦 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the application

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Use the viewer

- Drag and drop a `.stl`, `.gltf`, or `.glb` file into the app
- Or click the upload area to select files manually
- Use the sidebar to toggle visibility, delete models, and switch camera views
- Use mouse controls to orbit, pan, and zoom the 3D scene

### 4. Build for production

```bash
npm run build
```

### 5. Start production server

```bash
npm run start
```

## 📁 Key Files

- `src/app/page.tsx` — application shell and layout
- `src/components/ui/FileUpload.tsx` — drag-and-drop upload + file validation
- `src/components/ui/Sidebar.tsx` — model list, camera controls, fit-to-view, clear all
- `src/components/ui/ModelListItem.tsx` — visibility toggle + delete
- `src/components/viewer/Scene.tsx` — R3F scene, lights, controls, gizmo
- `src/components/viewer/ModelMesh.tsx` — `.stl` and `.gltf/.glb` loading + normalization
- `src/hooks/useCameraTransition.ts` — smooth animated camera movement
- `src/store/useViewerStore.ts` — Zustand state management

## 💡 Notes

- The viewer supports multiple models loaded concurrently.
- Hidden models are still tracked and can be toggled back on.
- The scene automatically fits visible models when requested.
- Model assets are loaded using browser blob URLs and released when removed.
