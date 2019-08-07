# 易错题整理

### 1.  数值转换计算

```go
func main()  {
	var i1 int32 = 100
	var i2 int64
	var i3 int8
	i2 = int64(i1 + 20)  // 错误写法 i2 = i1 + 20
	i3 = int8(i1 + 40)  // i3 = i1 + 40
	fmt.Println("i1, i2, i3", i1, i2, i3)
}
```

### 2. 数值转换。数值溢出问题

```go
func main () {
    var i4 int32 = 12
	var i5 int8
	var i6 int8
	i5 = int8(i4) + 127  // 编译通过， 但会溢出
	i6 = int8(i4) + 128 // 编译不通过，超过 int8的最大取值范围
	fmt.Println("i4, i5, i6", i4, i5, i6)
}
```

### 3. 条件语句判断

```go
func main () {
    flag := true
    if flag == false {   // 报错 flag = false 
        // Golang中，条件语句中只能写表达式，不能直接赋值
        fmt.Println("通过")
    }
}
```

### 4. 全局变量定义

```go
var age int = 10
name := "korea"  => var name string name = "korea"
// 解析： 在函数外部，不能出现赋值语句，而上面的代码中，等价于后面两句，出现了赋值语句，编译会报错
func main () {
    fmt.Println(age)
    fmt.PRintln(name) // 编译报错
}
```

### 5. 函数封装打印金字塔

```go
func printPyramid (total int) {
	// 打印层数
	for i := 1; i <= total; i++ {
		// 打印空格
		for k := 1; k <= total - i; k++  {
			fmt.Print(" ")
		}
		// 打印*号
		for j := 1; j <= 2 * i - 1; j++ {
			fmt.Print("*")
		}
		fmt.Println()
	}
}
```

