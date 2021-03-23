<template>
  <div id="app">
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
export default {
  name: 'APP',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      footerShow: false,
    };
  },
  created() {
    this.$router.onReady(() => {
      this.footerShow = true;
    });
  },
};
</script>
