<template>
  <div>
    <van-swipe :autoplay="3000" class="top-swipe">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="s-img"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.top-swipe{
  width: 100%;
  height: 160px;
}
.s-img{
  width: 100%;
  height: 100%;
}
</style>