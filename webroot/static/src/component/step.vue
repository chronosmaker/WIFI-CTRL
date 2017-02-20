<template>
<div id="step">
    <div class="jumbotron">
        <div class="container-fluid">
            <h1>{{title}}</h1>
            <div class="row">
                <div class="col-xs-12 col-md-3" v-for="n in node">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">{{n.n}}</h3>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-5">
                                    <p>是否启动</p>
                                </div>
                                <div class="col-xs-7">
                                    <div class="btn-group" data-toggle="buttons">
                                        <input class="btn btn-primary" v-bind:class="{active: n.s == '1'}" v-on:click="n.s = '1'" type="button" value="是">
                                        <input class="btn btn-primary" v-bind:class="{active: n.s == '0'}" v-on:click="n.s = '0'" type="button" value="否">
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-show="n.s == '1'">
                                <div class="col-xs-5">
                                    <p>输入总价</p>
                                </div>
                                <div class="col-xs-7">
                                    <div class="input-group">
                                        <span class="input-group-addon">￥</span>
                                        <input type="number" class="form-control" v-model="n.t">
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-show="n.s == '1'">
                                <div class="col-xs-5">
                                    <p>输入单价</p>
                                </div>
                                <div class="col-xs-7">
                                    <div class="input-group">
                                        <span class="input-group-addon">￥</span>
                                        <input type="number" class="form-control" v-model="n.p">
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-show="n.s == '1'">
                                <div class="col-xs-5">
                                    <p>计算数量</p>
                                </div>
                                <div class="col-xs-7">
                                    <p>{{(n.t/n.p).toFixed(2)+" 升"}}</p>
                                </div>
                            </div>
                            <div class="row" v-show="n.s == '1'">
                                <div class="col-xs-5">
                                    <p>实际数量</p>
                                </div>
                                <div class="col-xs-7">
                                    <p>{{parseInt(n.t/n.p)+" 升"}}</p>
                                </div>
                            </div>
                            <div class="row" v-show="n.s == '1'">
                                <div class="col-xs-5">
                                    <p>实际转数</p>
                                </div>
                                <div class="col-xs-7">
                                    <p>{{parseInt(n.t/n.p)*2+" 转"}}</p>
                                </div>
                            </div>
                            <div class="row" v-show="n.s == '1'">
                                <div class="col-xs-5">
                                    <p>预计耗时</p>
                                </div>
                                <div class="col-xs-7">
                                    <p>{{(parseInt(n.t/n.p)*0.4/15).toFixed(1)+" 分钟"}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-2 col-md-offset-5">
                    <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click="run('1')" v-if="runFlag == '0'">启动</button>
                    <button type="button" class="btn btn-danger btn-lg btn-block" v-on:click="run('0')" v-if="runFlag == '1'">停止</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
export default {
    data() {
        return {
            title: "电机控制中心",
            dataUrl: '/stepData.json',
            runUrl: '/step.lc?run=',
            runFlag : '0',
            node: []
        }
    },
    mounted: function() {
        this.$http.get(this.dataUrl).then(function(response) {
            this.node = response.data.step;
        }, function(response) {
            console.log(response)
        });
    },
    methods: {
        run: function(flag) {
            var data = [],
                url = this.runUrl + flag;
            if (flag == '1') {
                data = this.node.filter(function(n) {
                    if (n.s == '1') {
                        n.r = parseInt(n.t / n.p) * 2;
                    }
                    return n.s == '1';
                });
                if (data.length == 0) {
                    return;
                }
            }
            this.$http.post(url, data).then(function(response) {
                if (response.data.msg == 'ok') {
                    this.runFlag = flag;
                }
                console.log(response)
            }, function(response) {
                console.log(response)
            });
        }
    }
}
</script>

<style media="screen">
.jumbotron {
    margin-bottom: 0
}
</style>
