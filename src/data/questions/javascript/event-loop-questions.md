# JavaScript Event Loop Interview Questions

**Video Reference:** [JavaScript Visualized - Event Loop, Web APIs, (Micro)task Queue](https://www.youtube.com/watch?v=eiC58R16hb8&t=97s) by Lydia Hallie

---

## 1. What is the Event Loop in JavaScript?

**Answer:**
The Event Loop is a mechanism that allows JavaScript to perform non-blocking I/O operations despite being single-threaded. It continuously monitors the **Call Stack** and the **Callback Queues**. If the Call Stack is empty, it takes the first event from the queue and pushes it onto the Call Stack for execution.

**Key Components:**
*   **Call Stack:** Executes synchronous code.
*   **Web APIs:** Handles asynchronous tasks (timers, fetch, DOM events).
*   **Task Queue (Macrotask Queue):** Holds callbacks from `setTimeout`, `setInterval`, etc.
*   **Microtask Queue:** Holds callbacks from `Promises`, `queueMicrotask`, etc.

---

## 2. Explain the difference between Macrotasks and Microtasks.

**Answer:**
*   **Macrotasks (Task Queue):** Include `setTimeout`, `setInterval`, `setImmediate` (Node.js), I/O operations, and UI rendering. The Event Loop processes only **one** macrotask per cycle.
*   **Microtasks (Microtask Queue):** Include `Promise.then/catch/finally`, `queueMicrotask`, and `MutationObserver`. The Event Loop processes **all** microtasks in the queue before moving to the next macrotask or rendering.

**Execution Order:**
1. Execute all synchronous code on the Call Stack.
2. Execute all microtasks in the Microtask Queue.
3. Render UI (if necessary).
4. Execute one macrotask from the Task Queue.
5. Repeat.

---

## 3. What will be the output of the following code?

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');
```

**Output:**
```
1
4
3
2
```

**Explanation:**
1. `console.log('1')` and `console.log('4')` are synchronous and run immediately.
2. `setTimeout` callback is sent to the **Task Queue**.
3. `Promise.then` callback is sent to the **Microtask Queue**.
4. Once the stack is empty, the Event Loop prioritizes the **Microtask Queue**, so `3` is logged.
5. Finally, the **Task Queue** is processed, so `2` is logged.

---

## 4. How does `async/await` fit into the Event Loop?

**Answer:**
`async/await` is syntactic sugar over Promises. 
*   Code before the `await` keyword runs synchronously.
*   The `await` expression pauses the function execution and places the rest of the function into the **Microtask Queue**.
*   Once the awaited Promise resolves, the microtask is executed.

**Example:**
```javascript
async function asyncFunc() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}

console.log('Start');
asyncFunc();
console.log('End');

// Output: Start, A, End, B
```

---

## 5. Why is understanding the Event Loop important for performance?

**Answer:**
*   **Non-blocking I/O:** It allows the browser to remain responsive while waiting for network requests or timers.
*   **Avoiding Blocking:** Long-running synchronous code blocks the Event Loop, freezing the UI. Breaking tasks into smaller chunks using `setTimeout` or `requestIdleCallback` can help.
*   **Microtask Starvation:** If you keep adding microtasks (e.g., recursive `Promise.resolve().then()`), you can starve the macrotask queue and prevent UI updates or timers from running.

---

## 6. What is the role of Web APIs in the Event Loop?

**Answer:**
Web APIs are provided by the browser (not the JS engine) to handle tasks that would otherwise block the main thread. Examples include:
*   `setTimeout` / `setInterval`
*   `fetch` / `XMLHttpRequest`
*   DOM manipulation and events
*   `localStorage` / `sessionStorage`

When these tasks complete, they push their callbacks into the appropriate queue (Task or Microtask) to be picked up by the Event Loop.
