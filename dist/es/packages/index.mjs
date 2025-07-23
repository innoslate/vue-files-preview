import "./preview/supports/vue-files-preview/index.mjs";
import "./preview/supports/audio-preview/index.mjs";
import "./preview/supports/code-preview/index.mjs";
import "./preview/supports/docx-preview/index.mjs";
import "./preview/supports/epub-preview/index.mjs";
import "./preview/supports/md-preview/index.mjs";
import "./preview/supports/pdf-preview/index.mjs";
import "./preview/supports/pic-preview/index.mjs";
import "./preview/supports/txt-preview/index.mjs";
import "./preview/supports/video-preview/index.mjs";
import "./preview/supports/xlsx-preview/index.mjs";
import { version as e } from "./version.mjs";
import m from "./preview/supports/xlsx-preview/index.vue.mjs";
import t from "./preview/supports/video-preview/index.vue.mjs";
import p from "./preview/supports/txt-preview/index.vue.mjs";
import s from "./preview/supports/pic-preview/index.vue.mjs";
import f from "./preview/supports/pdf-preview/index.vue.mjs";
import P from "./preview/supports/md-preview/index.vue.mjs";
import v from "./preview/supports/epub-preview/index.vue.mjs";
import c from "./preview/supports/docx-preview/index.vue.mjs";
import n from "./preview/supports/code-preview/index.vue.mjs";
import w from "./preview/supports/audio-preview/index.vue.mjs";
import a from "./preview/supports/vue-files-preview/index.vue.mjs";
const r = {
  VueFilesPreview: a,
  AudioPreview: w,
  CodePreview: n,
  DocxPreview: c,
  EpubPreview: v,
  MdPreview: P,
  PdfPreview: f,
  PicPreview: s,
  TxtPreview: p,
  VideoPreview: t,
  XlsxPreview: m
};
function _(o) {
  Object.keys(r).forEach((i) => {
    o.component(i, r[i]);
  });
}
const B = { version: e, install: _ };
export {
  w as AudioPreview,
  n as CodePreview,
  c as DocxPreview,
  v as EpubPreview,
  P as MdPreview,
  f as PdfPreview,
  s as PicPreview,
  p as TxtPreview,
  t as VideoPreview,
  a as VueFilesPreview,
  m as XlsxPreview,
  B as default
};
//# sourceMappingURL=index.mjs.map
