<script lang='ts' setup>
import {computed, getCurrentInstance, onBeforeMount, onMounted, ref} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      file: () => null,
      name: () => null,
    },
)

const {proxy} = getCurrentInstance() as any

const audioDom = ref()
const ulDom = ref()
const containerDom = ref()
const canvasDom = ref()
const ctx = ref()
const isInit = ref(false)
const analyser = ref()
const dataSource = ref()
const mode = ref('Wavy')
const src = ref(null)

/**
 * Initialization Dom
 */
function initDom(): void {
  audioDom.value = proxy.$refs.audioRef as HTMLAudioElement
  ulDom.value = proxy.$refs.ulRef as HTMLUListElement
  containerDom.value = proxy.$refs.containerRef as HTMLDivElement
  canvasDom.value = proxy.$refs.canvasRef as HTMLDivElement
  ctx.value = canvasDom.value.getContext('2d')
}

const containerHeight = computed(() => {
  return containerDom.value?.clientHeight
})
const liHeight = computed(() => {
  return ulDom.value.children[0]?.clientHeight
})
const maxOffset = computed(() => {
  return ulDom.value?.clientHeight - containerHeight.value
})

/**
 * Initialization canvas
 */
function initCanvas() {
  canvasDom.value.width = window.innerWidth * devicePixelRatio
  canvasDom.value.height = 300
}

/**
 * Audio playback
 */
function audioPlay() {
  audioDom.value.onplay = () => {
    if (isInit.value)
      return
    const audCtx = new AudioContext()
    const source = audCtx.createMediaElementSource(audioDom.value)
    analyser.value = audCtx.createAnalyser()
    analyser.value.fftSize = 512
    dataSource.value = new Uint8Array(analyser.value.frequencyBinCount)
    source.connect(analyser.value)
    analyser.value.connect(audCtx.destination)

    isInit.value = true
  }
}

// Columnar
function drawColumnar() {
  requestAnimationFrame(drawColumnar)
  const {width, height} = canvasDom.value
  ctx.value.clearRect(0, 0, width, height)
  if (!isInit.value)
    return
  if (dataSource.value) {
    analyser.value && analyser.value.getByteFrequencyData(dataSource.value)

    const len = dataSource.value.length
    const barWidth = width / len
    ctx.value.fillStyle = 'skyblue'
    dataSource.value.forEach((v, i) => {
      const barHeight = v / 255 * height
      const x = i * barWidth
      const y = height - barHeight
      ctx.value.fillRect(x, y, barWidth, barHeight)
    })
  }
}

// Wave
function drawWavy() {
  requestAnimationFrame(drawWavy)
  const {width, height} = canvasDom.value
  ctx.value.clearRect(0, 0, width, height)
  if (!isInit.value)
    return
  if (dataSource.value) {
    analyser.value && analyser.value.getByteFrequencyData(dataSource.value)

    const len = dataSource.value.length
    const sliceWidth = width * 1.0 / len
    let x = 0

    ctx.value.beginPath()
    ctx.value.strokeStyle = 'skyblue'
    dataSource.value.forEach((v, i) => {
      const vNormalized = v / 255
      const y = vNormalized * height / 2

      if (i === 0)
        ctx.value.moveTo(x, y)
      else
        ctx.value.lineTo(x, y)

      x += sliceWidth
    })

    ctx.value.lineTo(width, height / 2)
    ctx.value.stroke()
  }
}

/**
 * Switch mode
 */
function changeMode() {
  mode.value = mode.value === 'Columnar' ? 'Wavy' : 'Columnar'
  mode.value == 'Columnar' ? drawColumnar() : drawWavy()
}

onBeforeMount(() => {
  getFileRenderByFile(props.file).then((render) => {
    src.value = render
  })
})
onMounted(() => {
  initDom() // Initialization Dom
  audioPlay() // Audio playback
  initCanvas() // Initialization canvas
  drawWavy() // Draw waves
})
</script>

<template>
  <div class="audio-preview music-container flex flex-column flex-align">
    <div class="audio-container flex-align">
      <div class="flex-column" style="margin-left: 0.5rem;">
        <div style="font-size: 1.6rem; color: #999;">
          {{ name }}
        </div>
      </div>
      <div class="mp3Box">
        <audio ref="audioRef" controls :src="src"/>
      </div>
      <div>
        <el-button link @click="changeMode">
          {{ mode }}
        </el-button>
      </div>
    </div>
    <div class="cvs-container">
      <canvas ref="canvasRef"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.music-container {
  height: 100vh;
  background: #1b1d1d;

  audio {
    width: 450px;
    margin: 0 1.2rem;
    background: #303233;
    border-radius: 54px;
  }

  audio::-webkit-media-controls-panel {
    background-image: initial;
    background-color: #777;
    transition: none;
  }

  audio::-webkit-media-controls-current-time-display,
  audio::-webkit-media-controls-time-remaining-display {
    background: #777;
    text-shadow: none;
  }

  .audio-container {
    height: 5.2rem;
    // border: 1px solid #777;
  }

  .lrc-container {
    width: 100%;
    padding-top: 30px;
    flex: 1;
    height: 220px;
    text-align: center;
    overflow: hidden;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to bottom, rgba(27, 29, 29, 1), rgba(255, 255, 255, 0));
      pointer-events: none;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
      transform: rotate(180deg);
    }

    ul {
      transition: 0.6s;
      list-style: none;
      color: #ffffff70;

      li {
        height: 30px;
        line-height: 30px;
        transition: 0.2s;

        &.active {
          font-weight: 700;
          color: #fff;
          transform: scale(1.2);
        }
      }
    }
  }

  .cvs-container {
    padding-top: 10px;
  }
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-align {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
