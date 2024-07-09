<template>
    <div class="lineCharts">
        <BMSCharts />
        <PressureCharts />
        <WindCharts />
    </div>
</template>

<script>
import BMSCharts from './charts/BMSCharts.vue';
import PressureCharts from './charts/PressureCharts.vue';
import WindCharts from './charts/WindCharts.vue';

export default {

    name: 'LineCharts',
    // Component logic goes here
}

</script>

<style scoped lang="scss">
.lineCharts {}
</style>