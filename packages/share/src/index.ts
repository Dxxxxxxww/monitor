export function formatDate(date: Date, fmt: string) {
  if (/(y+)/.test(fmt)) {
    // replace 第二个参数如果是函数，函数的返回值作为替换字符串
    fmt = fmt.replace(/(y+)/, (m) =>
      (date.getFullYear() + '').slice(4 - m.length)
    );
  }
  let o: { [k: string]: number } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    const reg = new RegExp(`(${k})`);
    const str = o[k] + '';
    if (reg.test(fmt)) {
      fmt = fmt.replace(reg, (m) => {
        return m.length === 1 ? str : padLeftZero(str);
      });
    }
  }
  return fmt;
}

function padLeftZero(str: string) {
  return ('00' + str).slice(str.length);
}
