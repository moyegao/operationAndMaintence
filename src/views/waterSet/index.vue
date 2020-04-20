<template>
    <div class="waterSet">
        <aside class="waterSet-right">
                <router-view></router-view>
        </aside>
    </div>
</template>
<script>
export default {
    name:"waterSet"
}
</script>
<style lang="scss">
.waterSet{
    width: 100%;
    height: 100%;
    .waterSet-right{
        width: 100%;
        height: 100%;
    }
}
</style>
