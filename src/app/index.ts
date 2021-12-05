import Koa from 'koa'
import {router} from "./router";
const cors = require('@koa/cors')

const app = new Koa

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

export {
  app
}
