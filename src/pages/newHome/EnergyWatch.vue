<template>
    <div class="energyModule">
        <h2 class="title">能源监测</h2>
        <div class="bullet-container">

            <div class="bullet" v-for="(bullet, index) in bullets" :key="index">
                <div class="bullet-title">{{ bullet.title }}</div>
                <div class="bullet-content">
                    <div class="number">{{ bullet.number }}</div>
                    <div class="unit">{{ bullet.unit }}</div>
                </div>
            </div>
        </div>
    </div>

</template>



<script>
export default {
    data() {
        return {
            bullets: [
                {
                    title: "光伏日发电量",
                    number: 179385.4,
                    unit: "kWh",
                },
                {
                    title: "风机日发电量",
                    number: 179385.4,
                    unit: "kWh",
                },
                {
                    title: "可放电量",
                    number: 179385.4,
                    unit: "kWh",
                },
                {
                    title: "可充电量",
                    number: 179385.4,
                    unit: "kWh",
                },
                {
                    title: "充电桩当日充电",
                    number: 555.5,
                    unit: "kWh",
                },
                {
                    title: "供电系统能效",
                    number: 0.95,
                    unit: "%",
                },
            ],
        };
    },
};
</script>
<style lang="scss" scoped>
.energyModule {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    border: 1px solid rgb(14, 86, 155);
    border-radius: 10px;
    height: 260px;

    .title {
        text-align: center;
        background-image: url(../../assets/imgs/newhome/bg-bullet.png);
        width: 100%;
        font-size: 20px;
        margin: 5px 0;
        height: 40px;
        background-size: cover;
    }

    .bullet-container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);

        .bullet {
            border-radius: 5px;
            // border: 1Px solid red;
            // display: flex;
            // flex-direction: column;
            // align-items: center;
            // justify-content: space-between;
            height: 65px;

            .bullet-title {
                text-align: center;
                width: 100%;
                // background-image: url(../../assets/imgs/newhome/bullet-title.png);
                font-size: 15px;
                margin: 0;
                height: 22px;
            }

            .bullet-content {
                display: flex;
                justify-content: center;
                width: 100%;
                font-size: 14px;
                text-align: center;
                // background-color: rgb(16, 35, 106);
                // border-bottom-left-radius: 5px;
                // border-bottom-right-radius: 5px;

                .number {
                    vertical-align: middle;
                    text-align: right;
                    line-height: 30px;
                    height: 30px;
                    font-size: 23px;
                }

                .unit {
                    margin-left: 5px;
                    vertical-align: bottom;
                    font-size: 10px;
                    height: 30px;
                    line-height: 30px
                }
            }
        }
    }




}
</style>