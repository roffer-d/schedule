<template>
    <div id="app">
        <schedule :option="option"></schedule>
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
                option: {
                    minDate: 1596067200000
                }
            }
        }
    };
</script>

<style lang="less">

</style>
