import { io } from "socket.io-client";
const socket = io.connect("http://192.168.2.14:5000");
export default socket;