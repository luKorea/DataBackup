# this指向

1. ###### 原理

   + 元素绑定事件，方法中的this是当前操作的元素
   + 方法名前面是否有点，有点，点前面是谁this就是谁，没有this是window(严格模式下是undefined)
   + 构造函数执行,方法体中的this是当前类的一个实例

2. ###### 改变某一个函数this指向

   1. `call`

      1. 基本语法

         > [fn].call([this],[param]...)
         >
         > fn1.call(fn2); // fn1 执行
         >
         > fn1.call.call(fn2);. // fn2 执行

      2. 运行原理

         > + fn.call：当前实例(函数FN)通过原型链的查找机制，找到Function.prototype上的call方法  =>function call(){[native code]}
         >
         >  *   fn.call()：把找到的call方法执行
         >       *   当call方法执行的时候，内部处理了一些事情, 首先把要操作函数中的THIS关键字变为CALL方法第一个传递的实参值
         >       *   把CALL方法第二个及第二个以后的实参获取到
         >       *   把要操作的函数执行，并且把第二个以后的传递进来的实参传给函数

      3. **call中的细节**

         1.  非严格模式下，如果参数不传，或者第一个传递的是null/undefined，THIS都指向WINDOW
         2.  在严格模式下，第一个参数是谁，THIS就指向谁（包括null/undefined），不传THIS是undefined

         ```javascript
         "use strict";
         let fn = function (a, b) {
             console.log(this);
         };
         let obj = {name: "OBJ"};
         // document.onclick = fn;//=>把FN绑定给点击事件，点击的时候执行FN
         // document.onclick = fn();//=>在绑定的时候,先把FN执行,把执行的返回值(UNDEFINED)绑定给事件,当点击的时候执行的是undefined
         //=>需求：点击的时候执行FN，让FN中的THIS是OBJ
         // document.onclick = fn;//=>this:document
         // document.onclick = fn.call(obj);//=>虽然this确实改为obj了，但是绑定的时候就把fn执行了(call是立即执行函数)，点击的时候执行的是fn的返回值undefined
         // document.onclick = fn.bind(obj);//=>bind属于把fn中的this预处理为obj，此时fn没有执行，当点击的时候才会把fn执行
         
         /*
          * CALL中的细节
          */
         // fn.call(obj, 10, 20);//=>this:obj a=10 b=20
         // fn.call(10, 20);//=>this:10 a=20 b=undefined
         // fn.call();//=>this:window a=undefined b=undefined
         // fn.call(null);//=>this:window
         // fn.call(undefined);//=>this:window
         ```

      4. 代码示例

         ```javascript
         window.name = '珠峰';
         let fn = function () {
             console.log(this.name);
         };
         let obj = {
             name: "OBJ",
             fn: fn
         };
         let oo = {name: "OO"};
         // fn();//=>this:window "珠峰"
         // obj.fn();//=>this:obj "OBJ"
         // fn.call(oo);//=>this:oo
         // fn.call(obj,10,20,30);//=>this:obj
         
         /*Function.prototype.call = function () {
             let param1 = arguments[0],
                 paramOther = [];//=>把ARG中除了第一个以外的实参获取到
         
             //=>this:fn 当前要操作的函数(函数类的一个实例)
             //把FN中的THIS关键字修改为PARAM1 =>把THIS(CALL中)中的this关键字修改为param1
         
             //=>把fn执行，把paramOther分别传递给fn
             // this(paramOther)  =>fn(paramOther)
         };
         fn.call({name:'xx'})
         sum.call({..})
         */
         
         
         let sum=function(a,b){
             console.log(this);//=>opt
         };
         let opt={n:20};
         
         // sum.call(opt,20,30);//=>call执行 call中的this是sum  把this(call中的)中的“this关键字”改为opt 把this(call中的)执行，把20,30分别传递给它 //=>sum中this:opt  a=20 b=30
         
         sum.call.call(opt)
         //1.sum.call 找到Function.prototype上的call方法(也是一个函数，也是函数类的一个实例，也可以继续调用call/apply等方法)  =>A（函数）
         //2.A.call(opt)  继续找到原型上的call方法，把call方法执行：把A中的this关键字修改为opt，然后把A执行
         ```

      5. 面试题

         ```javascript
         function fn1(){console.log(1);}
         function fn2(){console.log(2);}
         fn1.call(fn2);//=>找到CALL-AA把它执行,CALL-AA中的THIS是FN1,第一个参数传递的是FN2  =>在CALL-AA中执行的是FN1 =>1
         
         fn1.call.call(fn2);//=>找到CALL-AA让它执行,CALL-AA中的THIS是FN1.CALL,第一个参数是FN2  (把FN1.CALL中的THIS变为FN2，再让FN1.CALL执行  =>先找到CALL-AA，把它执行，只不过此时它中的THIS是FN2 =>让FN2中的THIS变为UNDEFINED，因为执行FN1.CALL的时候没有传递参数值，然后让FN2执行)  =>2
         
         Function.prototype.call(fn1);//=>先找到CALL-AA把它执行，它中的THIS是Function.prototype =>让F.P中的THIS变为FN1,然后让F.P执行,F.P是一个匿名函数也是一个空函数，执行没有任何的输出
         
         Function.prototype.call.call(fn1);//=>先找到CALL-AA把它执行，它中的THIS是F.P.CALL =>把F.P.CALL中的THIS修改为FN1,让F.P.CALL执行  =>F.P.CALL(CALL-AA)第二次把它执行(此时它里面的THIS已经是FN1) =>这一次其实在CALL-AA中是让FN1执行 =>1
         //<==> fn1.call.call(fn2)
         //<==> fn1.call===Function.prototype.call ：true
         
         fn1.call.call.call.call.call(fn2);
         //=>fn1.call.call.call.call===Function.prototype.call
         ```

         

   2. `apply`

      1. 基本语法

         > + 与call基本一致唯一区别在于传参方式不同
         >   + fn.apply(obj,[10,20]) APPLY把需要传递给FN的参数放到一个数组（或者类数组）中传递进去，虽然写的是一个数组，但是也相当于给FN一个个的传递

   3. `bind`

      1. 基本语法

         > + 语法和call一模一样，唯一的区别在于立即执行还是等待执行
         >   + fn.call(obj,10,20) 改变FN中的THIS, 并且把FN立即执行
         >   *   fn.bind(obj,10,20) 改变FN中的THIS, 此时的FN并没有执行（不兼容IE6~8）

3. 括号表达式

   1.  用小括号包起来，里面有很多项（每一项用逗号分隔），最后只获取最后一项的内容（但是会把其它的项也都过一遍）

      ```javascript
       (function(){
           console.log(1);
       },function(){
           console.log(2);
       })();
       //=>2
      
       let a=1===1?(12,23,14):null;
       //=>a=14
      
      let fn=function(){console.log(this);}
      let obj={fn:fn};
      (fn,obj.fn)(); //=>执行的是第二个OBJ.FN，但是方法中的THIS是WINDOW而不是OBJ
      (obj.fn)(); //=>this:obj
      ```

   2. 不建议大家过多使用括号表达式，因为会改变THIS

4. 