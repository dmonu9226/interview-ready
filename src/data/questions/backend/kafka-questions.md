# Apache Kafka Interview Questions

## 1. What are the core components of Kafka?

**Simple Answer:**
Producers write, Consumers read, Brokers store, and Topics organize the data.

**Detailed Example:**
In a real-time fraud detection system, **Producers** (transaction services) send payment events to a `transactions` **Topic**. **Brokers** (the Kafka cluster) replicate this data for fault tolerance. **Consumers** (fraud analysis engines) subscribe to the topic to flag suspicious activity in milliseconds.

---

## 2. What is the difference between a Topic and a Partition?

**Simple Answer:**
A Topic is a category; a Partition is a physical slice of that category for scaling.

**Detailed Example:**
If you have a `user-activity` topic with 10 partitions, Kafka can distribute these partitions across 10 different brokers. This allows 10 different consumer instances to read from the topic simultaneously, increasing throughput by 10x compared to a single-partition topic.

---

## 3. Explain the concept of Consumer Groups.

**Simple Answer:**
A group of consumers that share the work of reading a topic.

**Detailed Example:**
If you have a `logs` topic with 5 partitions and a Consumer Group with 5 instances, each instance reads from exactly one partition. If you add a 6th instance, it will remain idle because there are no more partitions to assign. This ensures ordered processing within a partition while allowing parallel processing across the group.

---

## 4. What is the significance of Offsets in Kafka?

**Simple Answer:**
An offset is a unique ID for a message within a partition that tracks how far a consumer has read.

**Detailed Example:**
Kafka doesn't delete messages after they are read. If a consumer crashes and restarts, it uses its last committed **offset** to resume reading from where it left off. This "replayability" is crucial for debugging or re-processing data after a bug fix in the consumer logic.

---

## 5. How does Kafka ensure high availability and durability?

**Simple Answer:**
By replicating data across multiple brokers and requiring acknowledgments.

**Detailed Example:**
With a replication factor of 3 and `acks=all`, a producer's write is only considered successful once the Leader and both Followers have written the data to their logs. If the Leader broker fails, one of the Followers is automatically elected as the new Leader, ensuring zero data loss and continuous availability.

---

## 6. What is the difference between `at-least-once` and `exactly-once` semantics?

**Simple Answer:**
*   **At-least-once:** Messages may be duplicated but never lost.
*   **Exactly-once:** Each message is processed precisely one time.

**Detailed Example:**
In a payment processing system, **exactly-once** is critical to prevent double-charging a customer. Kafka achieves this using transactional IDs and idempotent producers. For a less critical system like click-stream analytics, **at-least-once** is often sufficient and offers higher performance.

---

## 7. What is a Kafka Connector?

**Simple Answer:**
A tool that automates the movement of data into and out of Kafka without writing custom producer/consumer code.

**Detailed Example:**
You can use a **Source Connector** to pull data from a MySQL database (using Change Data Capture) and push it into a Kafka topic. Then, a **Sink Connector** can take that data from the topic and load it into an Elasticsearch cluster for searching, all without writing a single line of Java or Python.

---

## 8. How do you handle "Poison Pill" messages in Kafka?

**Simple Answer:**
A poison pill is a message that causes a consumer to crash repeatedly. It's handled by moving it to a Dead Letter Queue (DLQ).

**Detailed Example:**
If a consumer fails to deserialize a specific message after several retries, it should catch the exception and publish that message to a separate `dlq-topic`. This prevents the main processing pipeline from getting stuck and allows engineers to investigate the malformed message later.

**Code Example:**
```java
// Simple Kafka Consumer with Error Handling
try {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        processMessage(record.value());
    }
} catch (Exception e) {
    // Send failed message to DLQ topic
    producer.send(new ProducerRecord<>("dlq-topic", record.key(), record.value()));
    log.error("Moved message to DLQ: " + e.getMessage());
}
```
