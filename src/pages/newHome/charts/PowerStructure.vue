<template>
    <div class="powerStructureModule">
        <div class="title">供电结构</div>
        <div id="barContainer" ref="barContainer"></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { ref, watch, getCurrentInstance, onMounted, onUnmounted } from 'vue';
// import { onMounted, onUnmounted, ref, watch } from 'vue';
// import { AwlStore } from '../../store';

// const awlStore = AwlStore();
const chartInstance = ref(null);
const chartContainer = ref(null);
const rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310],
        [150, 212, 201, 154, 190, 330, 410],
    ];
    const totalData = [];
    for (let i = 0; i < rawData[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < rawData.length; ++j) {
            sum += rawData[j][i];
        }
        totalData.push(sum);
    }
onMounted(() => {
    let chartDom = document.getElementById('barContainer');
    let myChart = echarts.init(chartDom);

    // There should not be negative values in rawData

    const series = [
        '储能',
        '风电',
        '光电',
        '电网',
    ].map((name, sid) => {
        return {
            name,
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            label: {
                show: false,
                formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
            },
            data: rawData[sid].map((d, did) =>
                totalData[did] <= 0 ? 0 : d / totalData[did]
            )
        };
    });
    let option = {
        legend: {
            orient: 'horizontal',
            left: '10%',
            top: '0%',
            textStyle: {
                color: '#fff',
                fontSize: 18
            }
        },
        grid : {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: '20%',
        containLabel: true
    },
        yAxis: {
            type: 'value'
        },
        xAxis: {
            type: 'category',
            data: ['2024-07-06', '2024-07-07', '2024-07-08', '2024-07-09', '2024-07-10', '2024-07-11', '2024-07-012'],
        },
        series: series,
    };

    myChart.setOption(option);
});
</script>
<style lang="scss" scoped>
.powerStructureModule {
    display: flex;
    flex-direction: column;
    height: 250px;
    width: 62%;
    border: 1px solid rgb(14, 86, 155);
    border-radius: 10px;
    color: #fff;

    .title {
        text-align: center;
        background-image: url(../../../assets/imgs/newhome/bg-bullet.png);
        width: 100%;
        font-size: 20px;
        height: 40px;
        background-size: cover;

    }

    #barContainer {
        margin-top: 10px;
        width: 100%;
        height: 100%;
    }
}
</style>