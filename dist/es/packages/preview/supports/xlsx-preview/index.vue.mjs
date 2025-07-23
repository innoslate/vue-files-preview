import { defineComponent as c, ref as d, watch as u, createElementBlock as a, openBlock as f, createVNode as s, unref as m } from "vue";
import p from "../../../../node_modules/@vue-office/excel/lib/index.mjs";
/* empty css                                                        */
import { getFileRenderByFile as _ } from "../../utils/utils.mjs";
const h = { class: "xlsx-preview" }, E = /* @__PURE__ */ c({
  __name: "index",
  props: {
    file: { default: () => null },
    url: { default: () => null },
    name: {},
    width: {},
    height: {}
  },
  setup(t) {
    const o = t, r = d(null);
    u(
      () => o.file,
      (e) => {
        e && _(e).then((n) => r.value = n);
      },
      { immediate: !0 }
    );
    function l() {
    }
    function i() {
    }
    return (e, n) => (f(), a("div", h, [
      s(m(p), {
        src: r.value,
        onRendered: l,
        onError: i
      }, null, 8, ["src"])
    ]));
  }
});
export {
  E as default
};
//# sourceMappingURL=index.vue.mjs.map
