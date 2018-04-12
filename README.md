# r-queue
r-queue是一个任务队列管理框架，可以将复杂细碎的业务流程，拆分成多个任务模块，通过组合不同的任务模块，完成复杂的操作。

## Queue
#### 如何使用Queue类
 ```js
import { Queue, Task, QueueTask } from 'r-queue'

// 实例化Queue
const queue  =  new Queue()

// 通过push方法向队列中添加任务

// push方法接收string，number，boolean三种基本类型的参数，参数的值会作为当前任务节点的返回值传递到下一个任务节点
queue.push(1)

// push方法接收Function类型的参数，Function类型的参数作为回调函数被调用，包含三个参数
// 1.req是queue的请求参数
// 2.res是queue的上一个任务的返回值，如果当前任务是queue中的第一个，则这个参数是queue的start方法的defaultRes参数值
// 3.next方法用来结束当前的任务，并触发下一个任务，可以通过next方法传递一个参数作为返回值，传递到下一个任务模块
// 4.error方法会结束整个队列的调用，并且抛出一个错误，可以通过catch方法捕获
queue.push((req, res, next, error) => {
  // res的值是1
  const res = queueData.getRes()
  next(2)
})

// push方法接受Task类型的对象，这种类型的参数和直接传入Function类型的参数是等价的
queue.push(new Task((req, res, next, error) => {
	// res的值是2
	const res = queueData.getRes()
	next(3)
}))

// push方法接受Queue类型的对象

const queue2 = new Queue()
queue2.push(1)

queue.push(new QueueTask(queue2, (req, res, next) => {
  // next函数的参数会作为调用queue2的start方法的参数
  next('x', 'y')
}))



// 调用queue的start方法，可以触发一个队列的执行
queue.start(req, defaultRes).then((res) => {
  // output:2
  console.log(res)
}).catch(error => {
  // 处理错误
})

```
 ## Task
 Task类是所有任务的基类，Task的构造函数接受一个函数类型的构造函数，最为回调函数。

## QueueTask
QueueTask继承自Task，可以将一个定义好的Queue实例转换为Task实例，可以达到Queue复用的目的。

```js
import { Queue, QueueTask } from 'r-queue'

// 实例化Queue类，作为子队列
const childQueue = new Queue()

// 向队列中添加任务
childQueue.push(1)


// 实例化Queue类
const queue  =  new Queue()

// 向队列中添加队列任务
queue.push(new QueueTask(childQueue, (req, res, next) => {
  next(2, 3)
}))

// 调用queue的start方法，可以触发一个队列的执行
queue.start().then((res) => {
  // output:1
  console.log(res)
}).catch(error => {
  // 处理错误
})

```
## ConditionalTask
所有流程控制任务的基类，控制队列的执行流程，不会影响数据的传递

## 流程控制Task

 - If
 - Else
 - ElseIf
 - EndIf

```js
import { Queue, If, Else, ElseIf, EndIf } from 'r-queue'

// 实例化Queue
const queue  =  new Queue()

// 会被执行
queue.push(1)

queue.push(new If(true))

// 会被执行
queue.push(2)

queue.push(new Else())

// 不会执行
queue.push(3)

queue.push(new EndIf())

// 会被执行
queue.push(4)

// 开始队列
queue.start().then(res => {
  //  output:4
  console.log(res)
})

```

## Installation

`npm install r-queue`


## MIT Licenced
