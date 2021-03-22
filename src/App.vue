<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <router-view :key="$route.fullPath" />
      </el-container>
      <Footer />
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
};
</script>
