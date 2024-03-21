<script setup>
import {ref, watch, onMounted} from 'vue'
import {useMouseInElement} from '@vueuse/core'
import {useElementSize} from '@vueuse/core'
// 图片列表
const imageList = [
  "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
  "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
  "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
  "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
]
const activeIndex = ref(0)
const target = ref(null)
const mask = ref(null)
const setActiveIndex = (index) => {
  activeIndex.value = index
}
const {width: goodsImgW, height: goodsImgH} = useElementSize(target)
const {width: maskW, height: maskH} = useElementSize(mask)
const {elementX, elementY, isOutside} = useMouseInElement(target)

const left = ref(0)
const top = ref(0)
const largePicPosition = ref({x: 0, y: 0})
const largeSize = ref({})
const large = ref(null)

onMounted(() => {
  let element = large.value;
  let style = window.getComputedStyle(element);
  let backgroundSize = style.getPropertyValue('background-size');
  const reg = /(\d+)px/g;
  let arr = [...backgroundSize.matchAll(reg)];
  let bgW = +arr[0][1];
  let bgH = +arr[1][1];
  console.log(bgW, bgH);
  largeSize.value = {w:bgW, h:bgH}
});

watch([elementX, elementY, isOutside], () => {
  if (isOutside.value) return
  //有效范围
  if (elementX.value > maskW.value / 2 && elementX.value < goodsImgW.value - maskW.value / 2) {
    left.value = elementX.value - maskW.value / 2
  }
  if (elementY.value > maskH.value / 2 && elementY.value < goodsImgH.value - maskH.value / 2) {
    top.value = elementY.value - maskH.value / 2
  }
  //超出有效范围
  if (elementX.value <= maskW.value / 2) {
    left.value = 0
  }
  if (elementX.value >= goodsImgW.value - maskW.value / 2) {
    left.value = goodsImgW.value - maskW.value
  }
  if (elementY.value <= maskH.value / 2) {
    top.value = 0
  }
  if (elementY.value >= goodsImgH.value - maskH.value / 2) {
    top.value = goodsImgH.value - maskH.value
  }
  //放大镜图片位置
  largePicPosition.value = {
    x: -left.value * largeSize.value.w / goodsImgW.value,
    y: -top.value * largeSize.value.h / goodsImgH.value
  }

})

</script>


<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt=""/>
      <!-- 蒙层小滑块 -->
      <div class="layer" ref="mask" :style="{ left: `${left}px`, top: `${top}px` }" v-show="!isOutside"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="setActiveIndex(i)" :class="{active:activeIndex===i}">
        <img :src="img" alt=""/>
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" ref="large" :style="[
      {
        backgroundImage: `url(${imageList[0]})`,
        backgroundPositionX: `${largePicPosition.x}px`,
        backgroundPositionY: `${largePicPosition.y}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
