<template>
    <div class="tenant">
        <aside class="tenant-right">
                <router-view></router-view>
        </aside>
    </div>
</template>
<script>
export default {
    name:"tenant"
}
</script>
<style lang="scss">
.tenant{
    width: 100%;
    height: 100%;
    .tenant-right{
        width: 100%;
        height: 100%;
    }
}
</style>