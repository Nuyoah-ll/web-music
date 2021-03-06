<template>
  <div id="discovery">
    <discovery-navbar />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import DiscoveryNavbar from "./child-components/DiscoveryNavbar";

export default {
  name: "Discovery",
  components: {
    DiscoveryNavbar,
  },
};
</script>

<style scoped>
</style>