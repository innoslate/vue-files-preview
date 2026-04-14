<script lang='ts' setup>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import {ref, watch} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile, getFileRenderByUrl} from '../../utils/utils'

const props = withDefaults(
  defineProps<PreviewProps & {
    options?: Record<string, any>
    requestOptions?: Record<string, any>
  }>(),
  {
    url: () => null,
    file: () => null,
    options: () => ({}),
    requestOptions: () => ({}),
  },
)

const fileRender = ref(null)
watch(
  () => props.file,
  (file) => {
    if (file) {
      getFileRenderByFile(file).then((render) => {
        fileRender.value = render
      })
    }
  },
  {immediate: true},
)

watch(
  () => props.url,
  (url) => {
    if (url && !props.file) {
      getFileRenderByUrl(url).then((render) => {
        fileRender.value = render
      })
    }
  },
  {immediate: true},
)

const emit = defineEmits<{
  rendered: []
  error: [error: Error]
}>()

function renderedHandler(): void {
  emit('rendered')
}

function errorHandler(e: Error): void {
  emit('error', e)
}
</script>

<template>
  <div class="docx-preview">
    <VueOfficeDocx :src="fileRender" :options="options" :requestOptions="requestOptions" @rendered="renderedHandler" @error="errorHandler"/>
  </div>
</template>

<style scoped lang='scss'></style>
