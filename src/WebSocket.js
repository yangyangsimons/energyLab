let ws = {

};




const init = (channel, key, savekey = false) => {
  if (!channel) {
    throw new Error("未传入参数：channel");
  }
  if (savekey) {
    if (!key) {
      key = localStorage.getItem(channel + "_key");
    }
    if (!key) {
      key = (Math.abs(new Date().getTime() << 8 | Math.floor(Math.random() * (1 << 8)))).toString(36).toUpperCase();
      localStorage.setItem(channel + "_key", key);
    }
  } else {
    if (!key) {
      key = (Math.abs(new Date().getTime() << 8 | Math.floor(Math.random() * (1 << 8)))).toString(36).toUpperCase();
    }
  }

  if (!ws[channel + "_" + key]) {
    let obj = {};
    obj.channel = channel;
    obj.key = key;
    obj.url = `ws://${window.location.hostname}:${window.location.port}/ws/${channel}/${key}`;
    obj.send = (order, data) => {
      // console.debug(order,data,obj.ws);
      try {
        if (data) {
          obj.ws.send(order + ":" + JSON.stringify(data));

        } else {
          obj.ws.send(order);
        }
      } catch (e) {
        console.warn(e);
        obj.resetWebSocket(obj);
      }
    };
    _init(obj);
    ws[channel + "_" + key] = obj;
  }
  console.debug(ws[channel + "_" + key]);
  return ws[channel + "_" + key];
}

const _init = function (config) {

  //心跳定时器
  let timer = null;

  //设置心跳
  function setTimer() {
    if (timer) {
      window.clearInterval(timer);
    }
    timer = window.setInterval(() => {
      if (config.ws.readyState != WebSocket.OPEN) {
        config.resetWebSocket();
        return;
      }
      try {
        config.ws.send("ping");
      } catch (e) {
        console.error(e);
        config.resetWebSocket();
      }
    }, 10000);
  }

  /**
   * 重新连接
   */
  config.resetWebSocket = function () {
    console.debug("正在重连：" + config.url);
    let ws = new WebSocket(config.url);
    config.ws = ws;
    ws.onopen = (event) => {
      console.debug(ws);
      if (config.onopen) {
        config.onopen(event);
      }
      console.debug("连接成功:" + config.url);
      setTimer();
    }
    ws.onclose = (event) => {
      setTimer();
      if (config.onclose) {
        config.onclose(event);
      }
    }
    ws.onerror = (event) => {
      setTimer();
      if (config.onerror) {
        config.onerror(event);
      }
    }
    ws.onmessage = (event) => {
      if ('pong' == event.data) {
        console.debug(event);
        return;
      }
      setTimer();
      if (config.onmessage) {
        config.onmessage(event);
      }
    }
  }

  config.resetWebSocket();





}


export default init;