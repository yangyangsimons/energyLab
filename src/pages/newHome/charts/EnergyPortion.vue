<template>
    <div class="energyPortionModule">
        <h2 class="title">能源占比</h2>
        <div id="chartContainer" ref="chartContainer"></div>
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

onMounted(() => {
    let chartDom = document.getElementById('chartContainer');
    const myChart = echarts.init(chartDom);
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    option && myChart.setOption(option);
    // // 监视特定参数的变化，并更新图表数据
    // watch(() => awlStore.params["16486"], (newValue) => {
    //     console.log(awlStore.params)
    //     updateChartData(newValue * 2 + 1500);
    // }, { immediate: true });
});

onUnmounted(() => {
    if (chartInstance.value) {
        chartInstance.value.dispose();
    }
});

function updateChartData(newValue) {
    const now = new Date();
    const dataPoint = { value: [now, newValue] };

    const option = chartInstance.value.getOption();
    option.series[0].data.push(dataPoint);

    // 保持图表数据点数量，例如最近100个数据点
    if (option.series[0].data.length > 100) {
        option.series[0].data.shift();
    }

    chartInstance.value.setOption(option, { notMerge: true });
}
</script>
<style lang="scss" scoped>
    .energyPortionModule{
        width: 100%;
        height: 300px;
        color: #fff;
        .title {
        text-align: center;
        background-image: url(../../../assets/imgs/newhome/bg-bullet.png);
        width: 100%;
        font-size: 20px;
        margin: 5px 0;
        height: 40px;
        background-size: cover;

        }
        #chartContainer {
        margin-top: 10px;
        width: 100%;
        height: 100%;
        border: 1px solid rgb(14, 86, 155);
        border-radius: 10px;
    }
    }
   
</style>