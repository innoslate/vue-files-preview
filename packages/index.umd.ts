import {
  AudioPreview,
  CodePreview,
  DocxPreview,
  EpubPreview,
  MdPreview,
  PdfPreview,
  PicPreview,
  TxtPreview,
  VideoPreview,
  VueFilesPreview,
  XlsxPreview,
} from './preview/supports/index.js'
import {version} from './version.js'

const components = {
  VueFilesPreview,
  AudioPreview,
  CodePreview,
  DocxPreview,
  EpubPreview,
  MdPreview,
  PdfPreview,
  PicPreview,
  TxtPreview,
  VideoPreview,
  XlsxPreview,
}

function install(app: import('vue').App<any>): void {
  Object.keys(components).forEach((key) => {
    app.component(key, components[key])
  })
}

// UMD Entry Point: Merges `install`, `version`, and all components into a single default export object.
// In this way, `window.VueFilesPreview` can be used directly with `app.use()`, while also providing access to the individual components.
export default {version, install, ...components}