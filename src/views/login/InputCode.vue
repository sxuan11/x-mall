<template>
  <div>
    <van-nav-bar
      title="验证码输入"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      info="密码为 6 位数字"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      :mask='false'
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showKeyboard: true,
        value:''
      }
    },
    methods: {
      onClickLeft(){
        this.$router.back();
      },
      onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
      },
    },
  }
</script>

<style scoped>

</style>