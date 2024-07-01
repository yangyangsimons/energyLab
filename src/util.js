export default function(){};

/**
 * 将日期对象格式化成字符串
 * @param {String} format 格式支持：yyyy-MM-dd HH:mm:ss.S 默认：yyyy-MM-dd
 */
Date.prototype.format = function (format) {
  format = format == null ? "yyyy-MM-dd" : format;
  var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "H+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
  }

  if (/(y+)/.test(format))
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}

Number.prototype.toDate = function () {
  return new Date(this);
}

Number.prototype.toChina = function () {
  let number = this.toString();
  if (number.match(/\D/) || number.length >= 14) return;
  let zhArray = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']; // 数字对应中文
  let baseArray = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万']; //进位填充字符，第一位是 个位，可省略
  let string = String(number).split('').reverse().map((item, index) => { // 把数字切割成数组并倒序排列，然后进行遍历转成中文
      // 如果当前位为0，直接输出数字， 否则输出 数字 + 进位填充字符
      item = Number(item) == 0 ? zhArray[Number(item)] : zhArray[Number(item)] + baseArray[index];
      return item;
  }).reverse().join(''); // 倒叙回来数组，拼接成字符串
  string = string.replace(/^一十/, '十');  // 如果以 一十 开头，可省略一
  string = string.replace(/零+/, '零');  // 如果有多位相邻的零，只写一个即可
  return string;
}
/**
* 将字符串格式化成日期对象
* @param {String} format 格式支持：yyyy-MM-dd HH:mm:ss.S 默认：yyyy-MM-dd
*/
String.prototype.toDate = function (format) {
  if (/^\d+$/.test(this)) {
      return new Date(Number(this));
  }
  format = format == null ? "yyyy-MM-dd" : format;
  var d = new Date();
  var o = {
      "y+": "d.setYear(val)", //year
      "M+": "d.setMonth(val-1)", //month
      "d+": "d.setDate(val)", //day
      "H+": "d.setHours(val)", //hour
      "m+": "d.setMinutes(val)", //minute
      "s+": "d.setSeconds(val)", //second
      "S+": "d.setMilliSeconds(val)" //millisecond
  }
  var regx = format
  for (var k in o) {
      if (new RegExp("(" + k + ")").test(format))
          regx = regx.replace(new RegExp(k), "[0-9]+");
  }

  if (!new RegExp("^" + regx + "$").test(this)) {
      throw new Error("日期格式不正确:" + format);
  }

  for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
          var regx = format;
          for (var temp in o) {
              if (temp == k) {
                  regx = regx.replace(new RegExp(temp), "([0-9]+)");
              } else {
                  regx = regx.replace(new RegExp(temp), "[0-9]+");
              }

          }
          var val = Number(this.replace(new RegExp("^" + regx + "$"), "$1"));
          try {

              if (k == "S+") {
                  d.setMilliseconds(val);
              } else {
                  eval(o[k].replace("val", val));
              }
          } catch (e) { alert(e); }
      } else {
          try {
              var val = k == "M+" ? 1 : 0;
              if (k == "S+") {
                  d.setMilliseconds(val);
              } else {
                  eval(o[k].replace("val", val));
              }
          } catch (e) { alert(e); }
      }
  }
  return d;
}

String.prototype.toTime = function () {
  return eval(this.replace(/^(\d{2}):(\d{2}):(\d{2})$/,"$1*3600+$2*60+$3"));
}

Number.prototype.toTime = function(){
  let ss = this % 60;
  let temp = (this - ss)/60;
  let mm = temp % 60;
  let hh = (temp - mm)/60;

  return `${hh.toString().padStart(2,"0")}:${mm.toString().padStart(2,"0")}:${ss.toString().padStart(2,"0")}`
}