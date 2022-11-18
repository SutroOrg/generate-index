import * as fs from "fs";
import { promisify } from "util";
import { resolve } from "path";
import { generateIndexContent } from "./generateIndexContent";

const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

export async function writeIndexFile(
  targetFolder: string,
  fsm = { readdir, writeFile },
) {
  const files = await fsm.readdir(targetFolder);

  const indexFilePath = resolve(targetFolder, "index.ts");
  const indexContent = generateIndexContent(files, [".test.", "__snapshots__"]);

  await fsm.writeFile(indexFilePath, indexContent);
}
