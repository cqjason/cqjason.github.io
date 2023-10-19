[toc]
# Benifits of Threads
Threads can reduce  **development**  and **maintenance** costs and improve the  performance of application

## Exploiting  Multiple Processors
1. Why the Multiple Processor is appearing？

&emsp;&emsp;Because it gets  harder to scale up lock rate. It's better to put more processor on a single chip.

2.How to exploiting multiple processors?

&emsp;&emsp;**Parallel** : Program with  multiple active threads  can excute   simultaneous on  multiple processors

3.The another advantage of multiple threads

&emsp;&emsp;**Concurrence**: In a multiThreaded program，another thread  can still run while first thread is wating for I/O to complete.

##  Simplicity of Modeling
In the past，we did all task in a few threads. But now we use  many theads to decompose a complex task so that **a thread can perform one type of task**.
## Simplicity Handling Asynchronous Events
the **thread-per-client** model is more simple and it use **sychronous** I/O to make less error than **asynchronous** I/O in **single thread**
    
# Risks of Threads
## Safety Hazards
Safety means **nothing bad ever happens**. In the absence of sufficient synchronization, the ordering of operations  in multiple threads is **unpredictable**

## Liveness Hazards
Liveness means **something good eventually happens**. The failure state is permanently unable to **make forward** progress
    The issues raised by **deadlock**、**livelock**、**starvation**

## Performance Hazards
Performance means **something good happens quickly**. Frequently change active thread, it will increase perfomance costs like the follows:
* **saving and restoring execution context**
* **wasting cpu time on scheduling threads**
* **the cost of synchronization mechanisms**
    * inhibit complier optimization
    * invalidate memory caches
    * create synchronization traffic on shared memory bus


​    

