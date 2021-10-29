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

