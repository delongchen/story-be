import { load } from "js-yaml";
import {readFileSync} from "fs";
import {AppConfig} from "../types/AppConfig";

export const config = <AppConfig>load(
  readFileSync('src/config/config.yml', 'utf-8')
)
