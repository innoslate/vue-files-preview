<script lang='ts' setup>
import {onBeforeUnmount, onMounted, ref, shallowRef, watch} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      url: () => null,
      file: () => null,
    },
)

const fileRender = ref(null)
watch(
    () => props.file,
    (file) => {
      if (file) {
        fileRender.value && URL.revokeObjectURL(fileRender.value)
        getFileRenderByFile(file).then((render) => {
          fileRender.value = render
          // Set the video element src
          videoPreviewRef.value.src = fileRender.value
        })
      }
    },
    {immediate: true},
)
const videoPreviewRef = shallowRef(null)
onMounted(() => {
  // Listen for video elements loadedmetadata. Event to automatically play the video once it has loaded
  videoPreviewRef.value.addEventListener('loadedmetadata', () => {
    videoPreviewRef.value.play()
  })
})

onBeforeUnmount(() => {
  // When the component is destroyed. Release the video element src
  videoPreviewRef.value.pause()
  if (props.file) {
    URL.revokeObjectURL(fileRender.value)
  }
})
</script>

<template>
  <div class="video-preview web-full-screen">
    <video ref="videoPreviewRef" class="player-video-main" controls autoplay/>
  </div>
</template>

<style scoped lang='scss'>
.web-full-screen {
  z-index: 9999999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw !important;
  height: 100vh !important;
  overflow: hidden; /* Hide overflow content. Keep the full screen experience */
  background: rgba(0, 0, 0, 0.8); /* Background color can improve video contrast */
  display: flex; /* Use flexbox to the center video */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
}

.player-video-main {
  width: 100%;
  height: auto; /* Keep video aspect ratio */
  max-height: 100%; /* Limit the maximum height to prevent overflow */
  object-fit: contain; /* Keep aspect ratio. Black edges may appear */
  transition: .2s;
}

.player-video-main.video-mirror {
  transform: rotateY(180deg);
}
</style>
