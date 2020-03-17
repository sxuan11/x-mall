<template>
  <div style="z-index:3000">
    <van-nav-bar
      title="新增地址"
      left-text="返回"
      right-text="登录"
      left-arrow
      :border=true
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
  import areaList from './Area'
  import { Toast } from 'vant';
  export default {
    data() {
      return {
        areaList,
        searchResult: []
      }
    },
    methods: {
      onSave() {
        Toast('save');
      },
      onClickLeft(){
        this.$router.back()
      },
      onClickRight(){
        
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [
            {
            name: '天河体育中心',
            address: '广州市天河区'
            },
            {
            name: '天河体育西路',
            address: '广州市天河区'
            }
          ];
        } else {
          this.searchResult = [];
        }
      }
    }
  }
</script>

<style scoped>

</style>