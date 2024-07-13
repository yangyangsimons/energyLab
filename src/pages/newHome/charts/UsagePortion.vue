<template>
    <div class="usageModule">
        <h2 class="title">用电占比</h2>
        <div id="usageContainer" ref="usageContainer"></div>
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
    let chartDom = document.getElementById('usageContainer');
    const myChart = echarts.init(chartDom);
    let option = {
        // tooltip: {
        //     trigger: 'item'
        // },
        legend: {
            orient: 'vertical',
            left: '65%',
            top: '30%',
            textStyle: {
                color: '#fff',
                fontSize: 18
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['50%', '60%'],
                data: [
                    { value: 1548, name: '生产用电' },
                    { value: 535, name: '生活用电' },
                    { value: 980, name: '商业用电' }
                ],
                label: {
                show: false,
                position: 'inside',
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                }
            },
            center: ['30%', '35%'],
            width: '120%',
            height: '120%',
            },
            
        ]
    };
    option && myChart.setOption(option);
    // // 监视特定参数的变化，并更新图表数据
    // watch(() => awlStore.params["16486"], (newValue) => {
    //     console.log(awlStore.params)
    //     updateChartData(newValue * 2 + 1500);
    // }, { immediate: true });
});

</script>

<style lang="scss" scoped>
    .usageModule{
        display: flex;
    flex-direction: column;
    height: 250px;
    width: 37%;
    border: 1px solid rgb(14, 86, 155);
    border-radius: 10px;
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
        #usageContainer {
        margin-top: 10px;
        width: 100%;
        height: 100%;
        
    }
    }
   
</style>