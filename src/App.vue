<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-if="$route.meta.showFoot" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("getCategoryList");
   
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
</style>
