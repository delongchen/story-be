import {Story, StoryIndex} from "../types/Storys";

let uid = 0

export const stories: StoryIndex[] = []
const storyMap = new Map<number, Story>()

export function addStory(s: Story) {
  const { title, author, characters, desc } = s
  s.uid = uid++
  stories.push({
    uid,
    title,
    author,
    characters,
    desc
  })
  storyMap.set(s.uid, s)
}
