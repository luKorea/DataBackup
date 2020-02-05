###### setState()更新状态的2种写法

1. setState(updater, [callback]),
           updater为返回stateChange对象的函数: (state, props) => stateChange
           接收的state和props被保证为最新的
2. setState(stateChange, [callback])
           stateChange为对象,
           callback是可选的回调函数, 在状态更新且界面更新后才执行
3.  总结:
           对象方式是函数方式的简写方式
               如果新状态不依赖于原状态 ===> 使用对象方式
               如果新状态依赖于原状态 ===> 使用函数方式
           如果需要在setState()后获取最新的状态数据, 在第二个callback函数中读取

###### setState()更新状态是异步还是同步的?

1. 执行setState()的位置?
             在react控制的回调函数中: 生命周期勾子 / react事件监听回调
             非react控制的异步回调函数中: 定时器回调 / 原生事件监听回调 / promise回调
2.  异步 OR 同步?
             react相关回调中: 异步
             其它异步回调中: 同步

######   关于异步的setState()

1. ​      多次调用, 如何处理?
   ​          setState({}): 合并更新一次状态, 只调用一次render()更新界面 ---状态更新和界面更新都合并了
   ​          setState(fn): 更新多次状态, 但只调用一次render()更新界面  ---状态更新没有合并, 但界面更新合并了
2. 如何得到异步更新后的状态数据?
             在setState()的callback回调函数中 

###### 面试题

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>03_setState()面试题</title>
</head>
<body>

<div id="example"></div>

<script type="text/javascript" src="./js/react.development.js"></script>
<script type="text/javascript" src="./js/react-dom.development.js"></script>
<script type="text/javascript" src="./js/babel.min.js"></script>

<script type="text/babel">
  class StateTest extends React.Component {

    state = {
      count: 0,
    }

    componentDidMount() {
      this.setState({count: this.state.count + 1})
      this.setState({count: this.state.count + 1})
      console.log(this.state.count) // 2 ==> 0

      this.setState(state => ({count: state.count + 1}))
      this.setState(state => ({count: state.count + 1}))
      console.log(this.state.count) // 3 ==> 0

      setTimeout(() => {
        this.setState({count: this.state.count + 1})
        console.log('timeout', this.state.count) // 10 ==> 6

        this.setState({count: this.state.count + 1})
        console.log('timeout', this.state.count) // 12 ==> 7
      }, 0)

      Promise.resolve().then(value => {
        this.setState({count: this.state.count + 1})
        console.log('promise', this.state.count)  // 6 ==>4

        this.setState({count: this.state.count + 1})
        console.log('promise', this.state.count) // 8 ==> 5
      })
    }

    render() {
      const count = this.state.count
      console.log('render', count)  // 1 ==> 0   4 ==>3   5 ==>4  7 ==>5  9 ==>6  11 ==>7
      return (
        <div>
          <p>{count}</p>
        </div>
      )
    }
  }

  ReactDOM.render(<StateTest/>, document.getElementById('example'))

</script>
</body>
</html>



```

