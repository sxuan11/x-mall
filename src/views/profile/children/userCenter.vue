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
  import { Cell , CellGroup , Toast, Form } from 'vant';
  import { userLogOut }  from './../../../server/api/index.js'
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
      async logOut(){    
        let result = await userLogOut();
        if(result.success_code === 200){
          this.USER_LOGOUT();
          Toast(result)
          this.$router.push('/home')
        }else {
          Toast('其他错误')
        }
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