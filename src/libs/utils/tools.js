// 防抖
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
// 节流
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
// async await捕获错误
export const awaitWrap = promise => {
  return promise
          .then(res => [null, res])
          .catch(err => [err, null]);
};
