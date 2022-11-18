const extensionMap: Record<string, string> = {
  ts: "js",
  tsx: "jsx",
  mts: "mjs",
  cts: "cjs",
}

export function generateIndexContent(
  files: string[],
  excludePatterns: string[] = [],
) {
  const exportedFiles = files.filter((file) => {
    return (
      /\.tsx?$/.test(file) &&
      file !== "index.ts" &&
      !excludePatterns.some((pattern) => file.includes(pattern))
    )
  })

  const exportLines = exportedFiles.map((file) => {
    const [name, ext] = file.split(".")
    return `export * from "./${name}.${extensionMap[ext] ?? ext}"\n`
  })

  return exportLines.join("")
}
