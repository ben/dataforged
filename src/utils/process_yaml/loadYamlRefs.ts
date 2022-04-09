import { REFS_PATH } from "@constants/index.js";
import fs from "fs";

/**
 * It loads all the yaml files in the refs folder and joins them into a single string.
 * @param path - The path to the directory containing the YAML files.
 * @returns A string of YAML that is the concatenation of the contents of the files in the `index`
 * directory.
 */
export function loadYamlRefs(path: fs.PathLike = REFS_PATH) {
  const files: fs.PathLike[] = fs.readdirSync(path).filter(item => item.match(".yaml"))
    .map(item => path.toString() + item);
  // console.log(refFiles);
  let refString: string = files.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
  refString = refString.replaceAll(/^/gim, "  ");
  refString = "_refs:\n" + refString;
  return refString;
}