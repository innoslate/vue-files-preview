import { defineComponent as o, ref as i, watch as a, createElementBlock as c, openBlock as s, toDisplayString as u } from "vue";
import { getFileRenderByFile as p } from "../../utils/utils.mjs";
const f = { class: "txt-preview" }, _ = /* @__PURE__ */ o({
  __name: "index",
  props: {
    file: { default: () => null },
    url: { default: () => null },
    name: {}
  },
  setup(l) {
    const r = l, t = i(null);
    return a(
      () => r.file,
      (e) => {
        e && p(e).then((n) => {
          t.value = n;
        });
      },
      { immediate: !0 }
    ), (e, n) => (s(), c("div", f, u(t.value), 1));
  }
});
export {
  _ as default
};
//# sourceMappingURL=index.vue.mjs.map
