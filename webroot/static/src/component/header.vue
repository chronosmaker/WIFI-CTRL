<template>
<div id="header">
    <nav class="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <span class="navbar-brand">{{headerTitle}}</span>
            </div>
        </div>
    </nav>
</div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState([
            'headerTitle'
        ])
    }
}
</script>

<style media="screen">
#header {
    height: 20px
}
</style>
