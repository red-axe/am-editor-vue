<template>
  <div class="mention-container">
    <p>This is name: {{ name }}</p>
    <p>配置 mention 插件的 onMouseEnter 方法</p>
    <p>此处使用 createApp().mount 自定义渲染</p>
    <p>Use createApp().mount to customize rendering here</p>
  </div>
</template>

<script setup lang="ts" name="AmMention">
interface IProps {
  name: string
}
defineProps<IProps>()
</script>
<style css>
.mention-container {
  padding: 5px;
}
</style>
