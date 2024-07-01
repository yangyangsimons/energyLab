<template>
  <div
    style="overflow-y:scroll;overflow-x: hidden; height: 100vh; width: 100vw; background-color: #f2f2f2; padding: 10px;">


    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding:  0;">


      <div class="w-frame">
        <w-home-1></w-home-1>
        <div >实时能源消耗数据</div>
      </div>

      <div class="w-frame">
        <w-home-2></w-home-2>
        <div >历史能源消耗数据</div>
      </div>


      <div class="w-frame">
        <w-ls-count :param-titles="['瞬时总有功功率']" :param-ids="[16400]" color="#333333" color1="#cccccc" width="100%"
          height="20rem"></w-ls-count>
        <div>微电网接入中央测控柜</div>
      </div>
      <div class="w-frame">
        <w-ls-count :param-titles="['SOC']" :param-ids="[16484]" :colors="['#090']" color="#333333" color1="#cccccc"
          width="100%" height="20rem"></w-ls-count>
        <div>锂电池BMS</div>
      </div>
      <div class="w-frame">
        <w-ls-count :param-titles="['直流功率', 'A相功率', 'B相功率', 'C相功率']" :param-ids="[16433, 16440, 16441, 16442]"
          color="#333333" color1="#cccccc" width="100%" height="20rem"></w-ls-count>
        <div>储能双向变流器</div>
      </div>
      <div class="w-frame">
        <w-ls-count :param-titles="['Pa', 'Pb', 'Pc']" :param-ids="[16508, 16509, 16510]" color="#333333" color1="#cccccc"
          width="100%" height="20rem"></w-ls-count>
        <div>RLC可编程模拟负载</div>
      </div>
      <div class="w-frame">
        <w-ls-count :colors="['#833471']" :per="5" :num="15" :param-titles="['直流功率']" :param-ids="[16554]" color="#333333"
          color1="#cccccc" width="100%" height="20rem"></w-ls-count>
        <div>机测</div>
      </div>

      <div class="w-frame">
        <w-ls-count :colors="['#e056fd']" :per="5" :num="15" :param-titles="['当前功率']" :param-ids="[16570]" color="#333333"
          color1="#cccccc" width="100%" height="20rem"></w-ls-count>
        <div>网侧</div>
      </div>
    </div>
</div>
</template>
<script setup>
import WLsCount from '@/components/energylab/WLsCount.vue';
import WHome1 from '@/components/k4/WHome1.vue';
import WHome2 from '@/components/k4/WHome2.vue';
</script>
<style scoped>
.w-frame {
  box-sizing: border-box;
  border: solid 1px #e2e2e2;
  background-color: #FFF;
  min-height: 5em;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
