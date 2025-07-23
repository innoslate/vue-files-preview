import { defineComponent as y, ref as t, watch as g, createElementBlock as x, openBlock as P, normalizeStyle as k, createElementVNode as u } from "vue";
import "../../../../node_modules/epubjs/src/book.mjs";
import "../../../../node_modules/@xmldom/xmldom/lib/dom.mjs";
import "../../../../node_modules/@xmldom/xmldom/lib/dom-parser.mjs";
import "../../../../node_modules/epubjs/src/rendition.mjs";
import "../../../../node_modules/epubjs/src/contents.mjs";
import "../../../../node_modules/epubjs/src/layout.mjs";
import K from "../../../../node_modules/epubjs/src/epub.mjs";
import { getFileRenderByFile as D } from "../../utils/utils.mjs";
import { onKeyStroke as p } from "../../../../node_modules/@vueuse/core/index.mjs";
const L = /* @__PURE__ */ y({
  __name: "index",
  props: {
    file: { default: () => null },
    url: { default: () => null },
    name: {},
    width: { default: () => "100%" },
    height: { default: () => "100%" }
  },
  setup(s) {
    const a = s, f = t(), r = t(), l = t(1), i = t(), c = t(!1), o = t(), n = t();
    function d() {
      a.file && D(a.file).then((e) => {
        o.value = K(e), n.value = o.value.renderTo("epub-viewer", {
          // Scroll mode
          width: "100%",
          height: "calc(100vh - 80x)",
          flow: "scrolled",
          allowScriptedContent: !0
        }), o.value.ready.then(() => {
          f.value = o.value.navigation, r.value = o.value.locations, c.value = !0, i.value = r.value.length(), n.value.display();
        });
      });
    }
    g(
      () => a.file,
      () => {
        d();
      },
      { immediate: !0 }
    );
    function m() {
      n.value && (n.value.prev(), l.value--, l.value < 1 && (l.value = 1));
    }
    function w() {
      n.value && (n.value.next(), l.value++, l.value > i.value && (l.value = i.value));
    }
    function h(e) {
      e.preventDefault();
    }
    function b(e) {
      e.preventDefault();
    }
    return p("ArrowLeft", () => {
      m();
    }), p("ArrowRight", () => {
      w();
    }), (e, v) => (P(), x("div", {
      class: "epub-preview epub-box",
      style: k({ width: e.width, height: e.height })
    }, [
      u("button", {
        class: "btn",
        style: { display: "none" },
        onKeydown: h
      }, " Prev ", 32),
      v[0] || (v[0] = u("div", {
        id: "epub-viewer",
        class: "epub-viewer"
      }, null, -1)),
      u("button", {
        class: "btn",
        style: { display: "none" },
        onKeydown: b
      }, " Next ", 32)
    ], 4));
  }
});
export {
  L as default
};
//# sourceMappingURL=index.vue2.mjs.map
