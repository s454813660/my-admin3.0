export function debounce(fn, delay = 500) {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;
    if(timer) clearTimeout(timer);;
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
};

export function throttle(fn, delay) {
  let start = new Date().getTime();
  return function () {
    let now = new Date().getTime();
    if(now - start > delay) {
      fn.apply(this, args);
      start = now;
    }
  }
}