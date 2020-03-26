<template>
  <div>
    <van-nav-bar
      title="选择登录方式"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="login">
      <van-button round type="info" plain size="normal" to="/login" class="loginAction">手机登录</van-button>
      <img src="./img/shopCart.png" alt="" class="loginImg">
      <span class="loginText">登录后可查看购物车的商品</span>
    </div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
    }
  }
</script>

<style scoped>
.login{
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  align-items: center;
  justify-content: center;
}
.loginImg{
  width: 2.5rem;
  height: 2.5rem;
  margin-top: 1rem;
}
.loginText{
  font-size: 0.35rem;
  margin-top: 0.3rem;
}
.loginAction{
  width: 4rem;
}
</style>