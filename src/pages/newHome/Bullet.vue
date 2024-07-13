<template>
    <div class="bulletsModule">
        <h2 class="title">主要设备</h2>
        <div class="bullet-container">

            <div class="bullet" v-for="(bullet, index) in bullets" :key="index">
                <div class="bullet-title">{{ bullet.title }}</div>
                <div class="bullet-content">
                    <div class="normal">{{bullet.normal}}</div>
                    <div class="broke">{{bullet.broke}}</div>
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
                    title: "风机",
                    content: "Content for bullet 1",
                    normal: 2,
                    broke: 3,
                },
                {
                    title: "光伏",
                    content: "",
                    normal: 5,
                    broke: 1,

                },
                {
                    title: "储能",
                    content: "Content for bullet 3",
                    normal: 2,
                    broke: 0,
                },
                {
                    title: "充电桩",
                    content: "Content for bullet 4",
                    normal: 1,
                    broke: 0
                },
                {
                    title: "空调",
                    content: "Content for bullet 5",
                    normal: 8,
                    broke: 0,
                },
                {
                    title: "灯具",
                    content: "Content for bullet 6",
                    normal: 20,
                    broke: 0,
                },
            ],
        };
    },
};
</script>
<style lang="scss" scoped>
.bulletsModule {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 10px;
    border: 1px solid rgb(14, 86, 155);
    border-radius: 10px;
    height: 300px;

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
        margin: 10px 5px;

        .bullet {
            border-radius: 5px;
            margin: 2px 15px;
            // border: 1Px solid red;
            // display: flex;
            // flex-direction: column;
            // align-items: center;
            // justify-content: space-between;
            height: 75px;

            .bullet-title {
                text-align: center;
                width: 100%;
                background-image: url(../../assets/imgs/newhome/bullet-title.png);
                font-size: 15px;
                margin: 0;
                height: 22px;
            }

            .bullet-content {
                display: flex;
                justify-content: space-between;
                width: 100%;
                font-size: 14px;
                text-align: center;
                background-color: rgb(16, 35, 106);
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;

                div {
                    width: 50%;
                    font-size: 25px;
                    margin-top: 10px;
                }

                .normal {
                    color: rgb(110, 227, 217);
                    text-align: center;
                    border-right: 1px solid rgb(23, 70, 154);
                }

                .broke {
                    text-align: center;
                    color: rgb(221, 0, 0);
                }
            }
        }
    }




}
</style>