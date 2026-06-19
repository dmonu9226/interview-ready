# Core and Advanced Java Interview Questions

## 1. What is the difference between `==` and `.equals()` in Java?

**Simple Answer:**
`==` compares memory addresses; `.equals()` compares the actual content of objects.

**Detailed Example:**
When comparing two `String` objects, `==` will return `false` if they are different instances in the heap, even if they contain the same text. Using **`.equals()`** ensures you are comparing the character sequences. For custom objects like `User`, you must override `.equals()` and `hashCode()` to define what makes two users "equal" (e.g., having the same email ID).

---

## 2. Explain the concept of Multithreading and the `volatile` keyword.

**Simple Answer:**
Multithreading allows parallel execution; `volatile` ensures variables are read from main memory.

**Detailed Example:**
In a distributed caching system, a `volatile boolean isRunning` flag can be used to signal multiple threads to stop their background tasks. Without `volatile`, a thread might cache the value of `isRunning` in its local CPU cache and never see the update made by another thread, leading to a resource leak.

---

## 3. What is the difference between `HashMap` and `ConcurrentHashMap`?

**Simple Answer:**
`HashMap` is not thread-safe; `ConcurrentHashMap` allows safe concurrent access with high performance.

**Detailed Example:**
In a high-frequency trading application, multiple threads need to update stock prices simultaneously. Using a **`ConcurrentHashMap`** allows these updates to happen without locking the entire map (unlike `Collections.synchronizedMap`), preventing bottlenecks and ensuring data integrity during rapid market changes.

---

## 4. What are Java 8 Features you have used?

**Simple Answer:**
Lambda expressions, Stream API, Optional class, and Functional interfaces.

**Detailed Example:**
The **Stream API** is invaluable for processing large collections. For example, filtering a list of 100,000 transactions to find all amounts over $500 and summing them can be done in a single, readable line: `transactions.stream().filter(t -> t.getAmount() > 500).mapToDouble(Transaction::getAmount).sum()`.

---

## 5. How does Garbage Collection (GC) work in Java?

**Simple Answer:**
It automatically reclaims memory from objects that are no longer reachable by the application.

**Detailed Example:**
Modern JVMs use **Generational GC**. Most objects are created in the **Young Generation** (Eden space). When Eden fills up, a "Minor GC" occurs, moving surviving objects to Survivor spaces. Objects that survive several cycles are promoted to the **Old Generation**, where a "Major GC" (or Full GC) runs less frequently but takes longer. Tuning these generations is key for low-latency applications.

---

## 6. What is the difference between an Abstract Class and an Interface?

**Simple Answer:**
*   **Abstract Class:** Can have state (instance variables) and constructors; a class can only extend one.
*   **Interface:** Defines a contract (methods); a class can implement many.

**Detailed Example:**
Use an **Abstract Class** for a `Vehicle` base class that shares common state like `speed` or `fuelLevel`. Use an **Interface** like `Flyable` or `Swimmable` to add specific behaviors to different vehicle types without forcing a rigid hierarchy.

---

## 7. What is the purpose of the `transient` keyword?

**Simple Answer:**
It indicates that a field should not be serialized when the object is converted to a byte stream.

**Detailed Example:**
If you have a `User` object with a `password` field, you would mark it as **`transient`** so that it isn't saved to disk or sent over the network during serialization, providing a basic layer of security for sensitive data.

---

## 8. Explain the `final`, `finally`, and `finalize` keywords.

**Simple Answer:**
*   **`final`:** Makes a variable constant, a method un-overridable, or a class un-inheritable.
*   **`finally`:** A block in exception handling that always executes.
*   **`finalize`:** A method called by the GC before an object is destroyed (now deprecated).

**Detailed Example:**
You use **`final`** to create a constant like `PI = 3.14`. You use **`finally`** to ensure a database connection is closed even if an error occurs during a query. You should avoid **`finalize`** in modern Java in favor of `try-with-resources`.

**Code Example:**
```java
// Java 8 Stream Example
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

names.stream()
     .filter(name -> name.startsWith("A"))
     .map(String::toUpperCase)
     .forEach(System.out::println);

// Volatile Keyword Example
public class SharedTask {
    private volatile boolean running = true;

    public void stop() { running = false; }
    
    public void run() {
        while (running) { // Always reads from main memory
            // perform task
        }
    }
}
```
