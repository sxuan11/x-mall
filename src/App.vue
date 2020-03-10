<template>
  <div id="app">
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <TabBar/>
  </div>
</template>

<script>
import TabBar from './views/dashboard/DashBoard'

export default {
  name: 'app',
  components: {
    TabBar,
  }
}
</script>

<style>
@import './assets/css/common.sass';
</style>
