<template>
  <div id="order"> 
    <div>
    <!-- 导航条 -->
    <van-nav-bar
      title="确认订单"
      left-text="返回"
      :right-text="userInfo.real_name"
      left-arrow
      :fixed=true
      :border=true
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 收货地址 -->
    <van-contact-card
      :type="address_type"
      :name="address_name"
      :tel="address_phone"
      add-text="选择收货地址"
      @click="chooseAddress"
      style="margin-top: 0.8rem"
    />

    <!-- 联系人列表 -->
    <!-- <van-popup v-model="showList" position="bottom">
      <van-contact-list
        v-model="chosenContactId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup> -->
    <!-- 联系人编辑 -->
    <!--<van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      /> -->
    <!-- </van-popup> -->


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
    <van-cell is-link title='商品' @click="showPopupShop"   :value="'共'+this.shoplist.length+'件'"  arrow-direction="down">
      <!-- <img :src="this.shoplist[0].small_image" alt="" class="shopListDetailImg">
      <img :src="this.shoplist[1].small_image" alt="" class="shopListDetailImg">
      <img :src="this.shoplist[2].small_image" alt="" class="shopListDetailImg"> -->
      <!-- <div class="shopListDetail">
        <div class="shopListDetail-1" v-for="(item , index) in shoplist " :key="index">
          <img class="shopListDetailImg" :src="item.small_image"> 
        </div>
      </div> -->
    </van-cell>
    <van-popup 
        position="bottom"
        :style="{ height: '65%' }"
        v-model="shopShow"
    >
     <van-card
        v-for="(item , index) in shoplist " :key="index"
        :num="item.num "
        :price="item.goods_price | NOmoneyFormat"     
        :title="item.goods_name"
        :thumb="item.small_image"
      />
    </van-popup>
    <van-cell >
    <div class="shopListDetail">
        <div class="shopListDetail-1" v-for="(item , index) in shoplist " :key="index">
          <img class="shopListDetailImg" :src="item.small_image"> 
        </div>
      </div>  
    </van-cell>
    </van-cell-group>

    <van-cell-group>
    <!-- 支付方式 -->
    <van-cell title="支付方式" is-link :value="paySelecyName" @click="showPayCli">
    </van-cell>
    <van-popup 
        position="bottom"
        :style="{ height: '25%' }"
        v-model="showPay"
    > 
      <!-- <van-radio-group v-model="paySelect" @change="selectPay(radio)">
        <van-cell-group>
          <van-cell title="微信" clickable @click="radio = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="支付宝" clickable @click="radio = '2'">
            <van-radio slot="right-icon" name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group> -->

      <!-- <van-radio-group v-model="paySelect" @change="selectPay(radio)" class="paySelect">
        <van-radio name="1" shape="square" class="paySelect" @click="radio = '1'">微信</van-radio>
        <van-radio name="2" shape="square" class="paySelect" @click="radio = '2'">支付宝</van-radio>
      </van-radio-group> -->

      <van-radio-group v-model="paySelect" @change="selectPay(radio)">
        <van-cell-group>
          <van-cell title="微信" clickable @click="radio = 1">
            <van-radio slot="right-icon" name=1 @click="closeCell" />
          </van-cell>
          <van-cell title="支付宝" clickable @click="radio = 2">
            <van-radio slot="right-icon" name=2 @click="closeCell" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>

    </van-popup>
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
    <van-cell title="商品金额" :value="totalPrice | moneyFormat">
    </van-cell>
    <van-cell title="配送费" :value="disPrice | moneyFormat">
    </van-cell>
    </van-cell-group>

    <!-- 优惠卷 -->
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showListCoupon = true"
    />
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showListCoupon"
      round
      position="bottom"
      style="height: 70%; padding-top: 4px;"
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
      :price="totalPrice*100 + disPrice*100"
      button-text="去支付"
      @submit="onSubmit"
      :loading="loading"
    />
    </div>
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
    unitDesc: '元',
  };
  
  import PubSub from 'pubsub-js';
  import { Toast , Popup } from 'vant';
  import { selectShopNow }  from './../../server/api/index'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        address_type: 'add', // 地址卡片类型
        address_name: null, // 收货人
        address_phone: null, // 收货人电话
        address_id: null, // 收货人地址ID
        chosenContactId: null,
        editingContact: {},
        showList: false,
        showListCoupon: false,
        showEdit: false,
        showPay:false,
        isEdit: false,
        paySelect:'1',
        paySelecyName:"微信",
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
        disabledCoupons: [coupon],
        shoplist:[],
        totalPrice:null,
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
        Toast(this.userInfo.real_name);
      },
      onChange(index) {
      this.showListCoupon = false;
      this.chosenCoupon = index;
      },
      onExchange(code) {
        this.coupons.push(coupon);
      },

      //选择地址
      chooseAddress(){
        this.$router.push('addresslist')
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

      //选中自动回调
      closeCell(){
        this.showPay = !this.showPay
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

      //支付方式选择
      showPayCli(){
        this.showPay = true;
      },
      selectPay(e){
        if(e === 1){
          this.paySelecyName  = "微信";
          // this.paySelect = 1
        }else{
          this.paySelecyName  = "支付宝";
          // this.paySelect = 2
        }
      },


      //点击完成按钮时触发的事件
      confirm(){
        this.timeShow= false
      },

      //
      cancel(){
        this.timeShow= false
        this.currentDate= 0
      },
      //查询提交订单的商品
      async nowCommit(){
        let result = await selectShopNow(this.userInfo.token)
        if(result.success_code === 200){
          this.shoplist = result.data
        }
      },
      //计算商品总价
      counterShopPrice(){
        Object.values(this.shopCart).forEach((goods, index)=>{
          if(goods.checked){
            this.totalPrice += goods.salePrice * goods.num;    
          }
        });
        // console.log(this.totalPrice,this.shopCart)
        this.totalPrice = this.totalPrice.toFixed(2)
      }
    },
    computed: {
      ...mapState(['userInfo','shopCart']),
      //地址编辑类型
      cardType() {
        return this.chosenContactId !== null ? 'edit' : 'add';
      },
      //选中地址id
      currentContact() {
        const id = this.chosenContactId;
        return id !== null ? this.list.filter(item => item.id === id)[0] : {};
      },
      // countTotalPrice(){
      //     let totalPrice = 0;
      //     console.log(this.shoplist)
      //     console.log(this.shopCart)
      //     Object.values(this.shopCart).forEach((goods, index)=>{
      //         if(goods.checked){
      //             this.totalPrice += goods.salePrice * goods.num;
      //         }
      //     });
      //     // return totalPrice.toFixed(2);
      // },
      disPrice(){
        // 商品总价 > 50 免配送费  <50 6元
        if(this.totalPrice > 50){
            return 0;
        }else {
            return 6;
        }
      }
    },
    mounted(){
      //查看当前选中的商品    
      this.nowCommit();

      PubSub.subscribe('AddressSelect',(msg,item)=>{
        if(msg='AddressSelect'){
          this.address_type = 'edit';
          this.address_name = item.name;
          this.address_phone = item.tel;
          this.address_id = item.id;
        }
      });
      this.counterShopPrice()
    },
    beforeUpdate(){

    }
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
  align-items: center;
  justify-content: flex-start;
  overflow-x: scroll;
}
.shopListDetailImg{
  width: 1.5rem;
  height: 1.5rem;
  flex-wrap: nowrap;
}
.paySelect{
  font-size: 0.5rem;
  height: 0.6rem;
}
</style>