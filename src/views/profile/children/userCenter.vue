<template>
  <div>
    <van-nav-bar
      title="用户中心"
      :fixed="true"
      :border="false"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell title="用户名" :value="userInfo.real_name" style="margin-top:1rem"/>
    <van-cell title="手机号" :value="userInfo.phone" />
    <van-cell title="收货地址" is-link value="" />
    <van-button @click="logOut" type="danger" round size="large" style="width:90%;margin-left:5%;margin-top:0.5rem" hairline plain >退出登录</van-button>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { Cell , CellGroup , Toast } from 'vant';
  export default {
    data() {
      return {
        
      }
    },
    methods:{
      ...mapMutations(['USER_LOGOUT']),
      onClickLeft() {
        this.$router.back()
      },
      logOut(){
        this.USER_LOGOUT();
        Toast('退出登录成功')
        this.$router.push('/home')
      }
    },
    computed:{
      ...mapState(["userInfo"])
    },
  }
</script>

<style scoped>
.a{
  margin-left: 50%-2.5rem;
}
</style>