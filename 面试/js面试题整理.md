# 面试题

### 1.引用类型(对象，函数)

```js
let obj1 = {
    name: "korea",
    address :{
        country: "China",
        city: "shantou"
    }
}
let obj2 = {
    name: "demo",
    address: obj1.address // 指向obj1中address的地址，地址一样，修改值后，上面的也会修改
}
obj2.name = "demo1"
onj2.address.city = "guangdong"
console.log(obj1.name, obj2.name)
console.log(obj1.address.city, obj2.address.city) // guangong guangdong 
```

### 2.自增自减

```js
var x = 0;
console.log(x++); // 0 变量自增1，得到表达式的值是自增之前的值
console.log(++x); // 1 变量自增1，得到表达式的值是自增之后的值
console.log(x--); // 0 变量自减1，得到表达式的值是自减之前的值
console.log(--x); // 1 变量自减1，得到表达式的值是自减之后的值
var y = 1;
var z = y++ + 1; // 2 y++ 得到表达式的值是自增之前的值
var z = ++y + 1; // 3 ++y 得到表达式的值是自增之后的值
var z = y-- + 1; // 2 y-- 得到表达式的值是自减之前的值
var z = --y + 1; // 3 --y 得到表达式的值是自减之后的值
var n = 1;
			1	 3
var y = n + n++ * ++n; // 4 
// 运算原理
1. 从左到右依次查看
2. 如果遇到操作数，将数据的值直接取出
3. 如果遇到相邻的两个运算符，并且左边的运算符优先级大于等于右边的运算符，则直接运行左边的运算符
```

### 3. if判断

```js 
let x = 1;
if(!x) // 如果x没有被赋值
if(x++ >= 1) x++
else if (x++ >= 2) x++
else x--
consol.log(x); //3
```

### 4. 数组克隆

```js
let arr = [1, 2,3,4,5];
let arrCopy = arr.slice();  // 截取一段数据，产生一个新的数组
```

### 5. 输出数组中所有的素数

```js
let arr = [1, 3, 4, 5, 6, 7, 678, 7, 5, 6, 65, 465, 32, 154,];
const isPrime = (n) => {
    if (n < 2) return false;
    for(let i = 2; i < n -1; i++) {
        if (n % i === 0) return false;
    }
    return true;
}
```

### 6.斐波那数列

```js
// 斐波那数列
const fbn = n => (n === 1 || n === 2) ? 1 : fbn(n - 1) + fbn(n - 2);
console.log(fbn(8));
const fbn1 = max => {
    let a = 0, b = 1, arr = [0, 1];
    while(arr.length < max) {
        [a, b] = [b, a + b];
        arr.push(b);
    }
    return arr;
}
console.log(fbn1(10));
// generator实现原理,迭代器还原
const nameInterator = names => {
    let nextIndex = 0;
    return {
        next() {
            return nextIndex < names.length ?
                    {values: names[nextIndex++], done: false} :
                    {values: undefined, done: true}
        }
    }
}

const nameArray = ['kroea', 'wlp', 'ljh'];
const name = nameInterator(nameArray);
console.log(name.next());
console.log(name.next());
console.log(name.next());
console.log(name.next());

// generator原理实现
function* Age() {
    yield 10;
    yield 20;
    yield 30;
}
const age = Age();
console.log(age.next());
console.log(age.next());
console.log(age.next());
console.log(age.next());

//  id生成器
function* createId () {
    let index = Math.floor(Math.random() / 0.5);
    while(true) {
        yield index ++;
    }
}
const id = createId();
for (let i = 0; i < 100; i++) {
    console.log(id.next().value);
}
```

### 7.计算对角线之和

```js
let arr = [
    [1, 2, 3, 4, 5],
    [1, 3, 5, 7, 8],
    [3, 5, 7, 8, 7],
    [2, 3, 5, 6, 8]
];
let sum = 0;
for(let i = 0;i < arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
        if(i === j || i + j === arr[i].length -1) {
            sum += arr[i][j];
        }
    }
}
console.log(sum);
```

### 8.通用冒泡排序

```js
const sort = (arr，compare) => {
    if(!compare) {
        compare = (a, b) =>  {
            if(a > b) return 1;
            else if(a === b) return 0;
            else return -1;
        }
    }
    let temp = 0;
    for (let i = 0; i <= arr.length; i++) {
        for (let j = 0; j <= arr.length - i; j++) {
            if (compare(arr[j], arr[j+1]) > 0) {  // 升序 arr[j] < arr[j+1] 降序
                temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    return arr;
}
```

### 9. 求出数组中，出现频率最高的数

```js
/**
 * @method getTopFreqInArray
 * @param {number} arr
 * @return {Object} result
 */
const getTopFreqInArray = (arr) => {
    let records = {};
    for (let i = 0; i < arr.length; i++) {
        let n = arr[i];
        records[n] ? records[n]++ : (records[n] = 1);
    }
    let result;
    for (let prop in records) {
        if (!result || records[prop] > result.frequency) {
            result = {
                number: prop,
                frequency: records[prop]
            }
        }
    }
    return result;
};
```

### 10. 计算数组中的最大值最小值

```js
const getResult = (arr) => {
    let max = arr[0],
        min = arr[0],
        sum = 0,
        mean = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        mean = sum / arr.length;
        if (arr[i] > max) {
            max = arr[i]
        }
        if (arr[i] < min) {
            min = arr[i]
        }
    }
    return { min, max, mean }
};
```

### 11.文档注释

```js
/*方法说明
 *@method 方法名
 *@for 所属类名
 *@param{参数类型}参数名 参数说明
 *@return {返回值类型} 返回值说明
*/
```



### 12.判断一个数组是否是稀松数组

```js
const hasEmptyArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (!(i in arr)) return true
    }
    return false;
};
```

### 13.判断闰年

```js
// 四年一闰，百年不闰，四百年一闰
const isLaep = (year) => {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
}
```

### 14.获取用户输入年份月份对应的天数

```js
const idLeap = (year) => {
    return year % 4 === 0 && year % 100 !== 100 || year % 400 === 0
}
const isOdd = (n) => {
    return n % 2 !== 0;
};
const getDays = (year, month) => {
    if (month === 2) {
        return isLeap(year) ? 29 : 28;
    } 
    else if (month < 8 && isOdd(month) || month >= 8 && !isOdd(month)) {
           return 31    
    }
    return 30
}
```

### 15. 阶乘

```js
const jc = (n) => {
    if (n === 1) return 1
     return n * jc(n - 1)
}
```

### 16. valueOf

```js
let obj = {
    name: "korea",
    toString() {
      return "korea"  
    },
    valueOf() {
        return 123
    }
}
console.log(obj+1) // 124
// 如果调用了valueOf已经得到了原始类型，则不再调用toString方法
```

### 17. 返回随机最大值最小值

```js
const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}
```

### 18. 驼峰命名

```js
// 方法一
const bigCamel = (s) => {
    let	empty = " \t\r\n",
        result = "";
    for (let i = 0; i < s.length; i++) {
        if(!empty.includes(s[i])) {
            if (empty.includes(s[i-1]) || i === 0) {
                result += s[i].toUpperCase()
            } else {
                result += s[i]
            }
        }
    }
    return result;
}
//方法二

/** 字符串转换大小写
 * @method Camel
 * @param {string} str
 * @param {string} opt lower || upper
 * @return {string}
 */
const Camel = (str, opt) => {
    return str.split(" ")
        .filter(item => {
            return item.length > 0
        }).map(item => {
            return opt === "lower" ?
                item[0].toLowerCase() + item.substring(1) :
                item[0].toUpperCase() + item.substring(1)
        }).join(" ")
};
let lowerStr = "Javascript Is Language",
    upperStr = "javascript is language";
console.log(Camel(lowerStr, "lower"));
console.log(Camel(upperStr, "upper"));
```

### 19. 获取距离生日的时间

```js
const getBirth   = (montn, day) => {
    let now      = new Date(),
        year     = now.getFullYear(),
        // 今年的生日
        birthday = new Date(year, month - 1, day),
        dec      = birthday - dec,
        days     = dec / (24 * 60 * 60 * 1000);
    if (birthday < now) {
        // 今年生日已过。计算激励明年生日的时间
        birthday.setFullYear(now.getFullYear + 1)
    }
    return Math.ceil(days);
}
```

### 20.获取当前月每一天的星期

```js
const print    = () => {
    let now    = new Date(),
        y      = now.getFullYear(),
        m      = now.getMonth() + 1,
        days   = new Date(y, m, 0).getDate(),
        result = "";
    for(let i = 1;i < days; i++) {
        result += `${y}年${m}月${i}日,星期${new Date(y, m-1, i).getDay()}`
    }
    return result;
}
```

### 21. 得到创建object对象的构造名称

```js
function create () {
    if (Math.random() < 0.5) {
        return {};
    } else {
        return [];
    }
}
let obj = create(); // 得到创建obj对象的构造名称
console.log(obj.__proto__.constructor.name);

```

### 22. 字符串原型链上挂载函数

```js
String.protoType.camel = () => {
    return this.replace(/\b(\w)(\w*)\b/g, ($, $1, $2) => {
        return $1.toUpperCase() + $2;
    }).replace(/\s/g, "");
}
```

