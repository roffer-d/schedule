<template>
    <div class="selector">
        <div class="weeks">
            <div v-for="(item,index) in ['日', '一', '二', '三', '四', '五', '六']" :key="index">{{item}}</div>
        </div>
        <div class="day_box">
            <div class="item"
                 :class="{
                                current_month:item.isCurrentMonth,
                                selected_day:item.selected,
                                current_day:item.isCurrentDay
                             }"
                 @click="selectDate(item,index)"
                 v-for="(item,index) in dayList"
                 :key="index">

                <div class="solar">{{item.day}}</div>
                <div v-if="showLunar" class="lunar">{{item.lunar}}</div>
                <div v-if="showPoint && item.hasSchedule" class="have_schedule"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import calendar from "../../../public/js/calendar";

    export default {
        name: "dateBox",
        props: {
            /** 数据是否本地存储，true：添加的日程将存放在localStorage false：调用接口数据 **/
            local: {
                type: Boolean,
                default: true
            },
            date: {
                type: Date,
                default: new Date()
            },
            showLunar: {
                type: Boolean,
                default: false
            },
            showPoint: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                dayList: [],
                selectedDate: null,
                today: new Date(),
            }
        },
        watch: {
            date() {
                this.initDate()
            }
        },
        mounted() {
            this.initDate()
        },
        methods: {
            /**
             * @desc 初始化日期
             * @date 2020-07-31 15:31:55
             * @author Dulongfei
             *
             */
            initDate(date) {
                const d = date || this.date || new Date()
                let year = d.getFullYear()
                let month = d.getMonth() + 1

                this.dayList = []

                this.getPrevDays(year, month)

                this.getDaysOfMonth(year, month)

                this.getNextDays(year, month)
            },
            /**
             * @desc 获取指定年月日是否是当前日期
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @param {Number} Number 天
             * @date 2020-07-31 16:09:11
             * @author Dulongfei
             *
             */
            isCurrentDate(year, month, day) {
                let currentYear = this.today.getFullYear()
                let currentMonth = this.today.getMonth() + 1
                let currentDay = this.today.getDate()

                return currentYear === year && currentMonth === month && currentDay === day
            },
            /**
             * @desc 获取指定年月日是否是跟传入的日期匹配选中
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @param {Number} Number 天
             * @date 2020-07-31 16:09:11
             * @author Dulongfei
             *
             */
            isSelectedDate(year, month, day) {
                let selectedYear = this.date.getFullYear()
                let selectedMonth = this.date.getMonth() + 1
                let selectedDay = this.date.getDate()

                return selectedYear === year && selectedMonth === month && selectedDay === day
            },
            /**
             * @desc 填充前面的空余日期，例如传入的日期是从周三开始，那么前边会空出3个格子，此时应填充为上个月的最后三天
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @date 2020-07-31 16:15:14
             * @author Dulongfei
             *
             */
            getPrevDays(year, month) {
                let week = this.getWeekOfFirstDay(year, month)

                if (week > 0) {
                    let cDate = new Date(year, month, 0)

                    cDate.setMonth(cDate.getMonth(), 0)
                    let end = cDate.getDate()
                    let start = end - week + 1


                    for (let i = start; i <= end; i++) {
                        let lunar = calendar.solar2lunar(cDate.getFullYear(), cDate.getMonth() + 1, i)
                        let {cYear, cMonth, cDay, IMonthCn, IDayCn, nWeek} = lunar

                        let isCurrent = this.isCurrentDate(cYear, cMonth, cDay)
                        let isSelected = this.isSelectedDate(cYear, cMonth, cDay)

                        let day = {
                            lunarInfo: lunar,
                            date: i,
                            day: i == 1 ? `${cMonth}月` : i,
                            month: cMonth,
                            year: cYear,
                            week: nWeek,
                            fullDate: `${cYear}-${('0' + cMonth).slice(-2)}-${('0' + cDay).slice(-2)}`,
                            lunar: IDayCn == '初一' ? IMonthCn : IDayCn,//农历
                            hasSchedule: false,//是否有日程
                            isCurrentMonth: false,//日期是否包含在当前月份中
                            isCurrentDay: isCurrent,//当前日期
                            selected: isSelected//选中的日期
                        }

                        this.dayList.push(day)

                        isSelected && (this.selectedDate = day)//默认选中当前日期
                    }
                }
            },
            /**
             * @desc 获取指定月份的每一天
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @date 2020-07-31 16:09:11
             * @author Dulongfei
             *
             */
            getDaysOfMonth(year, month) {
                let countOfMonth = this.getDayCountOfMonth(year, month)

                for (let i = 1; i <= countOfMonth; i++) {
                    let lunar = calendar.solar2lunar(year, month, i)
                    let {cYear, cMonth, cDay, IMonthCn, IDayCn, nWeek} = lunar

                    let isCurrent = this.isCurrentDate(cYear, cMonth, cDay)
                    let isSelected = this.isSelectedDate(cYear, cMonth, cDay)

                    let day = {
                        lunarInfo: lunar,
                        day: i == 1 ? `${cMonth}月` : i,
                        date: i,
                        month: cMonth,
                        year: cYear,
                        week: nWeek,
                        lunar: IDayCn == '初一' ? IMonthCn : IDayCn,//农历
                        fullDate: `${cYear}-${('0' + cMonth).slice(-2)}-${('0' + cDay).slice(-2)}`,
                        hasSchedule: i % 5 == 0,//是否有日程
                        isCurrentMonth: true,//日期是否包含在当前月份中
                        isCurrentDay: isCurrent,//当前日期
                        selected: isSelected//选中的日期
                    }

                    this.dayList.push(day)

                    isSelected && (this.selectedDate = day)//默认选中当前日期
                }
            },
            /**
             * @desc 填充后面的空余格子，填充为下个月的日期
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @date 2020-07-31 16:15:14
             * @author Dulongfei
             *
             */
            getNextDays(year, month) {
                let week = this.getWeekOfFirstDay(year, month)
                let countOfMonth = this.getDayCountOfMonth(year, month)

                let start = 1
                let end = 35
                if (week + countOfMonth > end) {
                    end = 42 - week - countOfMonth
                } else {
                    end = end - week - countOfMonth
                }

                let cDate = new Date(year, month + 1, 0)

                for (let i = start; i <= end; i++) {
                    let lunar = calendar.solar2lunar(cDate.getFullYear(), cDate.getMonth() + 1, i)
                    let {cYear, cMonth, cDay, IMonthCn, IDayCn, nWeek} = lunar

                    let isCurrent = this.isCurrentDate(cYear, cMonth, cDay)
                    let isSelected = this.isSelectedDate(cYear, cMonth, cDay)

                    let day = {
                        lunarInfo: lunar,
                        day: i == 1 ? `${cMonth}月` : i,
                        date: i,
                        month: cMonth,
                        year: cYear,
                        week: nWeek,
                        lunar: IDayCn == '初一' ? IMonthCn : IDayCn,//农历
                        fullDate: `${cYear}-${('0' + cMonth).slice(-2)}-${('0' + cDay).slice(-2)}`,
                        hasSchedule: false,//是否有日程
                        isCurrentMonth: false,//日期是否包含在当前月份中
                        isCurrentDay: isCurrent,//当前日期
                        selected: isSelected//选中的日期
                    }

                    this.dayList.push(day)

                    isSelected && (this.selectedDate = day)//默认选中当前日期
                }
            },
            /**
             * @desc 获取日期中的第一天是周几
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @date 2020-07-31 15:45:29
             * @author Dulongfei
             *
             */
            getWeekOfFirstDay(year, month) {
                let date = new Date(year, month - 1, 1)
                return date.getDay()
            },
            /**
             * @desc 获取指定月份的总天数
             * @param {Number} year 年份
             * @param {Number} month 月份
             * @date 2020-07-31 15:53:40
             * @author Dulongfei
             *
             */
            getDayCountOfMonth(year, month) {
                let date = new Date(year, month, 0)
                return date.getDate()
            },
            /**
             * @desc 手动操作选中日期
             * @param {Object} item 选中的日期对象
             * @date 2020-07-31 15:53:40
             * @author Dulongfei
             *
             */
            selectDate(item, index) {
                this.dayList.forEach((day, i) => {
                    day.selected = false
                })

                item.selected = true;

                this.selectedDate = item

                this.$emit('select', item)
            },
            /**
             * @desc 设置选中日期
             * @param {Number} year 要选中的年
             * @param {Number} month 要选中的月
             * @param {Number} day 要选中的日
             * @date 2020-07-31 15:53:40
             * @author Dulongfei
             *
             */
            setSelected(year, month, day) {
                let date = new Date(year, month - 1, day)
                this.initDate(date)
            },
            /**
             * @desc 获取选中日期
             * @date 2020-07-31 15:53:40
             * @author Dulongfei
             *
             */
            getSelected() {
                return this.selectedDate
            }
        }
    }
</script>

<style scoped lang="less">
    .selector {
        .weeks {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: .94rem;
            background: #F7F9FB;

            > div {
                /*flex: 1;*/
                width: calc(100% / 7);
                text-align: center;
                font-size: .28rem;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.85);
                line-height: 44px;
                text-shadow: 0px 24px 96px rgba(0, 0, 0, 0.03);
            }
        }

        .day_box {
            background: #fff;
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .item {
                width: calc(100% / 7);
                text-align: center;
                margin: .15rem 0;
                position: relative;

                > div {
                    width: .7rem;
                    height: .48rem;
                    line-height: .48rem;
                    margin: auto;
                }

                .solar {
                    color: #B2BFCD;
                    font-size: .3rem;
                }

                .lunar {
                    color: #B2BFCD;
                    font-size: .18rem;
                }

                &.current_month { //包含在当前月份中的日期
                    .solar {
                        color: #434B65;
                    }

                    .lunar {
                        color: #434B65;
                    }
                }

                &.selected_day { //选中的日期
                    .solar {
                        color: #40C273;
                        border: .01rem solid #40C273;
                        border-radius: .04rem;
                    }
                }

                &.current_day { //当前日期
                    .solar {
                        color: #fff;
                        background: #40C273;
                        border-radius: .04rem;
                    }

                    .lunar {
                        color: #434B65;
                    }
                }

                .have_schedule {
                    width: .1rem;
                    height: .1rem;
                    background: #FF8523;
                    border-radius: 50%;
                    position: absolute;
                    left: calc(50% - 0.05rem);
                }
            }
        }
    }
</style>