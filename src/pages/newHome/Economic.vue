<template>
    <div class="economicModule">
        <h2 class="title">经济环保统计</h2>
        <div class="content-container">
            <div class="time">
                <span>总计</span>
                <span>近一月</span>
                <span>近一周</span>
            </div>
            <div class="data">
                <span>{{ totalCost.toFixed(2) }}万</span>
                <span>{{ totalCoal.toFixed(2) }}吨</span>
                <span>{{ totalCO2.toFixed(2) }}吨</span>
            </div>
            <div class="description">
                <span>总节约经济成本</span>
                <span>总节约标准煤</span>
                <span>总减少CO2排放</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            totalCost: 0,
            totalCoal: 0,
            totalCO2: 0,
            targetCost: 1.51,
            targetCoal: 1.22,
            targetCO2: 9.89,
        };
    },
    mounted() {
        this.incrementValues();
    },
    methods: {
        incrementValues() {
            this.incrementValue('totalCost', this.targetCost,8000);
            this.incrementValue('totalCoal', this.targetCoal, 8000);
            this.incrementValue('totalCO2', this.targetCO2, 8000);
        },
        incrementValue(key, target, duration) {
            let interval = 20; // Update every 20ms
            let steps = duration / interval;
            let increment = target / steps;
            let count = 0;
            let timer = setInterval(() => {
                if (count < steps) {
                    this[key] += increment;
                    count++;
                } else {
                    this[key] = target;
                    clearInterval(timer);
                }
            }, interval);
        }
    }
};
</script>
<style lang="scss" scoped>
.economicModule {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    border: 1px solid rgb(14, 86, 155);
    border-radius: 10px;
    height: 250px;

    .title {
        text-align: center;
        background-image: url(../../assets/imgs/newhome/bg-bullet.png);
        width: 100%;
        font-size: 20px;
        margin: 5px 0;
        height: 40px;
        background-size: cover;
    }

    .content-container {
        width: 100%;
        display: grid;
        height: 100%;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1.5fr;
        // border: 1px solid red;
        .time{
            color: #fff;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            span{
                height: 13px;
                line-height: 13px;
                font-size: 13px;
                border-right: 1px solid rgb(52,235,238);
                padding-right: 35px; 
                margin-left: 15px;
            }
            span:last-child{
                border-right: none;
            }
        }
        .data{
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span{
                margin-left: 15px;
                font-size: 25px;
                padding-right: 25px;
            }
        }
        .description{
            margin-bottom: 30px;
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span{
                height: 13px;
                line-height: 13px;
                border-left: 5px solid rgb(52,235,238);
                font-size: 13px;
                padding-left: 10px;
            }
            span:first-child{
                border-color: rgb(232,62,58);
            }
            span:last-child{
                border-color: rgb(235, 219, 8);
            }
        }
    }




}
</style>