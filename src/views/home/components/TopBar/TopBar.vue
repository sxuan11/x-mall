<template>
  <div>
    <div class="wrap">
        <div class="search-wrap">
            <form action="/">
                <van-search
                        label="广州广州塔"
                        placeholder="请输入关键词"
                        show-action
                        shape="round"
                        left-icon="location-o"
                        right-icon="search"
                        v-model="value"
                >
                    <div slot="action" @click="onSearch">搜索</div>
                </van-search>
            </form>
        </div>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        value:'',
        location:'广州'
      }
    },
    methods:{
        onSearch(){

        }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
    /*margin-bottom: 3px;*/
}
</style>