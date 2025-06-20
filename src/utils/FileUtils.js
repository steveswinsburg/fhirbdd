import fs from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { get } from "node:https";
import { pipeline } from "node:stream/promises";
import tmp from "tmp";
import tar from "tar";

export async function resolveLocalTgz(file) {
 
  if (!fs.existsSync(file)) {
    throw new Error(`File not found: ${file}`);
  }
  return file;
}

export async function resolveRemoteTgz(url) {

  const fileName = path.basename(new URL(url).pathname);
  const filePath = path.join(tmpdir(), fileName);

  const response = await new Promise((resolve, reject) => {
    get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download .tgz: HTTP ${res.statusCode}`));
      } else {
        resolve(res);
      }
    }).on("error", reject);
  });

  await pipeline(response, fs.createWriteStream(filePath));
  return filePath;
}

export function extractTgz(tgzPath) {
  const tmpDir = tmp.dirSync({ unsafeCleanup: true });

  tar.x({
    file: tgzPath,
    cwd: tmpDir.name,
    sync: true,
    strict: true,
  });

  return tmpDir;
}