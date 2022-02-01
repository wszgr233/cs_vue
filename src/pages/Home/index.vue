//首页路由
<template>
  <div>
    <typeNav />
    <listContainer />
    <todayRecommend />
    <Rank />
    <Like />
    <Floor
      v-for="(list, index) in floorList"
      :key="index"
      :list="floorList[index]"
    />
    <Brand />
  </div>
</template>

<script>
import listContainer from "@/pages/Home/listContainer";
import todayRecommend from "@/pages/Home/todayRecommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
import { status } from "nprogress";
export default {
  name: "App",
  components: {
    listContainer,
    todayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("reqgetBanner");
    this.$store.dispatch("reqgetFloor");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>