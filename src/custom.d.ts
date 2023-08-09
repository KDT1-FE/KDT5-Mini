declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

interface ImportMeta {
  env: {
    VITE_API_URL: string
  }
}
