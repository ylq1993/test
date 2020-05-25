export function safe_call_instance_method(instance) {
  return function (name) {
    return instance && instance[name] && instance[name]();
  };
}

export function safe_render_dom_method(instance) {
  return function (name) {
    if (instance && instance[name]) {
      return instance[name]();
    } else {
      return null;
    }
  };
}
