<template>
  <div>
    <van-nav-bar
      title="登录注册"
      left-arrow
      @click-left="onClickLeft"
    />
      <van-field
        v-model="userPhone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :error="error"
        :error-message="error_message"
        :blur="checkInput(userPhone)"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <div style="margin: 16px;">
        <van-button ref="getButton" square block type="info" native-type="submit" @click="getcode" :disabled="disable">
          获取验证码
        </van-button>
      </div>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        userPhone: '',
        disable:true,
        error:false,
        error_message:'',
      };
    },
    computed:{
      
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
      },
      checkInput(userPhone){
        let myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if (!myreg.test(userPhone)) {
            this.error = true
            this.disable = true;
            this.error_message = "请输入正确的手机号"
            return false;
         }  else {
            this.disable = false;
            this.error = false;
            this.error_message = ''
            return true;
         }     
      }
    }
  }
</script>

<style scoped>

</style>