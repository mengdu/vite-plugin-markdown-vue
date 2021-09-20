<template>
  <div class="demo-block">
    <div class="source"><slot name="source"></slot></div>
    <div class="meta">
      <div class="description"><slot></slot></div>
      <div class="highlight"><slot name="highlight"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demo-block'
}
</script>
<style>
.demo-block {
  border: solid 1px #dcdfe6;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 20px;
}

.demo-block .source {
  padding: 15px;
}

.demo-block .meta {
  background-color: #fafafa;
  border-top: solid 1px #dcdfe6;
}

.demo-block .description {
  background-color: #fff;
  font-size: 13px;
  padding: 0 15px;
  margin: 10px;
  border: solid 1px #dcdfe6;
  border-radius: 3px;
}

.demo-block .hljs {
  margin: 0;
}
</style>
