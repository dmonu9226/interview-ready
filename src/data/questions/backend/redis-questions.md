# Redis Interview Questions

## 1. What is Redis and what are its primary use cases?

**Simple Answer:**
An in-memory data store used for caching, session management, and real-time messaging.

**Detailed Example:**
In a high-traffic e-commerce site, **Redis** is used to cache product details and user sessions. This reduces the load on the primary SQL database by 80% and ensures that page loads remain under 100ms even during flash sales.

---

## 2. What are the main data structures supported by Redis?

**Simple Answer:**
Strings, Lists, Sets, Sorted Sets, Hashes, and Bitmaps.

**Detailed Example:**
A gaming leaderboard uses **Sorted Sets (ZSets)** where the player ID is the member and their score is the sorting key. This allows for efficient retrieval of the "Top 10 Players" using `ZRANGE` without having to sort millions of records in the application layer.

---

## 3. How does Redis handle persistence?

**Simple Answer:**
It uses RDB snapshots for periodic backups and AOF logs for every write operation.

**Detailed Example:**
For a financial transaction system, you would enable **AOF (Append Only File)** with the `everysec` policy. This ensures that even if the server crashes, you lose at most one second of data. **RDB** can be used concurrently for daily backups to cold storage like S3.

---

## 4. What is the difference between Redis Cache-aside and Write-through patterns?

**Simple Answer:**
Cache-aside loads data on demand; Write-through updates both cache and DB simultaneously.

**Detailed Example:**
**Cache-aside** is preferred for read-heavy applications (like a news feed) because it only caches data that is actually requested. **Write-through** is better for systems requiring strict consistency, such as inventory management, where the cache must never show a stock count that differs from the database.

---

## 5. How does Redis achieve high performance?

**Simple Answer:**
By storing everything in RAM and using a single-threaded event loop to avoid context switching.

**Detailed Example:**
Because Redis is single-threaded for command execution, there is no overhead from thread locks or race conditions. It uses **I/O multiplexing** (like `epoll` on Linux) to handle thousands of concurrent client connections efficiently, making it capable of handling over 100,000 operations per second.

---

## 6. What is Redis Sentinel and how does it differ from Redis Cluster?

**Simple Answer:**
*   **Sentinel:** Provides high availability (HA) and monitoring.
*   **Cluster:** Provides HA plus horizontal scaling via sharding.

**Detailed Example:**
If you need to ensure your Redis instance stays online even if the master fails, you use **Sentinel** to promote a replica to master. If your dataset is too large for a single machine (e.g., 500GB), you use **Redis Cluster** to split the data across multiple nodes automatically.

---

## 7. What is the "Thundering Herd" problem in caching?

**Simple Answer:**
It occurs when a popular cache entry expires, causing a massive spike of requests to hit the database simultaneously.

**Detailed Example:**
If a celebrity's profile is cached and the cache expires, thousands of users might request it at once. To prevent this, you can use **Mutex Locks** (only one thread fetches from DB while others wait) or implement **Probabilistic Early Expiration** (refresh the cache slightly before it actually expires for some users).

---

## 8. How do you handle memory eviction in Redis?

**Simple Answer:**
Redis uses policies like `allkeys-lru` or `volatile-ttl` to remove old keys when the memory limit is reached.

**Detailed Example:**
For a general-purpose cache, `allkeys-lru` (Least Recently Used) is ideal because it removes the items that haven't been accessed in the longest time. For session stores, `volatile-ttl` is better because it prioritizes removing keys that are closest to their expiration time.

**Code Example:**
```bash
# Set eviction policy in redis.conf
maxmemory-policy allkeys-lru

# Example: Setting a key with TTL
SET user:1001 "John Doe" EX 3600

# Example: Incrementing a counter (Atomic operation)
INCR page_views:homepage
```
