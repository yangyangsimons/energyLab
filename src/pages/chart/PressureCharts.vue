<template>
    <div ref="chartContainer4" style="width: 20%; height: 400px;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { AwlStore } from '../../store';

const awlStore = AwlStore();
const chartInstance = ref(null);
const chartContainer4 = ref(null);

onMounted(() => {
    chartInstance.value = echarts.init(chartContainer4.value);
    chartInstance.value.setOption({
        title: {
            text: 'Load Demand (W)'
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
                    return echarts.format.formatTime('mm', value);
                }
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            name: 'Temperature',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: []
        }]
    });

    // 监视特定参数的变化，并更新图表数据
    watch(() => awlStore.params["16486"], (newValue) => {
        console.log(awlStore.params)
        updateChartData(newValue * 28);
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
    if (option.series[0].data.length > 100) {
        option.series[0].data.shift();
    }

    chartInstance.value.setOption(option, { notMerge: true });
}
</script>