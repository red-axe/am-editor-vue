# am-editor-vue

[am-editor](https://github.com/red-axe/am-editor) for Vue3.

## Usage

```bash
yarn add am-editor-vue

# or npm
npm i am-editor-vue

# or pnpm
pnpm add am-editor-vue

# or Rush
rush add -p am-editor-vue

```

## Vue

```Vue

<script setup lang="ts" name="OfficeMig">
import { ref } from 'vue'
import Editor, { ChangeInterface, ChangePayload, EditorInstance } from 'am-editor-vue'
import 'editor/dist/style.css'

const editor = ref<EditorInstance | null>(null)
const content = ref('<h1>Hello Editor</h1>')

const style = ref({
  padding: '0',
  background: '#fff',
})

const onChange = ({html, json}: ChangePayload) => {
  console.log('html content: ', html)
  console.log('json content: ', json)
}

</script>

<template>
  <Editor
    ref="editor"
    v-model="content"
    @change="onChange"
    :styleOption="style"
  />
</template>

```
