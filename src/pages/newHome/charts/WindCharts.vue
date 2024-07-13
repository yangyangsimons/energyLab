<template>
    <div class="windContainer">
        <div class="title">风电</div>
        <div ref="chartContainer2" id="chartContainer2"></div>
    </div>

</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { AwlStore } from '../../../store';

const awlStore = AwlStore();
const chartInstance = ref(null);
const chartContainer2 = ref(null);

onMounted(() => {
    chartInstance.value = echarts.init(chartContainer2.value);
    chartInstance.value.setOption({
        title: {
            text: 'Wind Power (kW)',
            textStyle: {
                color: '#fff',
                fontSize: 16,
                fontFamily: 'Arial',

            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                params = params[0];
                const date = new Date();
                return date.toLocaleTimeString('zh-CN', { minute: '2-digit', second: '2-digit' }) + ' : ' + params.value[1].toFixed(2) + ' ℃';
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: (value) => {
                    // 将时间戳格式化为仅显示分钟和秒
                    return echarts.format.formatTime('s', value);
                },

            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ccc',
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#0E569B',
                    type: 'dashed'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#ccc',

                }
            },

        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '20%',
            containLabel: true
        },
        series: [{
            name: 'Temperature',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: [],
            smooth: false,
            lineStyle: {
                color: 'red',
                width: 2
            }
        }]
    });

    // 监视特定参数的变化，并更新图表数据
    watch(() => awlStore.params["16554"], (newValue) => {
        console.log(awlStore.params)
        updateChartData((newValue * 2 + 1500)*1.5);
    }, { immediate: true });
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
    if (option.series[0].data.length > 10) {
        option.series[0].data.shift();
    }

    chartInstance.value.setOption(option, { notMerge: true });
}
</script>
<style lang="scss" scoped>
.windContainer {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 24%;
    border: 1px solid rgb(14, 86, 155);
    border-radius: 10px;

    .title {
        text-align: center;
        background-image: url(../../../assets/imgs/newhome/bg-bullet.png);
        width: 100%;
        font-size: 20px;
        height: 40px;
        background-size: cover;

    }

    #chartContainer2 {
        margin-top: 10px;
        width: 100%;
        height: 100%;
    }
}
</style>