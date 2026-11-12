/* @ds-bundle: {"format":4,"namespace":"PersonalDS","components":[{"name":"Button"},{"name":"Headings"},{"name":"Card"}]} */
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

  // Level 1 is the page heading, level 2 is subheading-1.
  var HEADING_STYLE = { 1: "page-heading", 2: "subheading-1" };
  function Headings(props) {
    var level = props.level === 2 ? 2 : 1;
    var className = ["pds-h" + level, HEADING_STYLE[level], props.className].filter(Boolean).join(" ");
    return h("h" + level, Object.assign({}, strip(props, ["level", "className", "children"]), { className: className }), props.children);
  }

  // Card: a title (card-heading) and body text on a card surface. surface: "default" or "mid".
  function Card(props) {
    var className = ["pds-card", props.surface === "mid" ? "pds-card-mid" : null, props.className].filter(Boolean).join(" ");
    return h("div", Object.assign({}, strip(props, ["surface", "title", "className", "children"]), { className: className }),
      props.title ? h("h2", { className: "pds-card-title card-heading" }, props.title) : null,
      props.children ? h("p", { className: "pds-card-body card-body" }, props.children) : null);
  }

  window.PersonalDS = Object.assign(window.PersonalDS || {}, { Button: Button, Headings: Headings, Card: Card });
})();
