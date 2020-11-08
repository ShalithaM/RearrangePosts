/* eslint-disable */

import axios from 'axios';
import Config from "./config.js";

const baseURL = Config.baseURL


const instance = axios.create({
  baseURL: baseURL
});

export default {
  instance: instance,
}
