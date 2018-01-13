import SocketController from './data/socket-controller'
import TianBa from './data/tianba'
const global = {};
global.socket = SocketController();
global.tianba = TianBa();
export default global;