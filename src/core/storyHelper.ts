import {Story, StoryAct, StoryChapter} from "../types/Storys";
import {load} from "js-yaml";
import {getAllFile, readFileWithHandle} from "../utils/fs";
import {config} from "../config";

const neededActProps = ['title', 'actId', 'chapterId']

function checkActYAML(act: any): StoryAct | undefined {
  if (act && typeof act === 'object') {
    for (const p of neededActProps) {
      if (act[p] === undefined) {
        return
      }
    }
    return <StoryAct>act
  }
}

export async function readStoryPkg(dirName: string) {
  const indexPath = `${config.storyDir}/${dirName}/index.yml`
  const storyIndexFile = await readFileWithHandle(indexPath)
  const chapterMap = new Map<number, StoryChapter>()

  if (storyIndexFile) {
    const storyIndex = <Story>load(storyIndexFile)
    const allYAML = await getAllFile(dirName, name => name.endsWith('.yml'))

    for (const yml of allYAML) {
      const actRaw = await readFileWithHandle(`${config.storyDir}/${yml}`)
      if (actRaw) {
        const act = checkActYAML(load(actRaw))
        if (act) {
          const { chapterId } = act
          const chapter = chapterMap.get(chapterId)
          if (chapter === undefined) {
            const newChapter: StoryChapter = {
              chapterId,
              acts: [act]
            }
            chapterMap.set(chapterId, newChapter)
          } else {
            chapter.acts.push(act)
          }
        }
      }
    }

    storyIndex.chapters = [...chapterMap.values()]
    return storyIndex
  }

  return
}
