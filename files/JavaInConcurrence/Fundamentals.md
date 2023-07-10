[toc]
# Thread Safety
* What's  Safety?
  

&emsp;&emsp;Safety depends on **single-threaded correctness** descriped by definition in a class. 

*  What's Thread Safety?

&emsp;&emsp;A calss is thread-safe if it behaves **correctly** when accessed from **multiple thread**.  
&emsp;&emsp;**Stateless**  objects are always thread-safe  
&emsp;&emsp;**read-modify-write** operation（like  increment） and 
        **check-then-act**  operation（like lazy   initialization） is not thread-safe   
&emsp;&emsp;**multiple** atomic operation is not thread-safe
&emsp;&emsp;**synchronized** can provide thread-safe producing liveness and performance problems. It needs to **divide operations** for the long-running operation is in progress concurrently.

# Sharing Object

## Visibility
* Stale Data
Because of JMM, one thread maybe see an **out-of-date vaule** in multiple thread application without synchronization.
* Non-atomic 64-bit Operation
The JVM is permitted to treat a 64-bit read or write as two 32-bit Operations.
* Locking and Visibility
Synchronization can guarantee visibility.
* Volatile variables
Volatile variables only can guarantee visibility and order

## Publication and Escape
* A Object can be **accessed shared** depends on it can be escaped when it is published.
  + 
* You can avoid impoper construction by using a **private constructor** and a **public factory method**.

## Thread Confinement

* Ad-hoc thread confinement: Implement a **particular subsystem**(single-threaded) to ensure confinement.
+ Stack confinement
    + For primitively typed local variables, the language semantics ensure it always stack confined.
    + For object references, it needs to ensure it can't be escaped by programming.
* Thread Local: It provides a sprarate **copy** of the value for each thread  that use it.

## Immutability
+ The necessary requirements
    + All its fileds are final
    + It is properly constructed(the reference does not esacape during construction)
    + Its state cannot be modified after construction

## Safe Publication
+ not require
    Immutable Objects
+ require
    + Mutable Objects
    + Effectively Immutable Objects （whose state will not be modified after publication）
+ Safe Publication Idioms(choose one)
    + Initializing an object reference from a **static initializer**
    + Storing a reference to it into a **volatile** filed or **AtomicReference**
    + Storing a reference to it into a **final** field of a **poperly constructed** object
    + Storing a reference to it into a feild is properly guarded by a **lock**
+ Sharing Objects Safely
    + Thread-confined
    + Shared read-only: Inmutable objects and effectively immutable objects with safe Publication
    + Shared thread-safe: A thread-safe object performs synchronized internally
    + Guarded: By a lock held
    
# Composing Object

## Designing a thread-safe Class
Three basic elements:
*  Identify the variables that form the object's state
*  Identify the invariants that constrain the state variables
*  Establish a policy for managing concurrent access to the object's state

Common situations:
*  **Invariants**(variable > 0) and **post‐conditions**( the next state is derived from the current state,the operation is necessarily a **compound** action)
*   **State-dependent Operations**：state‐based preconditions,for example, you cannot remove an item from an empty queue
*   **State Ownership**

## Instance Confinement
 a class that confines its state can be analyzed for
thread safety without having to examine the whole program.
* private lock object
* copy constructor or deepCopy

##  Delegating Thread Safety
* Delegating Thread Safety to a ConcurrentHashMap
* Delegating Thread Safety to Multiple Underlying State Variables

## Adding Functionality to Existing Thread-safe Classes
* Client-side Locking：Lock Thread-safe Classes,Not client method
* extends or cmposition

# Bulding Block
##  Synchronized Collections
When Client use synchronized collections,**accessing** collection's data when **collection** is modified by other thread simultaneously maybe throw exception.
* collection.get（ArrayIndexOutOfBoundsException）
* Iteration（Concurrentmodificationexception）
* Hidden Iterators(hashCode、equals)

## Concurrent Collections
 Further improve on the synchronized collection
classes by providing **iterators（the cpoy of collection）** that do not throw ConcurrentModificationException


## Blocking Queues
+ BlockingQueue
  + add、offer（awaitNanos）、put（await）
  + remove、poll（awaitNanos）、take （await）
  + element、peek（null）
+ BlockingDeque

&emsp;&emsp;A Deque is a double‐ended queue that allows efficient insertion and removal from both the head and the tail（as a queue or stack）

+  Blocking and Interruptible Methods

&emsp;&emsp;The put and take methods of BlockingQueue throw the checked InterruptedException

## Synchronizers
### Latches（CountDownLatch）
A latch is a synchronizer that can delay the progress of threads until it reaches its terminal state
### FutureTask
FutureTask also acts like a latch. Once a FutureTask enters the completed state, it stays in that state forever
### Semaphores
Counting semaphores are used to control the number of activities that can access a certain resource or perform a given action at the same time 
### Barriers(CyclicBarrier)
Barriers are similar to latches in that they block a group of threads until some event has occurred.**Latches are for waiting for events; barriers are for waiting for other threads**
