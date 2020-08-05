<template>
    <div id="app">
        <schedule
            :minDate="minDate"
            :maxDate="maxDate"
            @onSelect="onSelect"
            @onSearch="onSearch"
            @onSettings="onSettings"
            @onEdit="onEdit"
            @onDel="onDel"
            :data="scheduleList"
            local lunar point search edit settings
        />
    </div>
</template>

<script>
    import schedule from "./components/schedule.vue";

    export default {
        name: "App",
        components: {
            schedule
        },
        data() {
            return {
                minDate: new Date(),
                maxDate: new Date(2100, 11, 1),
                scheduleList: [
                    {title: '用户模块任务列表数据提交1', startTime: '2020-08-05 10:00', endTime: '2020-08-05 12:00', type: 1, tag: '智慧机房PPT绘制1',noticeType:3,isPush:true},
                    {title: '用户模块任务列表数据提交2', startTime: '2020-08-05 13:00', endTime: '2020-08-05 14:00', type: 2, tag: '智慧机房PPT绘制2',noticeType:1,isPush:false},
                    {title: '用户模块任务列表数据提交3', startTime: '2020-08-05 15:00', endTime: '2020-08-05 16:00', type: 3, tag: '智慧机房PPT绘制3',noticeType:2,isPush:false},
                ]
            }
        },
        mounted() {

        },
        methods:{
            /**
             * @desc 执行搜索时回调
             * @param {String} inputVal 输入的内容
             * @param {Function} resolve 开发人员需自行返回搜索数据，然后再调用resolve(data),将数据回传给组件进行渲染搜索结果
             * @date 2020-08-03 16:27:10
             * @author Dulongfei
             *
             */
            onSearch(inputVal, resolve){
                resolve([
                    {title:'用户模块任务列表数据提交4',startTime:'2020-05-04 10:00',endTime:'2020-08-05 12:00',type:1,tag:'智慧机房PPT绘制4',noticeType:3,isPush:true},
                    {title:'用户模块任务列表数据提交5',startTime:'2020-05-04 13:00',endTime:'2020-08-05 14:00',type:2,tag:'智慧机房PPT绘制5',noticeType:1,isPush:false},
                    {title:'用户模块任务列表数据提交6',startTime:'2020-05-04 15:00',endTime:'2020-08-05 16:00',type:3,tag:'智慧机房PPT绘制6',noticeType:2,isPush:false}
                ])
            },
            /**
             * @desc 执行保存日程时回调，返回输入的参数
             * @param {Object} form 输入的表单数据对象
             * @param {Function} resolve 保存数据后，调用此方法，参数传递true，关闭编辑页面，否则无操作
             * @date 2020-08-03 16:28:41
             * @author Dulongfei
             *
             */
            onEdit(form,resolve){
                console.log(form)
                resolve(true)
            },
            /**
             * @desc 执行设置时回调
             * @param {Object} {key, value} 当前设置项的键值
             * @date 2020-08-03 16:30:05
             * @author Dulongfei
             *
             */
            onSettings({key, value}){
                console.log(key,value)
            },
            /**
             * @desc 选中日期时回调
             * @param {Object} info 当前选中的日期对象
             * @date 2020-08-03 16:30:48
             * @author Dulongfei
             *
             */
            onSelect(info){
                console.log(info)
            },
            /**
             * @desc 删除日程
             * @param {Object} info 要删除的日期对象
             * @param {Function} resolve 删除数据后，调用此方法，参数传递true，关闭编辑页面，否则无操作
             * @date 2020-08-03 16:30:48
             * @author Dulongfei
             *
             */
            onDel(info,resolve){

                resolve(true)
            }
        }
    };
</script>

<style lang="less">

</style>
