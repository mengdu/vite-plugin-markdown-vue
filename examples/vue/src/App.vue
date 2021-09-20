<template>
  <div class="container">
    <p>
      <a href="#readme" @click="tab = '#readme'">README</a>&nbsp;|&nbsp;<a href="#docs" @click="tab = '#docs'">Docs</a>
      &nbsp;<a href="https://github.com/mengdu/vite-plugin-markdown-vue" target="_blank" style="float: right;">Github</a>
    </p>
    <Docs v-if="tab === '#docs'"/>
    <README v-else/>
  </div>
</template>

<script>
import README from '../../../README.md'
import Docs from '../../../docs/docs.md'

export default {
  data () {
    return {
      tab: '#readme'
    }
  },
  components: {
    README,
    Docs
  },
  mounted () {
    console.log(location)
    this.tab = location.hash
  }
}
</script>
<style>
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #303133;
}

.container {
  width: 800px;
  margin: 0 auto;
  padding: 15px;
  margin-bottom: 150px;
}
</style>
