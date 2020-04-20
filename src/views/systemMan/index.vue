<template>
    <div class="systemMan">
        <aside class="systemMan-right">
                <router-view></router-view>
        </aside>
    </div>
</template>
<script>
export default {
    name:"systemMan"
}
</script>
<style lang="scss">
.systemMan{
    width: 100%;
    height: 100%;
    .systemMan-right{
        width: 100%;
        height: 100%;
    }
}
</style>
