

# Iterable

Iterable

+ iterator(): Iterator<T>

+ forEach(Consumer<? super T> action): void
+ spliterator(): Spliterator<T>

# Iterator

Iterator

+ hasNext(): boolean

+ next(): E
+ remove(): void
+ forEachRemaining(Consumer<? super E> action): void

# ListIterator

ListIterator<E> extends Iterator<E>

+ set(E e): void
+ add(E e): void 
+ hasPrevious(): boolean
+ previos(): E
+ nextIndex(): int
+ previousIndex(): int

# Collection

Collection<E> extends Iterable<E>

	+ size(): int
	+ isEmpty(): boolean
	+ add(Object o): boolean
	+ remove(Object o): boolean
	+ toArray(): Object[]

# ArrayList

## 继承关系

![image-20210329163711987](../image/image-20210329163711987.png)

## 重要结构

+ Itr implements Iterator<E>

+ ListItr extends Itr implements ListIterator<E>

+ SubList extends AbstractList<E> implements RandomAccess

+ ArrayListSpliterator<E> implements Spliterator<E>

+ field

  + transient Object[] elementData;
  + private int size;

+ function

  + ```java
    private void grow(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        // minCapacity is usually close to size, so this is a win:
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
    ```

  + ```java
    public int indexOf(Object o) {
        if (o == null) {
            for (int i = 0; i < size; i++)
                if (elementData[i]==null)
                    return i;
        } else {
            for (int i = 0; i < size; i++)
                if (o.equals(elementData[i]))
                    return i;
        }
        return -1;
    }
    ```

  + ```java
    public boolean remove(Object o) {
        if (o == null) {
            for (int index = 0; index < size; index++)
                if (elementData[index] == null) {
                    fastRemove(index);
                    return true;
                }
        } else {
            for (int index = 0; index < size; index++)
                if (o.equals(elementData[index])) {
                    fastRemove(index);
                    return true;
                }
        }
        return false;
    }
    
    private void fastRemove(int index) {
            modCount++;
            int numMoved = size - index - 1;
            if (numMoved > 0)
                System.arraycopy(elementData, index+1, elementData, index,
                                 numMoved);
            elementData[--size] = null; // clear to let GC do its work
        }
    ```

# Queue

Queue<E> extends Collection<E>

+ add(E):   true or Exception: (as specified by {@link Collection#add}), @throws IllegalStateException if the element cannot be added at this  time due to insertion restrictions

+ offer(E):   {@code true} if the element was added to this queue, else  {@code false}
+ remove(): E or NoSuchElementException
+ poll(): E
+ element(): E or NoSuchElementException
+ peek(): E

# LinkedList

## 继承关系

![image-20210330153448504](../image/image-20210330153448504.png)

## 重要结构

+ ListItr implements ListIterator<E>
+ class Node<E>
+ LLSpliterator<E> implements Spliterator<E>

+ field

  + transient int size = 0;
  + transient Node<E> first;
  + transient Node<E> last;

+ function

  + ```java
    private void linkFirst(E e) {
        final Node<E> f = first;
        final Node<E> newNode = new Node<>(null, e, f);
        first = newNode;
        if (f == null)
            last = newNode;
        else
            f.prev = newNode;
        size++;
        modCount++;
    }
    
    void linkLast(E e) {
            final Node<E> l = last;
            final Node<E> newNode = new Node<>(l, e, null);
            last = newNode;
            if (l == null)
                first = newNode;
            else
                l.next = newNode;
            size++;
            modCount++;
    }
    
     void linkBefore(E e, Node<E> succ) {
            // assert succ != null;
            final Node<E> pred = succ.prev;
            final Node<E> newNode = new Node<>(pred, e, succ);
            succ.prev = newNode;
            if (pred == null)
                first = newNode;
            else
                pred.next = newNode;
            size++;
            modCount++;
    }
    ```

  + ```java
    private E unlinkFirst(Node<E> f) {
        // assert f == first && f != null;
        final E element = f.item;
        final Node<E> next = f.next;
        f.item = null;
        f.next = null; // help GC
        first = next;
        if (next == null)
            last = null;
        else
            next.prev = null;
        size--;
        modCount++;
        return element;
    }
    
    private E unlinkLast(Node<E> l) {
        // assert l == last && l != null;
        final E element = l.item;
        final Node<E> prev = l.prev;
        l.item = null;
        l.prev = null; // help GC
        last = prev;
        if (prev == null)
            first = null;
        else
            prev.next = null;
        size--;
        modCount++;
        return element;
    }
    
    E unlink(Node<E> x) {
        // assert x != null;
        final E element = x.item;
        final Node<E> next = x.next;
        final Node<E> prev = x.prev;
    
        if (prev == null) {
            first = next;
        } else {
            prev.next = next;
            x.prev = null;
        }
    
        if (next == null) {
            last = prev;
        } else {
            next.prev = prev;
            x.next = null;
        }
    
        x.item = null;
        size--;
        modCount++;
        return element;
    }
    ```

  + ```java
    Node<E> node(int index) {
        // assert isElementIndex(index);
    
        if (index < (size >> 1)) {
            Node<E> x = first;
            for (int i = 0; i < index; i++)
                x = x.next;
            return x;
        } else {
            Node<E> x = last;
            for (int i = size - 1; i > index; i--)
                x = x.prev;
            return x;
        }
    }
    
     public int indexOf(Object o) {
            int index = 0;
            if (o == null) {
                for (Node<E> x = first; x != null; x = x.next) {
                    if (x.item == null)
                        return index;
                    index++;
                }
            } else {
                for (Node<E> x = first; x != null; x = x.next) {
                    if (o.equals(x.item))
                        return index;
                    index++;
                }
            }
            return -1;
        }
    ```

