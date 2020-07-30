<template>
    <div class="schedule">
        <div>日程安排</div>
        <input type="text" v-model="date" @blur="getResult">
        <div>{{result}}</div>
    </div>
</template>

<script>
    import calendar from "../../public/js/calendar"

    export default {
        name: "schedule",
        props: ['option'],
        data() {
            return {
                date:'',
                result: ''
            }
        },
        mounted() {

        },
        methods: {
            covertDate(date) {
                if (date instanceof Date) {
                    return date
                } else if (['number','string'].includes(typeof date)) {
                    return new Date(date)
                }
            },
            getResult(){
                let date = this.covertDate(this.date)

                let lunar = calendar.solar2lunar(date.getFullYear(),date.getMonth() + 1,date.getDate())
                let {gzYear,IMonthCn,IDayCn} = lunar

                this.result = `${this.dateFormat(date)} 对应的农历日期为：${gzYear}年${IMonthCn}${IDayCn}`
            },
            dateFormat(date, format) {
                if (date) {
                    date = date instanceof Date ? date : new Date(date);
                    let o = {
                        "M+": date.getMonth() + 1,                 //月份
                        "d+": date.getDate(),                    //日
                        "h+": date.getHours(),                   //小时
                        "m+": date.getMinutes(),                 //分
                        "s+": date.getSeconds(),                 //秒
                        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                        "S": date.getMilliseconds()             //毫秒
                    };

                    format = (format || 'yyyy-MM-dd').replace(/y+/i, date.getFullYear());
                    for (let i in o) format = format.replace(new RegExp('(' + i + ')'), ('0' + o[i]).slice(-2));
                    return format;
                }
                return '';
            }
        }
    };
</script>

<style scoped lang="less">
    .schedule {
        font-size: 14px;
    }
</style>
