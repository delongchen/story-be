import Router from 'koa-router'
import {setJSONHeader} from "../middlewares/header/util";
import {getStories} from "../middlewares/data/getStories";

const router = new Router

router.get('/s', setJSONHeader, getStories)

export {
  router
}
