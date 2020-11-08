<template>
  <div id="app" class="h-200 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" >
    <SortList />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import SortList from "./components/SortList";

export default {
  name: "App",
  components: {
    // HelloWorld,
    SortList,
  },
};
</script>

<style>
#app {
  margin-top: 20px;
}
</style>
