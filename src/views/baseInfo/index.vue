<template>
    <div class="baseInfo">
        <aside class="baseInfo-right">
                <router-view></router-view>
        </aside>
    </div>
</template>
<script>
export default {
    name:"baseInfo"
}
</script>
<style lang="scss">
.baseInfo{
    width: 100%;
    height: 100%;
    .baseInfo-right{
        width: 100%;
        height: 100%;
    }
}
</style>