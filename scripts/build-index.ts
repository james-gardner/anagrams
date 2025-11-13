import { key } from "../lib/anagram";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

async function main() {
  const wordsTxt = await readFile("./data/words.txt", "utf8");

  const idx: Record<string, string[]> = {};

  for (const w of wordsTxt.split(/\r?\n/)) {
    const word = w.trim();  
    
    if (!word) continue;

    const k = key(word);
    
    if (idx[k]) {
      idx[k].push(word)
    } else {
      idx[k] = [
        word
      ]
    }
  }

  await writeFile(
    path.join("data/anagram-index.json"),
    JSON.stringify(idx),
    "utf8"
  );

}

main().catch((e) => { 
  console.error(e); 
  process.exit(1); 
});
