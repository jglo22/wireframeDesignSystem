/* @ds-bundle: {"format":4,"namespace":"PersonalDS","components":[{"name":"Button"},{"name":"Headings"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function strip(props, keys) {
    var rest = Object.assign({}, props);
    keys.forEach(function (k) { delete rest[k]; });
    return rest;
  }

  function Button(props) {
    var variant = props.variant || "primary";
    var className = ["pds-btn", "font-s", "pds-btn-" + variant, props.className]
      .filter(Boolean)
      .join(" ");
    return h("button", Object.assign({ type: "button" }, strip(props, ["variant", "className", "children"]), { className: className }), props.children);
  }

  // Test component: only level 1 is styled so far.
  function Headings(props) {
    var level = props.level || 1;
    var className = ["pds-h" + level, "font-4xl", props.className].filter(Boolean).join(" ");
    return h("h" + level, Object.assign({}, strip(props, ["level", "className", "children"]), { className: className }), props.children);
  }

  window.PersonalDS = Object.assign(window.PersonalDS || {}, { Button: Button, Headings: Headings });
})();
