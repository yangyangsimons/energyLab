<template>
    <div class="safeModule">
        <h2 class="title">安全监测</h2>
        <div class="subtitle-container">
            <div class="safeIcon">
                <svg t="1720751509012" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4327" width="64" height="64"><path d="M145.5104 197.888v380.6208c0 207.2064 164.096 375.1424 366.4896 375.1424 202.3936 0 366.4896-167.936 366.4896-375.1424v-380.416L509.7984 74.0352 145.5104 197.888zM509.696 0L947.2 147.1488v431.36C947.2 824.5248 752.3328 1024 512 1024s-435.2-199.4752-435.2-445.4912V147.1488L509.696 0z m226.2528 332.032a33.792 33.792 0 0 0-48.5376 2.9184L466.432 589.3632 323.6864 431.4112a33.792 33.792 0 0 0-48.5376-1.9456 35.7376 35.7376 0 0 0-1.8944 49.7152l168.448 186.368a33.792 33.792 0 0 0 50.944-0.512l246.1184-283.3408a35.7376 35.7376 0 0 0-2.816-49.664z" fill="#1296db" p-id="4328"></path></svg>
                <span class="words">防护</span>
            </div>
            <div class="content-container">
                <span class="content-title">安全运行天数 {{currentNumber}} 天</span>
                <div class="img-safe"></div>
            </div>
        </div>
    </div>

</template>



<script>
export default {
    data() {
        return {
            currentNumber: -20,
        };
    },
    mounted() {
        this.incrementNumber();
    },
    methods: {
        incrementNumber() {
            let targetNumber = 211;
            let interval = 1111111111120; // 设定每次增加的间隔时间，单位为毫秒
            let increment = 1; // 设定每次增加的数值
            
            let timer = setInterval(() => {
                if (this.currentNumber < targetNumber) {
                    this.currentNumber += increment;
                } else {
                    clearInterval(timer);
                }
            }, interval);
        }
    }
};
</script>
<style lang="scss" scoped>
.safeModule {
    color: #fff;
    border: 1px solid rgb(14, 86, 155);
    border-radius: 10px;
    .title {
        text-align: center;
        background-image: url(../../assets/imgs/newhome/bg-bullet.png);
        width: 100%;
        font-size: 20px;
        margin: 5px 0;
        height: 40px;
        background-size: cover;
    }
    .subtitle-container {
        // border: 1px solid red;
        width: 100%;
        height: 100%;
        .safeIcon{
            // border: 1px solid yellow;
            margin: 10px 0;
            display: flex;
            align-items: center;
            .icon {
                margin-left: 30px;
                width: 25px;
                height: 25px;
            }
            .words {
                font-size: 12px;
                margin-left: 10px;
            }
        }
        .content-container{
            // border: 1px solid green;
            display: flex;
            align-items: center;
            flex-direction: column;
            .content-title{
                font-size: 16px;
            }
            .img-safe{
                // border: 1px solid blue;
                margin-top: 20px;
                width: 185px;
                height: 185px;
                background-image: url(../../assets/imgs/newhome/safe.png);
                background-size: cover;
            }
        }
    }
}

</style>