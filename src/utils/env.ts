export function getEnv() {
  // process.env.VITE_ENV 在vite.config -> define中定义
  return import.meta.env as unknown as ViteEnv
}
