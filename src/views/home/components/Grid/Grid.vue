<template>
    <div>
        <van-grid 
        van-grid 
        :column-num="5"
        icon-size='44px'
        :clickable=true
        >
            <van-grid-item v-for="(item,index) in grid_list" :key="index" :icon="item.icon_url" :text="item.name" />
        </van-grid>
    </div>
</template>

<script>
    export default {
        name: "Grid.vue",
        props:{
            grid_list:Array,
        }
    }
</script>

<style scoped lang="scss">

</style>