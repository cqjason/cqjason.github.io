[toc]

# Task Execution

## Executing Tasks in Threads

Choosing good task boundaries(**inpendence and small**), coupled with a sensible task **execution policy**, can help achieve goals(**good throughput and responsiveness**)

### Executing Tasks  Sequentially

Sequential processing is **simple and theoretically correct**, but would perform **poorly** in production because it can handle only one request at a time, it **rarely** provides either good throughput or good responsiveness.

### Explicitly Creating Threads For Tasks

three main consequences:

* Task processing is **offloaded** from the mian thread, enabling new connections to be accetped before previous requests complete, improving **responsiveness**
* Task can be processed in **parallel**, enabling multiple requests to be serviced simultaneously, improving througput
* Task-handing code must be thread-safe

### Disadvantages of  Unbounded Thread Creation

If you have enough threads to keep all the CPUs busy, creating more threads won't help and may even hurt

When there are more runable threads than available porcessors, threads sit idle. Having many idle threads can **tie up a lot of memory**, putting pressure on the **garbage collector**, and having many threads **competing for the CPUs** can impose other performance costs as well

## The Executor Framework

Executor:

* supports a wide variety of task excution policies 
* decopule task submission from task execution (producer-consumer pattern: submit task are producers, (Threads) execute tasks are consumer)
* provide lifecycle support and hooks for statistics gathering, application management, and monitoring

### Execution Policies

* In what **thread** will tasks be executed?
* In what **order** should tasks be executed(FIFO, LIFO, priority order)?
* How many task may execute **concurrently**?
* How many task may be queued **pending** execution?
* If a task has to be **rejected** the system is overloaded, which task should be selected as the victim, and how should the the application be **notified**?
* What **actions** should be taken before or after executing task?

### Thread Pools

newFixedThreadPool、newCachedThreadPool、newSingleThreadExecutor、newScheduledThreadPool

### Executor Lifecycle

**ExecutorService** provide lifecycle support, including three states:

* running: initially created
* shutting down: 
  + shutdown: initiates a graceful shutdown: **no new tasks** are accepted but **previously submitted** tasks are allowed to comlete(including those that have not yet begun execution)
  + shutdownNow: initiates an abrupt showtdown: it attempts to **cancel** outsatanding tasks and **does not start** any tasks that are queued but not begun

* terminated: Once all tasks have **completed**, the ExecutorService transitions to  the terminated state( **isTerminated**()、**awaitTerminatoin**() )

## Finding Exploitable Parallelism

### Callable and Future

Callable expects that the main entry point, will **return a value** and anticipates that it might **throw a exception**

Future represents the lifecycle of a task and provides methods to test the task has **completed** or been **cancelled**, **retrieve** its result, and **cancel** the task

### ExecutorCompletionService

ExecutorCompletionService combines the functionality of an **Executor** and a **BlockingQueue**. You can submit **Callable tasks** to it for execution and use the queue-like methods **take** and **poll** to retrieve completed results.

### Placing Time Limits on Tasks

The primary challenge in executing tasks within a time budget is making sure that you don't wait longer than the time budget to get an answer or find out that one is not forthcoming (**Time version** of Future.**get** supports this requirement)

A secondary problem when using timed tasks is to stop them when the run out of time (Future.**cancell** can help)

# Cancellation and ShutDown

Dealing well with failure, shutdown, and cancellation is one of the characteristics that distinguish a well-behaved application from one that merely works

## Task Cancellation

Some cases: User-requested cancellation、 Time-limited activities、Application events、Errors、Shutdown

A task that wants to be cancellable must have a cancellation policy:

* How: how other code can request cancellation
* When: when the task checks whether cancellation has been requested
* What: what actions the task takes in response to a cancellation request