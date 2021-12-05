import { opendir } from "fs/promises";
import { config } from "../config";
import {readStoryPkg} from "./storyHelper";
import {addStory} from "../store";

const { storyDir } = config

export async function readStoryDir() {
  const dir = await opendir(storyDir)

  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      const storyIndex = await readStoryPkg(dirent.name)
      if (storyIndex) {
        addStory(storyIndex)
      }
    }
  }
}
