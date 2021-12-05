import {Middleware} from "koa";
import {stories} from "../../../store";

let cache: Buffer | null = null

export const getStories: Middleware = async (context, next) => {
  if (cache === null) {
    cache = Buffer.from(JSON.stringify(stories))
  }

  context.body = cache
  await next()
}
