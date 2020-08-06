# Vue 移动端日程增删改查

## Install
```
npm i -S vue-mobile-schedule
```

### Import
```
import schedule from 'vue-mobile-schedule'
Vue.use(schedule)
```

### Use
```
<template>
    <div id="app">
        <!-- 本地模式 local=true (默认) -->
        <!-- 本地模式下不会执行 onSearch、onSettings、onEdit、onDel、dateChange -->
        <!-- 本地模式下无效参数 push、data、search、edit、settings -->
        
        <schedule
            :minDate="minDate"
            :maxDate="maxDate"
            @onSelect="onSelect"
            @back="goBack"
            local
            lunar point
        />

        <!-- 非本地模式  local=false -->
<!--        <schedule-->
<!--                :minDate="minDate"-->
<!--                :maxDate="maxDate"-->
<!--                @onSelect="onSelect"-->
<!--                @onSearch="onSearch"-->
<!--                @onSettings="onSettings"-->
<!--                @onEdit="onEdit"-->
<!--                @onDel="onDel"-->
<!--                @dateChange="dateChange"-->
<!--                @back="goBack"-->
<!--                push="1"-->
<!--                :data="scheduleList"-->
<!--                :local="false"-->
<!--                lunar point search edit settings-->
<!--        />-->
    </div>
</template>

<script>

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
                    // {id:1,title: '用户模块任务列表数据提交1', startTime: '2020-08-05 10:00', endTime: '2020-08-05 12:00', type: 1, tag: '智慧机房PPT绘制1',noticeTime:'0',isPush:'1'},
                    // {id:2,title: '用户模块任务列表数据提交2', startTime: '2020-08-05 13:00', endTime: '2020-08-05 14:00', type: 2, tag: '智慧机房PPT绘制2',noticeTime:'30',isPush:'0'},
                    // {id:3,title: '用户模块任务列表数据提交3', startTime: '2020-08-05 15:00', endTime: '2020-08-05 16:00', type: 3, tag: '智慧机房PPT绘制3',noticeTime:'120',isPush:'1'},
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
             *
             */
            onSearch(inputVal, resolve){
                // resolve([
                //     {id:4,title:'用户模块任务列表数据提交4',startTime:'2020-05-04 10:00',endTime:'2020-08-05 12:00',type:1,tag:'智慧机房PPT绘制4',noticeTime:'60',isPush:'1'},
                //     {id:5,title:'用户模块任务列表数据提交5',startTime:'2020-05-04 13:00',endTime:'2020-08-05 14:00',type:2,tag:'智慧机房PPT绘制5',noticeTime:'120',isPush:'0'},
                //     {id:6,title:'用户模块任务列表数据提交6',startTime:'2020-05-04 15:00',endTime:'2020-08-05 16:00',type:3,tag:'智慧机房PPT绘制6',noticeTime:'0',isPush:'1'}
                // ])
            },
            /**
             * @desc 执行保存日程时回调，返回输入的参数
             * @param {Object} form 输入的表单数据对象
             * @param {Function} resolve 保存数据后，调用此方法，参数传递true，关闭编辑页面，否则无操作
             * @date 2020-08-03 16:28:41
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
             *
             */
            onSettings({key, value}){
                console.log(key,value)
            },
            /**
             * @desc 选中日期时回调
             * @param {Object} info 当前选中的日期对象
             * @date 2020-08-03 16:30:48
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
             *
             */
            onDel(info,resolve){
                console.log(info,'onDel')
                resolve(true)
            },
            /**
             * @desc 获取当前页面显示的日期最小日期和最大日期，可以用在获取这个范围内的所有日程数据的查询条件
             *          如果需要在有日程的日期下边标记，则可以通过修改allDate数据中的hasSchedule属性为true
             *
             * @param {String} startDate 当前可见日期范围的最小日期
             * @param {String} endDate 当前可见日期范围的最大日期
             * @param {allDate} allDate 当前可见日期范围的所有日期
             *
             * @date 2020-08-05 18:15:11
             *
             */
            dateChange(startDate,endDate,allDate){
                console.log(startDate,endDate,allDate)
            },
            /**
             * @desc 顶部的返回按钮回调
             * @date 2020-08-06 16:16:48
             *
             */
            goBack(){
                //this.$router.go(-1)
            }
        }
    };
</script>

<style lang="less">

</style>

```

### Review
![Review][1]
![Review][2]

[1]:http://www.lonhey.com/1.jpg
[2]:http://www.lonhey.com/2.jpg

