import schedule from "./components/schedule";

export default {
    install(Vue){
        Vue.component(schedule.name,schedule)
    }
}