import schedule from "./schedule";

export default {
    install(Vue){
        Vue.component(schedule.name,schedule)
    }
}