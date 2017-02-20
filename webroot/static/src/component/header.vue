<template>
<div id="header">
    <nav class="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <span class="navbar-brand">{{title}}</span>
            </div>
        </div>
    </nav>
</div>
</template>

<script type="text/javascript">
export default {
    data() {
        return {
            title: "胡子集团"
        }
    }
}
</script>

<style media="screen">
    #header {
        height: 20px
    }
</style>
