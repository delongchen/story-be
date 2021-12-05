import {opendir, readFile} from "fs/promises";
import {config} from "../config";

export async function readFileWithHandle(path: string) : Promise<string | undefined> {
  try {
    return await readFile(path, 'utf-8')
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      return
    }
  }
}

export async function getAllFile(dirName: string, filter: (name: string) => boolean) {
  const result: string[] = []

  async function helper(dirPath: string) {
    const dir = await opendir(`${config.storyDir}/${dirPath}`)

    for await (const dirent of dir) {
      if (dirent.isDirectory()) {
        await helper(`${dirPath}/${dirent.name}`)
      } else {
        if (filter(dirent.name)) {
          result.push(`${dirPath}/${dirent.name}`)
        }
      }
    }
  }

  await helper(dirName)
  return result
}
