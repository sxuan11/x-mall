<template>
    <div class="wrapper emptyWrapper">
        <div
            v-for="(categoriesDetail, index) in categoriesDetailData"
            :key="categoriesDetail.id"
        >
            <div class="categoryTitle">{{categoriesDetail.name}}</div>
            <ProductItem :products="categoriesDetail.products" />
        </div>
    </div>
</template>

<script>
    import ProductItem from './ProductItem'
    export default {
        name: "ContentView",
        props: {
            categoriesDetailData: Array
        },
        components: {
            ProductItem
        }
    }
</script>

<style scoped>
    .wrapper {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
    }

    .wrapper {
        position: absolute;
        left: 1.3125rem;
        right: 0;
        bottom: 0;
        top: 0rem;
        background: #FFF;
    }

    .categoryTitle {
        padding: 0 0.1125rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.3rem;
        background: #F8F8F8;
        color: #666666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>