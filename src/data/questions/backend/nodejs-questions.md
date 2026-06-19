# Node.js Interview Questions

## 1. How does Node.js handle concurrency despite being single-threaded?

**Simple Answer:**
It uses an Event Loop to offload I/O tasks to the system kernel or a thread pool.

**Detailed Example:**
When a Node.js app receives a database query, it sends the request to the libuv thread pool and continues handling other incoming HTTP requests. Once the database responds, the callback is placed in the event queue to be executed by the main thread, ensuring the server never blocks waiting for I/O.

---

## 2. What is the difference between `process.nextTick()` and `setImmediate()`?

**Simple Answer:**
`nextTick` fires before the event loop continues; `setImmediate` fires in the next cycle.

**Detailed Example:**
If you need to ensure a callback runs before any I/O events (like file reads) are processed, use **`process.nextTick()`**. However, be careful: recursive calls to `nextTick` can starve the I/O phase. Use **`setImmediate()`** when you want to break up a long-running CPU task to allow I/O to proceed in between chunks.

---

## 3. What is the purpose of the `package.json` file?

**Simple Answer:**
The manifest for a Node.js project containing metadata, dependencies, and scripts.

**Detailed Example:**
In a CI/CD pipeline, the `scripts` section (e.g., `"test": "jest"`) is used to automate testing. The `dependencies` vs `devDependencies` distinction ensures that production servers only install necessary runtime libraries, keeping the deployment image small and secure.

---

## 4. Explain the concept of Streams in Node.js.

**Simple Answer:**
Streams allow processing data in chunks rather than loading it all into memory at once.

**Detailed Example:**
When building a video streaming service, you would use **Readable Streams** to read a large video file from disk and **Writable Streams** to send it to the client. This allows the user to start watching the video immediately without waiting for the entire multi-gigabyte file to load into the server's RAM.

---

## 5. What is Middleware in the context of Express.js?

**Simple Answer:**
Functions that have access to the request/response objects and can execute code or end the cycle.

**Detailed Example:**
A common use case is an **Authentication Middleware** that checks for a valid JWT in the request header. If the token is invalid, it sends a 401 response immediately. If valid, it calls `next()`, passing control to the actual route handler. This keeps your route logic clean and focused on business rules.

---

## 6. What is the difference between `fork()` and `spawn()` in the `child_process` module?

**Simple Answer:**
*   **`fork()`:** A special case of `spawn()` used specifically for running new Node.js processes.
*   **`spawn()`:** Used to run any system command or executable.

**Detailed Example:**
Use **`fork()`** when you want to offload a heavy CPU calculation to another core while maintaining a communication channel (IPC) between the parent and child. Use **`spawn()`** when you need to run a shell command like `ffmpeg` to process a video file.

---

## 7. How do you prevent "Callback Hell" in Node.js?

**Simple Answer:**
By using Promises, Async/Await, or modularizing functions.

**Detailed Example:**
Instead of nesting multiple callbacks (which creates a pyramid of doom), you can chain **.then()** blocks or use **async/await** syntax. This makes the code look synchronous and much easier to read and debug.

---

## 8. What is the role of the `libuv` library in Node.js?

**Simple Answer:**
It is a C library that provides the asynchronous I/O and threading capabilities for Node.js.

**Detailed Example:**
While JavaScript handles the logic, **libuv** manages the thread pool (default size of 4) for tasks like file system I/O and DNS lookups. It also implements the Event Loop itself, polling the OS for completed I/O operations.

**Code Example:**
```javascript
// Using Streams for efficient file processing
const fs = require('fs');
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('copy-large-file.txt');

readStream.pipe(writeStream);

console.log('File copy started...');
writeStream.on('finish', () => {
  console.log('File copy completed.');
});
```
