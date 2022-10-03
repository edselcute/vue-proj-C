<template>
  <router-view></router-view>
</template>

<script>
export default {
    mounted() {
        this.$appSetting.toggleMode('');
    }
}
</script>

<style>

</style>