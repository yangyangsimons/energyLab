import WebSocket from "./WebSocket";
import { AwlStore } from "./store";

let ws = null;
window.setTimeout(() => {

  ws = WebSocket("device");
  let awlStore = AwlStore();

  ws.onmessage = (event) => {
    // console.debug(event);
    let data = {};
    try {
      data = JSON.parse(event.data);
      // console.debug(data);
    } catch (e) {
      return;
    }
    if ("allData" == data.message) {
      awlStore.params = data.data;
    }else if ("devices" == data.message) {
      awlStore.devices = data.data;
    }else if ("deviceConfig" == data.message) {
      awlStore.deviceConfig = data.data;
    }else if ("newData" == data.message) {

      for (let name in data.data) {
        awlStore.params[name] = data.data[name];
      }
    }else if("opens" == data.message) {
        awlStore.opens=data.data;
    } else if("open" == data.message) {
      awlStore.opens[data.data.i]=data.data.open;
      window.postMessage(data);
    }else if("shell" == data.message) {
      console.debug("parent.postMessage",data.data);
      parent.postMessage(data.data,"*");
    }
    else {
      console.debug("postMessage",data);
      window.postMessage(data,"*");
    }
  }
  ws.onopen = () => {
    ws.send("allData");
    ws.send("devices");
    ws.send("opens");
    ws.send("deviceConfig");
  }

}, 2000);

export const sendAll = (data) => {
  ws.send("all", data);
}




export const WebSocketDevice= function(){}
export const WebSocketDevices =
{
  WebSocket,
  ws,
  sendAll
};

