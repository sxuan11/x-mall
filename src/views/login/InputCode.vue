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
      info="验证码为6位"
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
  import { phoneCodeLogin } from './../../server/api/index'
  import { mapGetters , mapMutations , mapActions} from 'vuex'
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        showKeyboard: true,
        value:'',
        userInfo:null,
      }
    },
    methods: {
      ...mapMutations(['SET_USER_INFO']),
      ...mapActions(['syncUserInfo']),
      onClickLeft(){
        this.$router.back();
      },
      async onInput(key) {
        this.value = (this.value + key).slice(0, 6);
        if (this.value.length === 6) {
          let result = await phoneCodeLogin(this.userPhone,this.value)
          // console.log(result)
          if (result.success_code === 200){
            this.userInfo = result.data
            console.log(this.userInfo)
            this.syncUserInfo(result.data)
            this.$router.push('/profile')
          } else{
            Toast('验证码不正确')
          }
        } else {
          this.errorInfo = '';
          
        }

      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
      }, 
    },
    computed: {
      ...mapGetters([
        'userPhone',
    ])
  }
  }
</script>

<style scoped>

</style>