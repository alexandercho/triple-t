# Frontend Structure

This app uses Expo Router with a tRPC client layer mounted at the app root.

## Folder guide

- `src/app/` - route entrypoints and layout files for the Expo Router app.
- `src/components/` - reusable UI components shared across routes.
- `src/constants/` - design and layout constants.
- `src/hooks/` - general React hooks that are not tied to tRPC.
- `src/trpc/` - client setup, provider, typed helpers, and query hooks for the backend API.
- `assets/` - static images, icons, and other bundled media.
- `.env` - local API configuration for development.

## tRPC folders

- `src/trpc/client.ts` - raw tRPC client instance for direct calls.
- `src/trpc/provider.tsx` - React provider that mounts tRPC and React Query at the app root.
- `src/trpc/hooks.ts` - app-specific query hooks built on the tRPC client.
- `src/trpc/types.ts` - frontend type definitions for the backend router shape.
- `src/trpc/index.ts` - barrel export for the frontend tRPC layer.

## Current behavior

- The app reads the backend URL from `EXPO_PUBLIC_API_URL`.
- The root layout wraps the app in the tRPC provider.
- The home screen can fetch the backend response and render it at the top of the page.
- App code uses `@/...` absolute imports for shared components, hooks, constants, and tRPC helpers.
