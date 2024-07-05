<template>
    <div class="page">
        <header class="header">
            <div class="logo"></div>
            <h1 class="title">园区微电网智慧能源管控平台</h1>
        </header>
        <main class="main">
            <div class="leftSide">
                <Bullet />
                <EnergyWatch />
                <EnergyPortion />
            </div>
            <div class="center">
                <div class="diagram"></div>
                <div class="lineCharts"></div>
                <div class="pieCharts"></div>
            </div>
            <div class="rightSide"></div>

        </main>
    </div>
</template>
<script setup>
import Bullet from './Bullet.vue';
import EnergyWatch from './EnergyWatch.vue';
import EnergyPortion from './charts/EnergyPortion.vue';
</script>
<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-image: url(../../assets/imgs/newhome/bg-page.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.header {
    border: 1px solid yellow;
    display: flex;
    align-items: center;
    height: 100px;
    background-image: url(../../assets/imgs/newhome/bg-title.png);
    color: #fff;
    background-size: cover;

    .logo {
        width: 75px;
        height: 80px;
        background-image: url(../../assets//imgs//newhome/logo-column-2.png);
    }

    .title {
        font-size: 30px;
    }

}


.main {
    border: 1px solid red;
    display: flex;
    flex: 1;


    .leftSide {
        width: 350px;
        border: 1px solid #ccc;
    }

    .rightSide {
        border: 1px solid #ccc;
        width: 350px;
    }

    .center {
        border: 1px solid yellow;
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 10px;

        .diagram {
            flex: 1;
        }

        .lineCharts {
            flex: 1;
        }

        .pieCharts {
            flex: 1;
        }
    }

}
</style>