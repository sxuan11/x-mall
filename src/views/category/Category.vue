<template>
    <div id="category">
        <!--头部-->
        <Header/>
        <!--内容-->
        <div class="listWrapper" v-if="!showLoading">
            <!--左边-->
            <div class="leftWrapper">
                <ul class="wrapper">
                    <li
                        class="categoryItem"
                        v-for="(cate, index) in categoriesData"
                        :class="{selected: currentIndex === index}"
                        @click="clickLeftLi(index)"
                        :key="cate.id"
                        ref="menuList"
                    >
                        <span class="textWrapper">{{cate.name}}</span>
                    </li>
                </ul>
            </div>
            <!--右边-->
            <ContentView :categoriesDetailData="categoriesDetailData"/>
        </div>
        <van-loading
                v-else
                type="spinner"
                style="position: absolute;left:50%;top: 40%;transform: translate(-50%)"
        >
            加载中…
        </van-loading>
    </div>
</template>

<script>
    // 引入组件
    import Header from './components/Header'
    import ContentView from './components/ContentView'
    // 引入滚动组件
    import BScroll from 'better-scroll'
    // 引入接口
    import { getCategory , getCategoriesDetail , addToCart } from './../../server/api/index'

    // 引入通知插件
    import PubSub from 'pubsub-js';
    import { Toast } from 'vant';

	// 引入vuex
	import { mapState , mapMutations } from 'vuex'

    export default {
        name: "Category",
        data() {
            return {
                // 是否显示加载图标
                showLoading: true,
                // 左边列表数据
                categoriesData: [],
                // 右边列表数据
                categoriesDetailData: [],
                // 左边item选中与否
                currentIndex: 0
            }
        },
        created() {
            this.initData();
        },
        computed:{
            ...mapState(['userInfo'])
        },
        mounted(){
			PubSub.subscribe("cateAddToCart",(msg,goods)=>{
                if (msg === "cateAddToCart") {
                    console.log(this.userInfo)
                    if( this.userInfo.token){  
                        this.addRealCart(goods)   
                    }else {
                        Toast('尚未登录')
                        this.$router.push('/login')
                    }
                }
                })
        },
        components: {
            Header,
            ContentView
        },
        methods: {
            ...mapMutations(['ADD_GOODS']),
            async addRealCart(goods){
                let result = await addToCart(this.userInfo.token,goods.id,goods.name,goods.price,goods.small_image)
                if(result.success_code === 200){
                    this.ADD_GOODS({
						itemId:goods.id,
						goodsName:goods.name,
						smallImage:goods.small_image,
						salePrice:goods.price,
					})
					//发送提示给用户
					Toast({
						message:"添加购物车成功",
						type:"success",
						duration:1000
					});
                }else{
                    Toast.fail('其他错误，请尝试重新登录')
                }
            },
            // 1. 初始化操作(数据和界面)
            async initData() {
                // 1. 获取左边的数据
                let leftRes = await getCategory();
                if (leftRes.success) {
                    this.categoriesData = leftRes.data.cate;
                }

                // 2. 获取右边的数据
                let rightRes = await getCategoriesDetail('/lk001');
                if (rightRes.success) {
                    this.categoriesDetailData = rightRes.data.cate;
                }
                // console.log(this.categoriesData, this.categoriesDetailData);

                // 3. 隐藏loading框
                this.showLoading = false;

                // 4. 初始化滚动框架
                this.$nextTick(() => {
                    this.leftScroll = new BScroll('.leftWrapper', {
                        probeType: 3,
                        click: true,
                        scrollY: true,
                        tap: true,
                        mouseWheel: true
                    })
                });
            },

            // 2. 处理左边的点击
           async clickLeftLi(index){
                // 2.1 改变索引
                this.currentIndex = index;

                // 2.2 滚动到对应的位置
                let menuLists = this.$refs.menuList;
                let el = menuLists[index];
                // console.log(el);

                // 2.3 滚动到对应元素上
                this.leftScroll.scrollToElement(el, 300);

                // 2.4 获取右边的数据
                let rightRes = await getCategoriesDetail(`/lk00${index + 1}`);
                if (rightRes.success) {
                    this.categoriesDetailData = rightRes.data.cate;
                }
            }
        },
        beforeDestroy(){
            PubSub.unsubscribe('cateAddToCart')
        }
    }
</script>

<style scoped>
    .listWrapper {
        position: fixed;
        top: 1.2rem;
        bottom: 1.2rem;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
    }

    .leftWrapper {
        background-color: #F4F4F4;
        width: 0.7rem;
        flex: 0 0 1.3rem;
    }

    .categoryItem {
        /* padding: 0.07rem 0; */
        border-bottom: solid 1px #E8E9E8;
        position: relative;
    }

    .categoryItem .textWrapper {
        line-height: 2rem;
        border-left: solid 0.1rem transparent;
        padding: 0.1rem 0.1rem;
        font-size: 0.1rem;
        color: #666666;
    }

    .categoryItem.selected {
        background: #FFF;
    }

    .categoryItem.selected .textWrapper {
        border-left-color: #38f;
        font-weight: bold;
        font-size: 0.2rem;
        color: #333333;
    }

    @media (min-width: 960px) {
        .wrapper {
            border-right: 1px solid #E8E9E8;
        }

        .wrapper .categoryItem {
            background: #fff;
        }
    }
</style>