import {readStoryDir} from "./core/init";
import {app} from "./app";

async function start() {
  await readStoryDir()
  app.listen(11452)
}

start()
