# <u>JavaScript 设计模式</u>

1. ###### 单例模式  `Singleton Pattern`

   1. 表现形式

      > let nameSpace = { xxx : xxx };

   2. 作用

      >  把描述同一件事务的属性和特征进行"分组，归类"（存储在同一个堆内存中），避免全局变量之间的冲突和污染

   3. 高级单例模式

      - > 在给命名空间赋值的时候，不是直接赋值一个对象，而是先执行匿名函数，形成一个私有作用域AA（不销毁的栈内存），在AA中创建一个堆内存，把堆内存地址赋值给命名空间

      - > 这种模式的好处：我们完全可以在AA中创造很多内容（变量OR函数），哪些需要供外面调取使用的，我们暴露到返回的对象中（模块化实现的一种思想）

      - ```javascript
        let nameSpace = (() => {
            function f() {}
            return {
                f
            }
        })();
        ```

2. ###### 工厂模式  `Factory Pattern`

   1. 表现形式

      > let createPerson = (name, age) => ({name, age});
      > let p1 = createPerson('korea', 20),
      >      p2 = createPerson('demo', 21);
      > console.log(p1, p2);

   2. 作用

      > - 1.把实现相同功能的代码进行“封装”，以此来实现“批量生产”（后期想要实现这个功能，我们只需要执行函数即可）
      > - 2.“低耦合高内聚”：减少页面中的冗余代码，提高代码的重复使用率

3. ###### 构造函数模式  `constructor Pattern` 

   1. 表现形式

      > ​	function Fn(name, age) {
      >
      > ​			let n  = 10;
      >
      > ​			this.name = name;
      >
      > ​			this.age = age;	
      >
      > ​	}
      >
      > ​	let f = new Fn('kroea', 20);

   2. 作用, 以及运行机制

      ![image-20200210141313139](C:\Users\64394\AppData\Roaming\Typora\typora-user-images\image-20200210141313139.png)

4. ###### 原型链设计模式  `prototype Pattern` 

   1. 概括

      - 原型（prototype）、原型链（__proto__）
      - [函数]
        *    普通函数、类（所有的类:内置类、自己创建的类）
      - [对象]
        - 普通对象、数组、正则、Math、arguments...
        - 实例是对象类型的(除了基本类型的字面量创建的值)
        - prototype的值也是对象类型的
        - 函数也是对象类型的

   2. `运行机制`

      >+ 所有的函数数据类型都天生自带一个属性：prototype（原型），这个属性的值是一个对象，浏览器会默认给它开辟一个堆内存
      >+ 在浏览器给prototype开辟的堆内存中有一个天生自带的属性：constructor，这个属性存储的值是当前函数本身
      >+ 每一个对象都有一个`__proto__`的属性，这个属性指向当前实例所属类的prototype（如果不能确定它是谁的实例，都是Object的实例）

   3. 原理图

      ![image-20200210151506445](C:\Users\64394\AppData\Roaming\Typora\typora-user-images\image-20200210151506445.png)

   4. 案例

      ```javascript
      function Fn() {
          var n = 100;
          this.AA = function () {
              console.log(`AA[私]`);
          };
          this.BB = function () {
              console.log(`BB[私]`);
          };
      }
      Fn.prototype.AA = function () {
          console.log(`AA[公]`);
      };
      
      var f1 = new Fn;
      var f2 = new Fn;
      
      console.log(f1.n);
      ```

      ![image-20200210152033867](C:\Users\64394\AppData\Roaming\Typora\typora-user-images\image-20200210152033867.png)

5. ....

