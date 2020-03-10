<template>
    <div>
        <swiper id='swiper' :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in swipe_list" :key="index">
                <img :src="item.icon_url" alt="" class="swipe_img">
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
         data() {
            return {
                swiperOption: {
                // some swiper options/callbacks
                // 所有的参数同 swiper 官方 api 参数
                    notNextTick:true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    // effect : 'cube',
                    loop:true,
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                        },
                    },
                    speed:2500,
                }
            },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        props:{
            swipe_list:Array,
        },
        mounted() {
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            console.log('this is current swiper instance object', this.swiper)
            this.swiper.slideTo(1, 1000, false)
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style lang="scss" scoped>
#swiper{
    width: 100%;
    height: 3.5rem;
    background-color: #eee;
}
.swipe_img{
    width: 100%;
    height: 3.5rem;
}
</style>