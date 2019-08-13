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

// 斐波那数列生成器
func fibonacci() func() int {
    a, b := 0, 1
    return func() int {
        a, b := b, a+b
        return a
    }
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

### 10. channel管道

```go
type Student struct {
    Name string
    Age int
}
func main() {
    Chan := make(chan interface{}, 3)
    Chan <- 10
    Chan <- "demo"
    student := Student{"korea", 20}
    Chan <- student
    // 获取管道中第三个队列的数据，不能直接获取，要先推出前面的数据
    stu := <-Chan
    fmt.Println(stu) // 会报错，取不到值
    <- Chan
    <- Chan
    s := <-Chan
    stu1 := s.(Student) // 类型断言，获取字段
    fmt.Println(stu1.Name, stu1.Age) // 可以获取到值
    
}
```

### 11. const常量

```go
const (
	a = Itoa
    b
    c
)
fmt.Println(a, b, c) // a = 0, b = 1, c = 2 依次递增
const (
	a = Itoa
    b = Itoa
    c, d = Itoa, Itoa
)
fmt.Println(a,b,c,d) // a=0,b=1,c=2,d=2  同一行中，只依次递增一次，同一行的变量不会递增赋值
```

### 12. 计算字节的长度

```go 
func Bytes() {
	const (
		b = 1 << (10 * iota)
		kb
		mb
		gb
		tb
		pb
	)
	fmt.Println(b, kb, mb, gb, tb, pb)
	// 1 1024 1048576 1073741824 1099511627776 1125899906842624

}
```

### 13. 十进制转二进制函数

```go
func convertToBin (n int) string {
    result := ""
    for ; n > 0; n /= 2 {
        result += strconv.Itoa(n % 2) 
    }
    return result
}
```

### 14.读取文件

```go
func printFile(fileName string) {
	file, err := os.Open(fileName)
	if err != nil {
		panic(err)
	}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
}
```

### 15.队列

```go
package main
type Queue []interface{}
func (q *QUeue) Push(v interface{}) {
    *q = append(*q, v)
}
func (q *Queue) Pop() interface{} {
    head := (*q)[0]
    *q = (*q)[1:]
    return head
}
func (q *Queue) IsEmpty() bool {
    return len(*q) == 0
}
```



