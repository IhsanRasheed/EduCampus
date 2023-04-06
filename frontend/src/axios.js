import axios from 'axios'
import {BASEURL} from './Constants/Constant'

const instance = axios.create({
    baseURL: BASEURL
})

export default instance