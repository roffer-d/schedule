const LOCAL_KEY = 'SCHEDULE_LIST'
const PUSH_KEY = 'IS_PUSH'

export default {
    setGlobalPush(isPush){
        localStorage.setItem(PUSH_KEY,isPush)
    },
    getGlobalPush(){
        return localStorage.getItem(PUSH_KEY)
    },
    findAll(){
        let data = localStorage.getItem(LOCAL_KEY)
        let list = []
        data && (list = JSON.parse(data))

        return list
    },
    setAll(list){
        localStorage.setItem(LOCAL_KEY,JSON.stringify(list))
    },
    findById(id){
        let allList = this.findAll()
        let tempList = allList.filter(item=>item.id===id)

        return tempList.length ? tempList[0] : {}
    },
    findByDateRange(dateStr){
        let allList = this.findAll()

        return allList.filter(item=>{
            return  item.startTime.indexOf(dateStr) !== -1 || item.endTime.indexOf(dateStr) !== -1
        })
    },
    query(title){
        let allList = this.findAll()
        return allList.filter(item=>item.title.indexOf(title) !== -1)
    },
    queryByKV(key,value){
        let allList = this.findAll()
        return allList.filter(item=>item[key]===value)
    },
    addSchedule(addData){
        let allList = this.findAll()
        allList.push(addData)

        this.setAll(allList)
    },
    editSchedule(editData){
        let allList = this.findAll()
        allList.forEach((item,index)=>{
            if(item.id === editData.id){
                allList.splice(index,1,editData)
            }
        })

        this.setAll(allList)
    },
    delSchedule(id){
        let allList = this.findAll()
        allList.forEach((item,index)=>{
            if(item.id === id){
                allList.splice(index,1)
            }
        })

        this.setAll(allList)
    },
    clear(){
        localStorage.removeItem(LOCAL_KEY)
    },
    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}