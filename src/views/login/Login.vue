<template>
  <div>
    <van-nav-bar
      title="登录注册"
      left-arrow
      @click-left="onClickLeft"
    />
      <van-field
        v-model="username"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <div style="margin: 16px;">
        <van-button square block type="info" native-type="submit" @click="getcode">
          获取验证码
        </van-button>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
      };
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      }, 
      onClickLeft() {
        this.$router.back()
      },
      getcode(){
        this.$router.push('/inputcode')
      }
    }
  }
</script>

<style scoped>

</style>