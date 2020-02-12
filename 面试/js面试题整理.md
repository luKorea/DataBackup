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

23. #### 获取页面中指定ID得所有标签，需要兼容所有浏览器

    ```javascript
    let queryGetAllId = (id) => {
        let nodeList = document.getElementsByTagName('*'),
            ary = [];
        for (let i = 0; i < nodeList.length; i++) {
            const idElement = nodeList[i];
            idElement.id === id ? ary.push(idElement) : null;
        }
        return ary;
    };
    
    ```

24. ##### 变量及其作用域

    ```javascript
    console.log(a, b); // undefined undefined
    var a = 10,
        b = 11;
    function f() {
        console.log(a, b); // undefined 11
        var a = b = 12;
        console.log(a, b); // 12 12
    }
    f();
    console.log(a, b); // 10 12
    ```

25. ##### 条件判断下的变量提升

    ```javascript
    f = function () {return true;};//=>window.f=...（TRUE）
    g = function () {return false;};//=>window.g=...（FALSE）
    ~function () {
        /*
         * 变量提升：
         *   function g;  //=>g是私有变量
         */
        if (g() && [] == ![]) {//=>Uncaught TypeError: g is not a function （此时的g是undefined）
            //=>[]==![]：TRUE
            f = function () {return false;};//=>把全局中的f进行修改 window.f=...（FALSE）
            function g() {return true;}
        }
    }();
    console.log(f());
    console.log(g());
    ```

26. ##### 变量重命名

    ```javascript
    /**
     * 1.带VAR和FUNCTION关键字声明相同的名字，这种也算是重名了（其实是一个FN，只是存储值的类型不一样）
     * 2. 关于重名的处理：如果名字重复了，不会重新的声明，
     * 但是会重新的定义（重新赋值）[不管是变量提升还是代码执行阶段皆是如此]
     */
    fn(); // 4
    function fn() {console.log(1)}
    fn(); // 4
    function fn() {console.log(2)}
    fn(); // 4
    var fn = 100;
    function fn() {console.log(3)}
    fn(); // fn is not a function
    function fn() {console.log(4);}
    fn();
    ```

23. ##### 全局变量与私有变量

    ```javascript
    var arr = [10, 20];
    function f(arr) {
        console.log(arr); // [10, 20]
        arr[0] = 30; // 修改全局的
        arr = [40]; // 修改的是局部的变量，与全局无关
        arr[0] = 0;
        console.log(arr);// [0]
    }
    f(arr);
    console.log(arr); // [30 ,20]
    ```

24. 查找上级作用域

    ```javascript
    /*
     * 当前函数执行，形成一个私有作用域A，A的上级作用域是谁，和他在哪执行的没有关系，和他在哪创建（定义）的有关系，在哪创建的，它的上级作用域就是谁
     */
    /*
    var a = 12;
    function fn() {
        //=>arguments:实参集合
        //=>arguments.callee:函数本身FN
        //=>arguments.callee.caller:当前函数在哪执行的,CALLER就是谁(记录的是它执行的宿主环境),在全局下执行CALLER的结果是NULL
        console.log(arguments.callee.caller);
    }
    function sum() {
        var a = 120;
        fn();
    }
    function aa() {
        fn();
    }
    aa();
    */
    
    var n = 10;
    function fn() {
        var n = 20;
        function f() {
            n++;
            console.log(n);
        }
        f();
        return f;
    }
    var x = fn();
    x();
    x();
    console.log(n);
    ```

25. ##### 堆栈内存释放

    ```javascript
    /*
     * JS中的内存分为堆内存和栈内存
     *   堆内存：存储引用数据类型值（对象：键值对  函数：代码字符串）
     *   栈内存：提供JS代码执行的环境和存储基本类型值
     *
     * [堆内存释放]
     *   让所有引用堆内存空间地址的变量赋值为null即可（没有变量占用这个堆内存了，浏览器会在空闲的时候把它释放掉）
     *
     * [栈内存释放]
     *   一般情况下，当函数执行完成，所形成的私有作用域（栈内存）都会自动释放掉（在栈内存中存储的值也都会释放掉），但是也有特殊不销毁的情况：
     *   1.函数执行完成，当前形成的栈内存中，某些内容被栈内存以外的变量占用了，此时栈内存不能释放（一旦释放外面找不到原有的内容了）
     *   2.全局栈内存只有在页面关闭的时候才会被释放掉
     *   ...
     *   如果当前栈内存没有被释放，那么之前在栈内存中存储的基本值也不会被释放，能够一直保存下来
     */
    
    var i = 1;
    function fn(i) {
        return function (n) {
            console.log(n + (++i));
        }
    }
    var f = fn(2); 
    f(3); // f(2)(3) = 3 + 3 = 6; i = 3;
    fn(5)(6); // f(5)(6) = 6+6 = 12; i = 6;
    fn(7)(8); // f(7)(8) = 8 + 8 = 16; i = 8;
    f(4); // 4+4 = 8
    ```

26. ##### 闭包的两种形式

    ```javascript
    /*
     * [闭包]
     *   =>函数执形成一个私有的作用域，保护里面的私有变量不受外界的干扰，这种保护机制称之为“闭包”
     *
     *   =>市面上的开发者认为的闭包是：形成一个不销毁的私有作用域（私有栈内存）才是闭包
     */
    
    // 柯里化函数
    function fn () {
        return function() {
            
        }
    }
    var f = fn();
    
    // 惰性函数
    var utils = (function () {
        return {
            
        }
    })();
    //=>闭包项目实战应用
    //==>真实项目中为了保证JS的性能（堆栈内存的性能优化），应该尽可能的减少闭包的使用（不销毁的堆栈内存是耗性能的）
    //1.闭包具有“保护”作用：保护私有变量不受外界的干扰
    //> 在真实项目中，尤其是团队协作开发的时候，应当尽可能的减少全局变量的使用，以防止相互之前的冲突（“全局变量污染”），那么此
    //2.闭包具有“保存”作用：形成不销毁的栈内存，把一些值保存下来，方便后面的调取使用
    ```

    

31. 获取数组中的最大值

    ```javascript
    /**
     * @description 获取数组中的最大值
     */
    
    let arr = [1, 2, 33, 44, 66, 77, 88, 55, 100];
    
    // 方法一 通过数组排序，从大到小，第一位就是最大值
    let max = arr.sort((a, b) => b - a)[0];
    console.log(max);
    
    // 方法二 假设法
    let max1 = arr[0];
    arr.forEach(item => (item > max1)? max1 = item : null);
    console.log(max1);
    
    // 方法三 Math.max()
    let max3 = Math.max(...arr); // 100 88 77 66 55 44 33 2 1
    let max4 = eval(`Math.max(${arr.toString()})`);
    let max5 = Math.max.apply(null, arr);
    console.log(max3, max4, max5);
    ```

32. 随机打乱数组

    ```javascript
    let arr = [11,1,3,4,5,6,7,8,5,343,43,423,43,43,43];
    
    arr.sort((a, b) => {
        return Math.round(Math.random() * 10 - 5);
    });
    
    console.log(arr);
    ```

33. 