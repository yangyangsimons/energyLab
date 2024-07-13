<template>
    <div class="diagram-container">
        <div class="container">
            <div class="picContainer">
                <div class="one"></div>
                <div class="two"></div>
                <div class="three"></div>
                <div class="four"></div>
                <div class="five"></div>
                <div class="six"></div>
            </div>
          <svg class="svg-container">
            <line x1="300" y1="190" x2="600" y2="150" style="stroke:white;stroke-width:1" />
            <line x1="650" y1="160" x2="700" y2="220" style="stroke:white;stroke-width:1" />
            <circle :cx="redDotPosition.x" :cy="redDotPosition.y" r="2" fill="red" />
          </svg>

    </div>
    <button @click="toggleMovement" style="background-color: purple; color: white;">
      {{ running ? 'Stop' : 'Start' }}
    </button>
  </div>

  </template>
  
  <script>
  export default {
 data() {
return {
 redDotPosition: { x: 300, y: 190 }, // 初始红点位置
 startPosition: { x: 300, y: 190 }, // 起始位置
  targetPosition: { x: 600, y: 150 }, // 目标位置
  running: false, // 是否正在运行
 interval: null // 定时器ID
  }
 },
   methods: {
 toggleMovement() {
  if (!this.running) {
this.startMovement();
 } else {
  this.stopMovement();
 }
   },
startMovement() {
this.running = true;
 if (this.interval) {
 clearInterval(this.interval);
}
this.interval = setInterval(() => {
// 线性插值计算新位置
 this.redDotPosition.x += (this.targetPosition.x - this.redDotPosition.x) * 0.05;
this.redDotPosition.y += (this.targetPosition.y - this.redDotPosition.y) * 0.05;
  
// 判断是否到达目标位置
 if (Math.abs(this.redDotPosition.x - this.targetPosition.x) < 1 && Math.abs(this.redDotPosition.y - this.targetPosition.y) < 1) {
 this.redDotPosition.x = this.startPosition.x; // 重置到起始位置
this.redDotPosition.y = this.startPosition.y;
 }
}, 20);
  },
 stopMovement() {
clearInterval(this.interval);
this.running = false;
}
 }
}
  </script>
  

  
<style scoped lang="scss">
.diagram-container {
    // border: 1px solid red;
    width: 100%;
    height: 310px;
    margin-bottom: 5px;
    /* Add your diagram styling here */
    .container {
      position:relative;
      width: 100%;
      height: 100%;
      .picContainer{
        border: 1px solid red;
        width: 100%;
        height: 100%;
        position: relative;
        .one {
          position: absolute;
          top: 140px;
          left: 200px;
          width: 100px;
          height: 100px;
          background:url(../../assets/imgs/newhome/left1.png);
          background-size: 100% 100%; 
          background-repeat: no-repeat;
          // border: 1px solid red;

        }
        .two {
          position: absolute;
          top: 0px;
          left: 400px;
          width: 300px;
          height: 100px;
          background:url(../../assets/imgs/newhome/center1.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          // border: 1px solid red;
        }
        .three {
          position: absolute;
          top: 100px;
          left: 500px;
          width: 300px;
          height: 100px;
          background:url(../../assets/imgs/newhome/center2.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          // border: 1px solid red;
        }
        .four {
          position: absolute;
          top: 200px;
          left: 550px;
          width: 300px;
          height: 100px;
          background:url(../../assets/imgs/newhome/center3.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          // border: 1px solid red;
        }
        .five {
          position: absolute;
          top: 150px;
          left: 900px;
          width: 100px;
          height: 100px;
          background:url(../../assets/imgs/newhome/bottom1.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          // border: 1px solid red;
        }
        .six {
          position: absolute;
          top: 100px;
          left: 1050px;
          width: 100px;
          height: 100px;
          background:url(../../assets/imgs/newhome/bottom2.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          // border: 1px solid red;
        }
      }
      .svg-container{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border: 1px solid green;
      }
    }

  }

</style> 