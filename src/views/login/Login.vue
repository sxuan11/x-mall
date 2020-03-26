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
        <van-button ref="getButton" square block type="info" native-type="submit" @click="getcode" :disabled="disable" :loading='loading'  > 
          获取验证码
        </van-button>
      </div>
      <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import { Notify } from 'vant';
  import { getPhoneCode } from './../../server/api/index'
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        userPhone: null,
        disable:true,
        error:false,
        error_message:'',
        count_down:60,
        loading:false
      };
    },
    computed:{

    },
    methods: {
      ...mapMutations(['SET_USER_PHONE']),
      onSubmit(values) {
        console.log('submit', values);
      }, 
      onClickLeft() {
        this.$router.back()
      },
      async getcode(){
        this.loading = true
        this.SET_USER_PHONE(this.userPhone)
        let result = await getPhoneCode(this.userPhone);
        console.log(result)
        Toast.success('验证码发送成功')
        this.$router.push('/inputcode')
        Notify({message:result.code,duration:10000,type: 'primary'});
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
      },
    }
  }
</script>

<style scoped>

</style>