<template>
    <div class="systemMonitor">
        <aside class="systemMonitor-right">
                <router-view></router-view>
        </aside>
    </div>
</template>
<script>
export default {
    name:"systemMonitor"
}
</script>
<style lang="scss">
.systemMonitor{
    width: 100%;
    height: 100%;
    .systemMonitor-right{
        width: 100%;
        height: 100%;
    }
}
</style>