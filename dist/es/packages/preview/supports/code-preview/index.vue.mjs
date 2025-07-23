import { defineComponent as s, ref as d, shallowRef as f, watch as c, createElementBlock as p, openBlock as v, createVNode as h, unref as n, isRef as w } from "vue";
import { Codemirror as _ } from "../../../../node_modules/vue-codemirror/dist/vue-codemirror.esm.mjs";
import { javascript as R } from "../../../../node_modules/@codemirror/lang-javascript/dist/index.mjs";
import { json as V } from "../../../../node_modules/@codemirror/lang-json/dist/index.mjs";
import { html as x } from "../../../../node_modules/@codemirror/lang-html/dist/index.mjs";
import { oneDark as k } from "../../../../node_modules/@codemirror/theme-one-dark/dist/index.mjs";
import { getFileRenderByFile as y } from "../../utils/utils.mjs";
const B = { class: "code-preview" }, E = /* @__PURE__ */ s({
  __name: "index",
  props: {
    file: { default: () => null },
    url: { default: () => null },
    name: {}
  },
  setup(l) {
    const t = l, e = d(), i = [R(), V(), x(), k], a = f();
    function m(o) {
      a.value = o.view;
    }
    return c(
      () => t.file,
      () => {
        y(t.file).then((o) => {
          e.value = o;
        });
      },
      {
        immediate: !0
      }
    ), (o, r) => (v(), p("div", B, [
      h(n(_), {
        modelValue: n(e),
        "onUpdate:modelValue": r[0] || (r[0] = (u) => w(e) ? e.value = u : null),
        autofocus: !0,
        "indent-with-tab": !0,
        "tab-size": 2,
        extensions: i,
        onReady: m
      }, null, 8, ["modelValue"])
    ]));
  }
});
export {
  E as default
};
//# sourceMappingURL=index.vue.mjs.map
