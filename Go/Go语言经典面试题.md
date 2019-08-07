# 经典面试题

### 1.有两个变量A和B，不适用临时变量，交换他们的值

```go
// 方法一
var a int = 10
var b int = 20
b = b - a
a = b + b
fmt.Println(a, b)
// 方法二
var a int = 10
var b int = 20
a = a + b
b = a - b
a = a - b
fmt.Println(a, b)
```

### 2.斐波那契数

```go
// TODO 斐波那契数 1,1,2,3,5,8,13.... 后一个数是前两个数的和
// 思路 i ==1 || i == 2  n = 1,2
// i >= 3 f(n-1) + f(n-2)
func Fibonacci(n) int {
	if n == 1 || n == 2 {
		return 1
	} else {
		return Fibonacci(n - 1) + Fibonacci(n - 2)
	}
}

```

### 3.案例如果 main.go 和 utils.go  都含有  变量定义，init 函数时，执行的流程又是怎么样的呢？

![1564815021994](C:\Users\Korea\AppData\Roaming\Typora\typora-user-images\1564815021994.png)

### 4.打印金字塔

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

### 5. 打印九九乘法表

```go
func multiplicationTable(num1 int)  {
	for i := 1; i <= num1 ; i ++ {
		for j := 1; j <= i ; j++ {
			fmt.Printf("%v * %v = %v\t", j, i, j * i)
		}
		fmt.Println()
	}
}
```

### 6. 数组反转

```go
var arrays [5]int
	len := len(arrays)
	// 数组反转
	rand.Seed(time.Now().UnixNano()) // 生成随机时间，生成随机种子
	for i := 0; i < len; i++ {
		arrays[i] = rand.Intn(100) // 生成 0<=n<100
	}
	fmt.Println(arrays)
	temp := 0
	for i := 0; i < len / 2; i++  {
		temp = arrays[len - 1 - i]
		arrays[len - 1 - i] = arrays[i]
		arrays[i] = temp
	}
	fmt.Println(arrays)
```

### 7.斐波那数列

```go
斐波那契的数列形式:
arr[0] = 1; arr[1] = 1; arr[2]=2; arr[3] = 3; arr[4]=5; arr[5]=8
-----------------------------------------------------------------
func fbn(n int) ([] uint64)  {
	//声明一个切片
	fbnSlice := make([]uint64, n)
	fbnSlice[0] = 1
	fbnSlice[1] = 1
	// 错误处理
	defer func() {
		if err := recover(); err != nil {
			fmt.Println("您的代码有误，错误如下:", err)
		}
	}()
	for i := 2; i < n ; i ++ {
		fbnSlice[i] = fbnSlice[i - 1] + fbnSlice[i - 2]
	}
	return fbnSlice
}


```

### 8.二分查找

```go
func efcz(arr *[6]int, leftIndex int, rightIndex int, findValue int) {
	if leftIndex > rightIndex {
		fmt.Println("找不到")
		return
	}
	// 1. 先找到中间的值
	middle := (leftIndex + rightIndex)/2
	if (*arr)[middle] > findValue {
		// 2. 如果中间的值大于查找的值，说明我们查找的数在leftIndex middle - 1
		efcz(arr, leftIndex, middle-1, findValue)
	} else if (*arr)[middle] < findValue {
		// 3。 如果中间的值小于查找的值，查找的值在rightIndex middle + 1
		efcz(arr, middle+1, rightIndex, findValue)
	} else {
		fmt.Printf("找到了该值，值为%v", middle)
	}
}

```

### 9.冒泡排序

```go
func sort(arr *[6]int) {
	temp := 0
	for i := 0; i < len(*arr)-1; i++ {
		for j := 0; j < len(*arr)-1-i; j++ {
			if (*arr)[j] > (*arr)[j+1] {
				temp = (*arr)[j]
				(*arr)[j] = (*arr)[j+1]
				(*arr)[j+1] = temp
			}
		}
	}
	fmt.Println("排序后", *arr)
}
```

