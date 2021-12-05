export interface StoryAct {
  title: string
  actId: number
  chapterId: number
  desc: string

  story: StoryItem[]
}

export interface StoryItem {
  c: string
  t: string | string[]
}

export interface StoryChapter {
  chapterId: number
  acts: StoryAct[]
}

export interface StoryCharacter {
  name: string
  nick: string
  desc: string
}

export interface StoryIndex {
  uid: number

  title: string
  author: string
  desc: string
  characters: StoryCharacter[]
}

export interface Story extends StoryIndex {
  chapters?: StoryChapter[]
}
