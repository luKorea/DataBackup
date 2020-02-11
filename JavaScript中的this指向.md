# this指向

1. 元素绑定事件，方法中的this是当前操作的元素
* 方法名前面是否有点，有点，点前面是谁this就是谁，没有this是window(严格模式下是undefined)
* 构造函数执行,方法体中的this是当前类的一个实例