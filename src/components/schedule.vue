<template>
    <div class="schedule">
        <div class="bar">
            <div class="back" @click="back"><img :src="backImg"/></div>
            <div class="title">日程</div>
            <div class="func">
                <img v-if="search" :src="searchImg" @click="showSearch = true"/>
                <img v-if="settings" :src="settingsImg" @click="showSettings = true"/>
            </div>
        </div>
        <more height="4rem">
            <div class="date_box">
                <div class="current_date">
                    <span @click="showChooseDate=true">{{currentDateStr}}</span>
                    <span class="today" @click="backToday">今天</span>
                </div>
                <swiper ref="mySwiper" :options="swiperOptions" @slideChangeTransitionEnd="swiperEnd">
                    <swiper-slide v-for="(item, index) in swiperList" :key="index">
                        <date-box
                                :date.sync="item"
                                :show-lunar="lunar"
                                :show-point="point"
                                :ref="`dateBox_${index}`"
                                :key="`${index}-${index}`"
                                @select="dateSelected"/>
                    </swiper-slide>
                </swiper>
            </div>
        </more>

        <div class="add" v-if="edit" @click="showEditSchedule=true"><img :src="addImg"/>添加日程</div>

        <schedule-list :data="local ? scheduleList : data" @onEdit="onEdit" @onDel="onDel"
                       @reload="dateSelected"></schedule-list>

        <van-popup v-model="showChooseDate" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker
                    v-model="pickerDate"
                    type="year-month"
                    title="选择年月"
                    @change="dateChange"
                    @confirm="dateConfirm"
                    @cancel="dateCancel"
                    :formatter="dateFormatter"
                    :min-date="minDate"
                    :max-date="maxDate"
            />
        </van-popup>

        <van-popup v-model="showEditSchedule" class="edit_popup" position="right"
                   :style="{ height: '100%',width:'100%' }">
            <edit-schedule v-if="showEditSchedule" :close.sync="showEditSchedule" :local="local" @onEdit="onEdit" @onDel="onDel"
                           @reload="dateSelected"/>
        </van-popup>

        <van-popup v-model="showSearch" class="search_popup" position="right" :style="{ height: '100%',width:'100%' }">
            <search v-if="showSearch" :close.sync="showSearch" :local="local" @onSearch="onSearch" @onEdit="onEdit"/>
        </van-popup>

        <van-popup v-model="showSettings" class="settings_popup" position="right"
                   :style="{ height: '100%',width:'100%' }">
            <settings :close.sync="showSettings" :local="local" @onSettings="onSettings" :push="push"/>
        </van-popup>
    </div>
</template>

<script>
    import more from "./package/more"
    import scheduleList from "./package/scheduleList";
    import dateBox from "./package/dateBox";
    import editSchedule from "./package/editSchedule";
    import search from "./package/search";
    import settings from "./package/settings";

    import backImg from "@/assets/images/schedule/back.png";
    import searchImg from "@/assets/images/schedule/search.png";
    import settingsImg from "@/assets/images/schedule/settings.png";
    import addImg from "@/assets/images/schedule/add.png";

    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    // If you use Swiper 6.0.0 or higher
    import 'swiper/swiper-bundle.css'

    import api from "./package/api";

    export default {
        name: "schedule",
        props: {
            /** 数据是否本地存储，true：添加的日程将存放在localStorage false：调用接口数据 **/
            local: {
                type: Boolean,
                default: true
            },
            /** 是否显示农历 **/
            lunar: {
                type: Boolean,
                default: true
            },
            /** 是否在日历中显示日程标记 **/
            point: {
                type: Boolean,
                default: true
            },
            /** 是否显示搜索按钮 **/
            search: {
                type: Boolean,
                default: true
            },
            /** 是否可编辑 **/
            edit: {
                type: Boolean,
                default: true
            },
            /** 是否显示设置按钮 **/
            settings: {
                type: Boolean,
                default: true
            },
            /** 可选的最小时间 **/
            minDate: {
                type: Date,
                default: () => {
                    return new Date()
                }
            },
            /** 可选的最大时间 **/
            maxDate: {
                type: Date,
                default: () => {
                    return new Date(2100, 11, 1)
                }
            },
            data: {
                type: Array,
                defalut: () => []
            },
            /** 是否推送微信通知 **/
            push: {
                type: String,
                default: '1'
            }
        },
        components: {more, scheduleList, dateBox, editSchedule, search, settings, Swiper, SwiperSlide},
        data() {
            return {
                backImg, searchImg, settingsImg, addImg,

                pickerDate: new Date(),
                showChooseDate: false,
                showEditSchedule: false,
                showSettings: false,
                showSearch: false,
                currentDateStr: '',
                swiperList: [],
                scheduleList: [],
                selectedDate: null,
                swiperOptions: {
                    // observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    // observeParents: true//修改swiper的父元素时，自动初始化swiper
                }
            }
        },
        watch: {
            chooseDate(date) {
                this.getYearAndMonth(date)
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        mounted() {
            this.initSwiperItem()
        },
        methods: {
            initSwiperItem(date) {
                let now = date || new Date()
                let prev = new Date(now.getFullYear(), now.getMonth() - 1)
                let next = new Date(now.getFullYear(), now.getMonth() + 1)
                this.swiperList = [prev, now, next]

                this.scheduleList = []

                this.swiper.slideTo(1, 1000, false)

                this.getYearAndMonth(now)

                this.getDateRangeOfCurrent()
            },
            /**
             * @desc 轮播项滑动结束执行
             * @param {Object} swiper 当前轮播项
             * @date 2020-08-04 17:17:11
             * @author Dulongfei
             *
             */
            swiperEnd(swiper) {
                console.log(swiper)

                let {activeIndex, swipeDirection} = swiper

                let date = this.swiperList[activeIndex]
                let year = date.getFullYear()
                let month = date.getMonth()

                this.getYearAndMonth(date)

                if (activeIndex == this.swiperList.length - 1) {
                    this.swiperList.push(new Date(year, month + 1))
                } else if (activeIndex == 0) {
                    this.swiperList.unshift(new Date(year, month - 1))
                    this.swiper.slideTo(1, 0, false)
                }

                this.getDateRangeOfCurrent()
            },
            /**
             * @desc 获取当前页面显示的日期最小日期和最大日期，可以用在获取这个范围内的所有日程数据的查询条件
             *                              如果需要在有日程的日期下边标记，
             *                              则可以通过修改日期区间数据中的hasSchedule属性为true
             * @date 2020-08-05 18:15:11
             * @author Dulongfei
             *
             */
            getDateRangeOfCurrent() {
                this.$nextTick(() => {
                    let dayList = this.$refs[`dateBox_${this.swiper.activeIndex}`][0].dayList

                    if (this.local) {
                        dayList.forEach(item => {
                            let list = api.findByDateRange(item.fullDate)
                            item.hasSchedule = list.length > 0
                        })
                    } else {
                        let start = dayList[0]
                        let end = dayList[dayList.length - 1]

                        this.$emit('dateChange', start.fullDate, end.fullDate, dayList)
                    }
                })
            },
            /**
             * @desc 获取当前日期标题
             * @param {Date} date 日期
             * @date 2020-08-04 17:16:33
             * @author Dulongfei
             *
             */
            getYearAndMonth(date) {
                let year = date.getFullYear()
                let month = date.getMonth()
                this.currentDateStr = `${year}年${('0' + (month + 1)).slice(-2)}月`
            },
            /**
             * @desc 执行搜索
             * @param {String} val 输入的搜索内容
             * @param {Function} resolve 搜索查询后，调用改函数把结果传入进行渲染搜索列表
             * @date 2020-08-03 17:10:41
             * @author Dulongfei
             *
             */
            onSearch(val, resolve) {
                !local && this.$emit('onSearch', val, resolve)
            },
            /**
             * @desc 执行编辑
             * @param {Object} form 输入的表单
             * @param {Function} resolve 保存后，调用改函数把执行成功与否结果传入，true关闭表单页面
             * @date 2020-08-03 17:12:33
             * @author Dulongfei
             *
             */
            onEdit(form, resolve) {
                let refresh = (isSuccess) => {
                    resolve(isSuccess)
                    isSuccess && this.dateSelected()
                }
                !local && this.$emit('onEdit', form, refresh)
            },
            /**
             * @desc 执行删除
             * @param {Object} info 要删除的日程对象
             * @param {Function} resolve 删除后，调用改函数把执行成功与否结果传入，true关闭表单页面
             * @date 2020-08-03 17:12:33
             * @author Dulongfei
             *
             */
            onDel(info, resolve) {
                let refresh = (isSuccess) => {
                    resolve(isSuccess)
                    isSuccess && this.dateSelected()
                }
                !local && this.$emit('onDel', info, refresh)
            },
            /**
             * @desc 执行设置时回调
             * @param {Object} {key, value} 当前设置项的键值
             * @date 2020-08-03 16:30:05
             * @author Dulongfei
             *
             */
            onSettings(item) {
                !local && this.$emit('onSettings', item)
            },
            /**
             * @desc 选中日期回调函数
             * @param {Object}  info 选中的日期对象(包含农历子对象)
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            dateSelected(info) {
                if(!info){
                    info = this.selectedDate
                }else{
                    this.selectedDate = info
                }

                if (this.local) {
                    let list = api.findByDateRange(info.fullDate)
                    this.scheduleList = list
                } else {
                    this.$emit('onSelect', info)
                }
            },
            /**
             * @desc 选择日期change事件
             * @param {Object}  picker Picker 实例对象
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            dateChange(picker) {

            },
            /**
             * @desc 选择日期确认事件
             * @param {String}  value 当前选中的时间
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            dateConfirm(value) {
                // this.$refs.dateBox.initDate(value)

                this.initSwiperItem(value)
                this.dateCancel()
            },
            /**
             * @desc 选择日期取消事件
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            dateCancel() {
                this.showChooseDate = false
            },
            /**
             * @desc 选择日期格式化
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            dateFormatter(type, val) {
                if (type === 'year') {
                    return `${val}年`;
                } else if (type === 'month') {
                    return `${val}月`;
                }
                return val;
            },
            /**
             * @desc 返回当前日期
             * @author Dulongfei
             *
             */
            backToday() {
                this.initSwiperItem()
            },
            /**
             * @desc 返回上一页
             * @author Dulongfei
             *
             */
            back() {
                this.$emit('back')
            }
        }
    };
</script>

<style lang="less">
    html, body {
        /*font-size: 62.5%;*/
        font-size: 50px;
        padding: 0;
        margin: 0;
    }

    .schedule {
        .show-more {
            background: #fff;
        }
    }
</style>
<style scoped lang="less">
    .schedule {
        font-size: 14px;
        background: #F7F9FB;
        height: 100vh;
        font-family: PingFangSC-Regular, PingFang SC;

        .bar {
            height: .94rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: url("../assets/images/schedule/bg.png") no-repeat;
            background-size: 100% 100%;
            position: fixed;
            top: 0;
            z-index: 1;
            width: 100%;

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
                flex: 4;
                text-align: center;
                font-size: .34rem;
                font-weight: 500;
                color: rgba(18, 27, 48, 1);
                padding-left: .8rem;
            }

            .func {
                flex: 2;
                text-align: center;
            }
        }

        .date_box {
            margin-top: .94rem;

            .current_date {
                padding: .3rem 0;
                text-align: center;
                font-size: .34rem;
                font-weight: 500;
                color: rgba(67, 75, 101, 1);
                background: #fff;
                position: relative;

                .today {
                    position: absolute;
                    top: .35rem;
                    right: .3rem;
                    color: #40C273;
                    font-size: .28rem;
                    border: .01rem solid #40c273;
                    padding: 0 .1rem;
                    border-radius: .1rem;
                    background: rgba(64, 194, 115, .15);
                }
            }
        }

        .add {
            background: #fff;
            height: .94rem;
            line-height: .94rem;
            border-top: .01rem solid #EFF1F4;
            color: #40C273;
            font-size: .28rem;
            margin-bottom: .2rem;

            img {
                width: .34rem;
                height: .34rem;
                vertical-align: sub;
                margin: 0 .2rem 0 .3rem;
            }
        }
    }
</style>
