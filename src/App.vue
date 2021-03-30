<template>
  <div id="app">
    <route-loading v-show="showLoading"></route-loading>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <router-view :key="$route.fullPath" />
      </el-container>
      <Footer v-if="footerShow" />
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouteLoading from '@/components/RouteLoading';
export default {
  name: 'APP',
  components: {
    Header,
    Footer,
    RouteLoading,
  },
  data() {
    return {
      footerShow: false,
    };
  },
  computed: {
    showLoading() {
      return this.$store.state.routeLoading; //global loading
    },
  },
  created() {
    this.$router.onReady(() => {
      this.footerShow = true;
    });
  },
};
</script>
