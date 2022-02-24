<template>
  <AmToolbar v-if="engine" :engine="engine" :items="items" />
  <div :class="['editor-wrapper', { 'editor-mobile': isMobile }]">
    <div class="editor-container text-left">
      <div class="editor-content">
        <div ref="container"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RedaxeEditor">
import { onMounted, onUnmounted, ref, watch } from 'vue'

import Engine, { $, EngineInterface, ChangeInterface, isMobile } from '@aomao/engine'
import AmToolbar, { GroupItemProps } from '@aomao/toolbar-vue'
import { cards, plugins, pluginConfig } from './config'
import { defaultContent, getDefaultToolbarItems, getDefaultStyle } from './default'
import { StyleOption, NODES, Message, ChangePayload } from './types'

interface IProps {
  modelValue?: string
  styleOption?: Partial<StyleOption>
  items?: GroupItemProps[]
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: defaultContent,
  items: () => getDefaultToolbarItems(isMobile),
  styleOption: () => ({}),
})

const styles = ref<StyleOption>({ ...getDefaultStyle(), ...props.styleOption })

const emit = defineEmits<{
  (type: 'update:modelValue', change: string): void
  (type: 'change', change: ChangePayload): void
  (event: 'changeHTML', content: string): void
  (event: 'changeJSON', content: NODES): void
  (event: 'select', change: ChangeInterface): void
  (event: 'confirm', message: string): Promise<boolean>
  (event: 'message', message: Message): void
}>()

// 编辑器容器
const container = ref<HTMLElement | null>(null)
// 编辑器引擎
const engine = ref<EngineInterface | null>(null)
// 默认设置为当前在加载中
const loading = ref(true)

defineExpose({
  engine,
  container,
})

onMounted(() => {
  // 容器加载后实例化编辑器引擎
  if (container.value) {
    // 实例化引擎
    const engineInstance = new Engine(container.value, {
      // 启用的插件
      plugins,
      // 启用的卡片
      cards,
      // 所有的卡片配置
      config: pluginConfig,
    })
    // 设置显示成功消息UI，默认使用 console.log
    engineInstance.messageSuccess = (msg: string) => {
      emit('message', { type: 'success', msg })
    }
    // 设置显示错误消息UI，默认使用 console.error
    engineInstance.messageError = (error: string) => {
      emit('message', { type: 'error', msg: error })
    }

    // 设置显示确认消息UI，默认无
    engineInstance.messageConfirm = (msg: string) => {
      return new Promise((resolve, reject) => {
        emit('confirm', msg).then(resolve, reject)
      })
    }
    // 卡片最大化时设置编辑页面样式
    engineInstance.on('card:maximize', () => {
      $('.editor-toolbar').css('z-index', '9999').css('top', '55px')
    })
    engineInstance.on('card:minimize', () => {
      $('.editor-toolbar').css('z-index', '').css('top', '')
    })
    // 默认编辑器值，为了演示，这里初始化值写死，正式环境可以请求api加载

    const value = props.modelValue
    // 使用协同编辑，需要安装 mongodb 数据库，并且配置 ot-server/client 中的数据库连接，最后 yarn start 启动 ot-server 服务

    // 非协同编辑，设置编辑器值，异步渲染后回调
    engineInstance.setValue(value, () => {
      loading.value = false
    })

    // 监听编辑器值改变事件
    engineInstance.on('change', () => {
      emit('change', {
        html: engineInstance.getHtml(),
        json: engineInstance.getJsonValue(),
      })
      emit('update:modelValue', engineInstance.getHtml())
      emit('changeHTML', engineInstance.getHtml())
      emit('changeJSON', engineInstance.getJsonValue())
    })

    engineInstance.on('select', () => {
      emit('select', engineInstance.change)
    })

    engine.value = engineInstance
  }
})

onUnmounted(() => {
  if (engine.value) engine.value.destroy()
})
</script>
<style scoped>
#app {
  padding: 0;
}
#nav {
  position: relative;
}
.editor-ot-users {
  font-size: 12px;
  background: #ffffff;
  padding: 0px 0 8px 266px;
  z-index: 999;
  width: 100%;
}

.editor-ot-users-content {
  display: flex;
  flex-wrap: wrap;
}

.editor-ot-users .ant-avatar {
  margin: 0 2px;
}

.editor-toolbar {
  position: fixed;
  width: 100%;
  background: #ffffff;
  /* transition: box-shadow 0.3s ease-in-out;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%); */
  z-index: 1000;
}
.editor-wrapper {
  position: relative;
  width: 100%;
}

.editor-wrapper.editor-mobile {
  min-width: auto;
}

.editor-container {
  background: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 1px;
  overflow: auto;
  position: relative;
}

.editor-mobile .editor-container {
  padding: 0;
  height: auto;
  overflow: hidden;
}

.editor-content {
  position: relative;
  width: v-bind(styles.width);
  height: v-bind(styles.height);
  margin: v-bind(styles.margin);
  padding: v-bind(styles.padding);
  background: v-bind(styles.background);
  box-shadow: v-bind(styles.boxShadow);
  border: v-bind(styles.border);
  overflow-y: v-bind(styles.overflowY);
  min-height: v-bind(styles.minHeight);
}

.editor-mobile .editor-content {
  width: auto;
  min-height: calc(100vh - 68px);
  border: 0 none;
}

.editor-content .am-engine {
  padding: 40px 60px 60px;
}

.editor-mobile .editor-content .am-engine {
  padding: 18px 0 0 0;
}
</style>
