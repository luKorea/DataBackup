# JavaScript原型以及原型链

1. ###### 基础概念

   1. 所有的函数数据类型都天生自带一个属性：prototype（原型），这个属性的值是一个对象，浏览器会默认给它开辟一个堆内存
   2. 在浏览器给prototype开辟的堆内存中有一个天生自带的属性：constructor，这个属性存储的值是当前函数本身
   3. 每一个对象都有一个`__proto__`的属性，这个属性指向当前实例所属类的prototype（如果不能确定它是谁的实例，都是Object的实例）

2. ###### 进阶

   1. 在实际项目基于面向对象开发的时候(构造原型设计模式),我们根据需要,很多时候会重定向类的原型(让类的原型指向自己开辟的堆内存)
      1. [存在的问题]
         1. 自己开辟的堆内存中没有constructor属性,导致类的原型构造函数缺失（解决：自己手动在堆内存中增加constructor属性）
         2. 当原型重定向后，浏览器默认开辟的那个原型堆内存会被释放掉，如果之前已经存储了一些方法或者属性，这些东西都会丢失（所以：内置类的原型不允许重定向到自己开辟的堆内存，因为内置类原型上自带很多属性方法，重定向后都没了，这样是不被允许的）
            

3. 