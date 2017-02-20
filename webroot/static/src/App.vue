<template>
<div id="app">
    <v-header></v-header>
    <router-view></router-view>
</div>
</template>

<script>
import header from './component/header.vue'

export default {
    name: 'app',
    components: {
        'v-header': header
    }
}
</script>

<style media="screen">
* {
    font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu
}
</style>
