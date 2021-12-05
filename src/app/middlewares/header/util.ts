import {Middleware} from "koa";

export function setHeaderMiddleware(headers: Record<string, string | string[]>): Middleware {
  return async (context, next) => {
    context.set(headers)
    await next()
  }
}

export const setJSONHeader = setHeaderMiddleware({
  "Content-Type": "application/json",
  "Cache-Control": "no-cache"
})
