import { defineComponent as c, ref as i, watch as d, createElementBlock as f, openBlock as u, createVNode as a, unref as m } from "vue";
import s from "../../../../node_modules/@vue-office/docx/lib/index.mjs";
/* empty css                                                       */
import { getFileRenderByFile as p } from "../../utils/utils.mjs";
const _ = { class: "docx-preview" }, k = /* @__PURE__ */ c({
  __name: "index",
  props: {
    file: { default: () => null },
    url: { default: () => null },
    name: {}
  },
  setup(o) {
    const e = o, r = i(null);
    d(
      () => e.file,
      () => {
        p(e.file).then((n) => {
          r.value = n;
        });
      },
      { immediate: !0 }
    );
    function t() {
    }
    function l() {
    }
    return (n, x) => (u(), f("div", _, [
      a(m(s), {
        src: r.value,
        onRendered: t,
        onError: l
      }, null, 8, ["src"])
    ]));
  }
});
export {
  k as default
};
//# sourceMappingURL=index.vue.mjs.map
