<template>
    <div class="environmentModule">
        <h2 class="title">环境监测</h2>
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
                    title: "温度",
                    number: 30,
                    unit: "℃",
                },
                {
                    title: "PM2.5",
                    number: 45,
                    unit: "ug/m3",
                },
                {
                    title: "日照",
                    number: 302,
                    unit: "W/m2",
                },
                {
                    title: "湿度",
                    number: 16,
                    unit: "%",
                },
                {
                    title: "PM10",
                    number: 77,
                    unit: "ug/m3",
                },
                {
                    title: "风速",
                    number: 8,
                    unit: "m/s",
                },
            ],
        };
    },
    mounted() {
        this.startRandomFluctuation();
    },
    methods: {
        startRandomFluctuation() {
            setInterval(() => {
                this.bullets.forEach((bullet) => {
                    let fluctuation = (Math.random() - 0.5) * 0.20 * bullet.number;
                    bullet.number = Math.round(bullet.number + fluctuation,2 );
                });
            }, 1111111100);
        },
    },
};
</script>
<style lang="scss" scoped>
.environmentModule {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
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

    .bullet-container {
        margin: auto 10px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);

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