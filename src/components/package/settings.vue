<template>
    <div class="settings_schedule">
        <div class="bar">
            <div class="back" @click="back"><img :src="backImg"/></div>
            <div class="title">日程设置</div>
        </div>
        <div class="ctx">
            <div class="row">
                <div class="title">通用设置</div>
                <div class="item">
                    <div>是否接收每日微信推送</div>
                    <van-switch v-model="isPush"
                                active-value="1"
                                inactive-value="0"
                                active-color="#3EC271"
                                inactive-color="#DFE5F0"
                                size=".35rem"
                                @change="(val)=>{pushChange('isPush',val)}"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import backImg from '@/assets/images/schedule/back.png'
    import api from "./api";

    export default {
        name: "settingsSchedule",
        props:{
            /** 数据是否本地存储，true：添加的日程将存放在localStorage false：调用接口数据 **/
            local: {
                type: Boolean,
                default: true
            },
            /** 是否推送微信通知 **/
            push: {
                type: String,
                default: '1'
            },
        },
        data() {
            return {
                backImg,

                isPush: '1',//1推送，0不推送
            }
        },
        mounted() {
            if (this.local) {
                this.isPush = api.getGlobalPush() || '1'
            }else{
                this.isPush = this.push
            }
        },
        methods: {
            pushChange(key, value) {
                if (this.local) {
                    api.setGlobalPush(value)
                } else {
                    this.$emit('onSettings', {key, value})
                }
            },
            setProperty(key, value) {
                this[key] = value
            },
            back() {
                this.$emit('update:close', false)
            }
        }
    }
</script>
<style lang="less">
    .settings_popup {
        background: #F7F9FB !important;
    }
</style>
<style scoped lang="less">
    .settings_schedule {
        .bar {
            height: .94rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            z-index: 1;
            width: 100%;
            background: #fff;

            img {
                width: .4rem;
                height: .4rem;
                margin-left: .3rem;
                vertical-align: middle;
            }

            .back {
                flex: 1;
            }

            .title {
                flex: 10;
                text-align: center;
                font-size: .34rem;
                font-weight: 500;
                color: rgba(18, 27, 48, 1);
            }
        }

        .ctx {
            margin-top: .94rem;

            .row {
                background: #fff;
                padding: .3rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #434B65;
                border-top: .02rem solid #EFF1F4;

                .title {
                    margin-bottom: .3rem;
                    font-size: .3rem;
                    font-weight: 500;
                }

                .item {
                    font-size: .28rem;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>