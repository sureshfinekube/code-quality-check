import {io} from 'socket.io-client'
import {useSelector} from 'react-redux'
let baseurl = "https://endapi.wimos.io"
// let baseurl = "http://localhost:8080"
const socket = io(baseurl);
export {socket}