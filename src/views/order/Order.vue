<template>
  <div id="order"> 

    <!-- 导航条 -->
    <van-nav-bar
      title="确认订单"
      left-text="返回"
      right-text="登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="showList = true"
    />

    <!-- 联系人列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-contact-list
        v-model="chosenContactId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>
    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>

    <van-cell-group>
    <!-- 送达时间选择 -->
    <van-cell title="送达时间" is-link  @click="showPopupTime" class="arriveTime">
      <div></div>
      <div>
        <div v-if="currentDate=== 0" class="arriveTimeDetail">{{noSelect}}</div>
        <div v-else class="arriveTimeDetail">{{currentDate | dateformat('YYYY-MM-DD HH:mm:ss')}}</div>
      </div> 
      </van-cell>
    <van-popup 
        position="bottom"
        :style="{ height: '35%' }"
        v-model="timeShow"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm='confirm'
        @cancel='cancel'
      />
    </van-popup>

    <!-- 商品列表 -->
    <van-cell is-link arrow-direction="down" @click="showPopupShop" class="shopList">
      <div class="shopListDetail">
        <div class="shopListDetail-1">
          <img class="shopListDetailImg" src="https://img.yzcdn.cn/vant/ipad.jpeg"> 
          <img class="shopListDetailImg" src="https://img.yzcdn.cn/vant/ipad.jpeg">
        </div>
        <div class="shopListDetail-2">共{{}}件</div>
      </div>
    </van-cell>
    <van-popup 
        position="bottom"
        :style="{ height: '65%' }"
        v-model="shopShow"
    >
     <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
    </van-popup>
    </van-cell-group>

    <van-cell-group>
    <!-- 支付方式 -->
    <van-cell title="支付方式" value="微信">
    </van-cell>
    </van-cell-group>

    <!-- 备注 -->
    <van-cell-group>
    <van-field
      v-model="message"
      rows="1"
      autosize
      label="备注"
      type="textarea"
      placeholder="请输入备注"
    />
    </van-cell-group>

    <!-- 商品詳情 -->
    <van-cell-group>
    <!-- 支付方式 -->
    <van-cell title="商品金额">
    </van-cell>
    <van-cell title="配送费">
    </van-cell>
    </van-cell-group>

    <!-- 优惠卷 -->
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px;"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
    
    <!-- 订单提交 -->
    <van-submit-bar
      :price="3050"
      button-text="提交订单"
      @submit="onSubmit"
      :loading="loading"
    />
  </div>
</template>

<script>
  const coupon = {
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    reason: '',
    value: 150,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '1.5',
    unitDesc: '元'
  };
  import { Toast , Popup } from 'vant';
  export default {
    data() {
      return {
         chosenContactId: null,
          editingContact: {},
          showList: false,
          showEdit: false,
          isEdit: false,
          list: [{
            name: '张三',
            tel: '13000000000',
            id: 0
          }],
          loading:false,
          noSelect:'未指定',
          timeShow: false,
          shopShow: false,
          minDate: new Date(),
          maxDate: new Date(2025, 10, 1),
          currentDate: 0,
          message:'',
          chosenCoupon: -1,
          coupons: [coupon],
          disabledCoupons: [coupon]
      }
    },
    methods: {
      //提交订单
      onSubmit(){
        this.loading= true
      },
      onClickLeft() {
        this.$router.push({path:'/cart'})
      },
      onClickRight() {
        Toast('登录');
      },
      onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      },
      onExchange(code) {
        this.coupons.push(coupon);
      },

      // 添加联系人
      onAdd() {
        this.editingContact = { id: this.list.length };
        this.isEdit = false;
        this.showEdit = true;
      },

      // 编辑联系人
      onEdit(item) {
        this.isEdit = true;      
        this.showEdit = true;
        this.editingContact = item;
      },

      // 选中联系人
      onSelect() {
        this.showList = false;
      },

      // 保存联系人
      onSave(info) {
        this.showEdit = false;
        this.showList = false;
        
        if (this.isEdit) {
          this.list = this.list.map(item => item.id === info.id ? info : item);
        } else {
          this.list.push(info);
        }
        this.chosenContactId = info.id;
      },

      // 删除联系人
      onDelete(info) {
        this.showEdit = false;
        this.list = this.list.filter(item => item.id !== info.id);
        if (this.chosenContactId === info.id) {
          this.chosenContactId = null;
        }
      },

      // 时间弹出框
      showPopupTime(){
        this.timeShow = true;
      },

      //商品詳情弹出框
      showPopupShop(){
        this.shopShow = true;
      },

      //点击完成按钮时触发的事件
      confirm(){
        this.timeShow= false
      },

      //
      cancel(){
        this.timeShow= false
        this.currentDate= 0
      }
    },
    computed: {
      cardType() {
        return this.chosenContactId !== null ? 'edit' : 'add';
      },

      currentContact() {
        const id = this.chosenContactId;
        return id !== null ? this.list.filter(item => item.id === id)[0] : {};
      }
    },
  }
</script>

<style scoped>
#order{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.arriveTime{

}
.shopListDetail{
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
}
.shopListDetailImg{
  width: 1.5rem;
  height: 1.5rem;
}
</style>