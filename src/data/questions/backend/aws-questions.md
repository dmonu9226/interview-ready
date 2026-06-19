# AWS Interview Questions

## 1. What is the difference between EC2 and Lambda?

**Simple Answer:**
*   **EC2:** Virtual servers you manage.
*   **Lambda:** Serverless code execution you don't manage.

**Detailed Example:**
For a legacy monolithic application requiring specific OS-level configurations and long-running background processes, **EC2** is preferred. You would use Auto Scaling Groups to handle load. For a modern event-driven architecture, such as processing images uploaded to S3 or handling API Gateway requests, **Lambda** is ideal due to its automatic scaling and pay-per-use model.

---

## 2. Explain the difference between S3 Standard and S3 Glacier.

**Simple Answer:**
*   **S3 Standard:** Fast access for frequent data.
*   **S3 Glacier:** Cheap storage for archives.

**Detailed Example:**
A media streaming company uses **S3 Standard** for currently trending videos to ensure low-latency playback. They use **S3 Glacier Deep Archive** for raw footage from 5 years ago, which is rarely accessed but must be kept for compliance. Retrieval from Glacier can take minutes to hours, so it's not suitable for real-time user-facing content.

---

## 3. What is an IAM Role and how is it different from an IAM User?

**Simple Answer:**
*   **IAM User:** A person or service with permanent credentials.
*   **IAM Role:** Temporary permissions assumed by a resource.

**Detailed Example:**
Instead of hardcoding AWS Access Keys in an application running on an EC2 instance (which is a security risk), you assign an **IAM Role** to the EC2 instance. The application then retrieves temporary credentials from the Instance Metadata Service (IMDS). This ensures that if the instance is compromised, the credentials are short-lived and automatically rotated.

---

## 4. What is the purpose of a VPC (Virtual Private Cloud)?

**Simple Answer:**
A private network in the cloud where you control IP ranges and subnets.

**Detailed Example:**
In a multi-tier architecture, you create a **Public Subnet** for Load Balancers and NAT Gateways, and **Private Subnets** for Application Servers and Databases. Security Groups and NACLs are used to ensure that only the Load Balancer can talk to the App Servers, and only App Servers can talk to the Database, creating a secure perimeter.

---

## 5. How does Auto Scaling work in AWS?

**Simple Answer:**
Automatically adds or removes servers based on demand.

**Detailed Example:**
You can configure **Target Tracking Scaling Policies** based on CloudWatch metrics like `AverageCPUUtilization`. For stateful applications, you might use **Predictive Scaling** to anticipate traffic spikes based on historical patterns. It's crucial to pair Auto Scaling with Elastic Load Balancing (ELB) to distribute traffic evenly across the new instances.

---

## 6. What is the difference between a Security Group and a NACL?

**Simple Answer:**
*   **Security Group:** Stateful firewall at the instance level.
*   **NACL (Network ACL):** Stateless firewall at the subnet level.

**Detailed Example:**
If you allow inbound traffic on port 80 in a **Security Group**, the return traffic is automatically allowed. In a **NACL**, you must explicitly define both the inbound rule for port 80 and an outbound rule for the ephemeral ports used by the response. Security Groups are generally preferred for their simplicity and stateful nature.

---

## 7. What is Amazon RDS and when would you use it over DynamoDB?

**Simple Answer:**
*   **RDS:** Managed relational database (SQL).
*   **DynamoDB:** Managed NoSQL database.

**Detailed Example:**
Use **RDS** (like PostgreSQL or MySQL) when your data has complex relationships, requires ACID transactions, or needs complex JOIN operations (e.g., an ERP system). Use **DynamoDB** for high-scale, low-latency applications with simple key-value access patterns, such as a shopping cart or session store for millions of users.

---

## 8. What is AWS CloudFormation?

**Simple Answer:**
An Infrastructure as Code (IaC) service that allows you to model and provision AWS resources using templates.

**Detailed Example:**
Instead of manually clicking through the AWS Console to create a VPC, EC2 instances, and RDS databases, you write a YAML or JSON template. CloudFormation then provisions these resources in a predictable and repeatable way, making it easy to replicate environments (Dev, Staging, Prod) and track changes via version control.

**Code Example:**
```yaml
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t2.micro
      ImageId: ami-0abcdef1234567890
      Tags:
        - Key: Name
          Value: MyBackendServer
```

---

## 9. What are EC2 Instance Types and how do you choose the right one?

**Simple Answer:**
EC2 instances come in different families optimized for specific use cases: compute, memory, storage, or general purpose.

**Detailed Example:**
*   **General Purpose (t3, m5):** Balanced resources for web servers and small databases.
*   **Compute Optimized (c5, c6g):** High-performance processors for batch processing, gaming servers, and scientific modeling.
*   **Memory Optimized (r5, x1e):** Large RAM for in-memory databases like Redis or real-time big data analytics.
*   **Storage Optimized (i3, d2):** High sequential read/write access for NoSQL databases and data warehousing.
*   **Accelerated Computing (p3, g4dn):** GPU instances for machine learning, graphics rendering, and video encoding.

Choose based on your workload: a web server might use `t3.medium`, while a ML training job would use `p3.2xlarge`.

---

## 10. What is the difference between On-Demand, Reserved, and Spot Instances?

**Simple Answer:**
*   **On-Demand:** Pay by the second/hour with no commitment.
*   **Reserved Instances (RI):** 1-3 year commitment for up to 72% discount.
*   **Spot Instances:** Bid on unused capacity for up to 90% discount, but can be interrupted.

**Detailed Example:**
Use **On-Demand** for unpredictable workloads or short-term projects. Use **Reserved Instances** for steady-state applications like production databases where you know you'll need the capacity for years. Use **Spot Instances** for fault-tolerant, flexible workloads like batch processing, CI/CD pipelines, or distributed computing tasks that can handle interruptions.

---

## 11. What is an Amazon Machine Image (AMI)?

**Simple Answer:**
A template that contains the software configuration (OS, application server, applications) required to launch your instance.

**Detailed Example:**
You can use AWS-provided AMIs (like Amazon Linux 2 or Ubuntu), marketplace AMIs with pre-installed software, or create **Custom AMIs** from your configured instances. For example, you configure an EC2 instance with your application code, dependencies, and security patches, then create an AMI. This AMI can be used to launch identical instances across Auto Scaling Groups, ensuring consistency.

---

## 12. What are EBS Volumes and how do they differ from Instance Store?

**Simple Answer:**
*   **EBS (Elastic Block Store):** Persistent network-attached storage that survives instance termination.
*   **Instance Store:** Temporary block-level storage physically attached to the host computer.

**Detailed Example:**
Use **EBS** for databases, file systems, or any data that must persist beyond the life of the instance. EBS volumes can be detached and reattached to other instances. Use **Instance Store** for temporary data like cache, buffers, or scratch space where high I/O performance is needed but data loss is acceptable if the instance stops or terminates.

---

## 13. What is an Elastic IP Address and when should you use it?

**Simple Answer:**
A static IPv4 address designed for dynamic cloud computing that you can remap to different instances.

**Detailed Example:**
By default, EC2 instances get dynamic public IPs that change on stop/start. If you need a fixed public IP for DNS records, whitelisting, or compliance purposes, allocate an **Elastic IP**. For example, if your primary web server fails, you can quickly remap the Elastic IP to a standby instance, minimizing downtime without updating DNS records.

---

## 14. What are Security Groups and how do they work?

**Simple Answer:**
Virtual firewalls that control inbound and outbound traffic at the instance level.

**Detailed Example:**
Security Groups are **stateful**: if you allow inbound traffic on port 443 (HTTPS), the return traffic is automatically allowed. You can reference other Security Groups in rules. For example, a web server SG allows inbound on ports 80/443 from anywhere (0.0.0.0/0), while a database SG only allows inbound on port 3306 from the web server SG. This creates a secure, layered defense.

---

## 15. What is User Data in EC2?

**Simple Answer:**
A script that runs automatically when an EC2 instance first boots.

**Detailed Example:**
User Data is commonly used for bootstrapping instances. For example, you can write a bash script in User Data that installs Apache, clones your application code from GitHub, sets environment variables, and starts the service. This ensures every new instance launched from an Auto Scaling Group is automatically configured without manual intervention.

```bash
#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Hello from $(hostname)</h1>" > /var/www/html/index.html
```

---

## 16. What is EC2 Auto Scaling and what are its components?

**Simple Answer:**
A service that automatically adjusts the number of EC2 instances based on demand.

**Detailed Example:**
Key components:
*   **Launch Template/Configuration:** Defines instance type, AMI, security groups, etc.
*   **Auto Scaling Group (ASG):** Manages a collection of instances.
*   **Scaling Policies:** Rules for when to scale (e.g., CPU > 70%).
*   **CloudWatch Alarms:** Monitor metrics and trigger scaling actions.

For example, during a flash sale, CloudWatch detects high CPU utilization, triggers a scale-out policy, and the ASG launches 5 more instances. After the sale, when CPU drops below 30%, it scales in to save costs.

---

## 17. What is the difference between Horizontal and Vertical Scaling in EC2?

**Simple Answer:**
*   **Horizontal Scaling:** Adding more instances (scale out/in).
*   **Vertical Scaling:** Increasing instance size (scale up/down).

**Detailed Example:**
**Horizontal scaling** is preferred in cloud architecture because it provides better fault tolerance and unlimited scalability. You add more t3.medium instances behind a load balancer. **Vertical scaling** requires stopping the instance, changing the instance type (e.g., from t3.medium to t3.large), and restarting, which causes downtime. It's limited by the maximum instance size available.

---

## 18. What is an EC2 Placement Group and what are the types?

**Simple Answer:**
A logical grouping of instances that influences how they are placed on underlying hardware.

**Detailed Example:**
*   **Cluster Placement Group:** Instances are placed close together in the same Availability Zone for low-latency, high-throughput communication (e.g., HPC applications).
*   **Spread Placement Group:** Instances are placed on distinct hardware racks to reduce correlated failures (e.g., critical applications requiring maximum availability).
*   **Partition Placement Group:** Instances are divided into partitions, each with its own set of racks (e.g., large distributed workloads like Hadoop, Cassandra, or Kafka).

---

## 19. What is EC2 Hibernate and when would you use it?

**Simple Answer:**
A feature that saves the instance's RAM state to the EBS root volume when stopped, allowing faster startup with applications resuming from where they left off.

**Detailed Example:**
Use hibernation for long-running processes that take a long time to initialize, such as in-memory caches, stateful services, or development environments. When you hibernate an instance, it preserves the in-memory state, so when you start it again, applications resume without reinitialization. Note that the instance must have EBS-backed root volume and the RAM size must be supported.

---

## 20. What is the difference between Stopping and Terminating an EC2 instance?

**Simple Answer:**
*   **Stop:** Shuts down the instance; EBS volumes persist; can be restarted.
*   **Terminate:** Permanently deletes the instance; ephemeral storage is lost; EBS volumes may be deleted depending on settings.

**Detailed Example:**
**Stop** an instance when you want to pause it temporarily (e.g., overnight to save costs) and restart it later. The instance retains its instance ID and private IP. **Terminate** an instance when you no longer need it. By default, the root EBS volume is deleted on termination, but you can configure additional EBS volumes to persist. Once terminated, the instance cannot be recovered.

---

## 21. What is EC2 Instance Metadata and how do you access it?

**Simple Answer:**
Data about your instance (instance ID, public IP, security groups, etc.) accessible from within the instance via a special URL.

**Detailed Example:**
Access metadata at `http://169.254.169.254/latest/meta-data/`. For example, you can retrieve the instance ID, availability zone, or IAM role credentials. Applications running on EC2 use this to get temporary credentials from IAM roles without hardcoding keys. Always use IMDSv2 (token-based) for enhanced security:

```bash
# Get token
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
# Get instance ID
curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id
```

---

## 22. What are T2/T3 Unlimited instances?

**Simple Answer:**
Instances that can burst beyond their baseline CPU performance by paying extra for additional CPU credits.

**Detailed Example:**
T2/T3 instances earn CPU credits when idle and spend them when bursting. In **Standard mode**, once credits run out, CPU is throttled to baseline. In **Unlimited mode**, the instance can continue bursting by paying an additional hourly charge for excess CPU usage. This is ideal for workloads with occasional spikes, like web servers that experience periodic traffic surges.

---

## 23. What is Amazon EC2 Systems Manager (SSM) and why use it over SSH?

**Simple Answer:**
A service that allows you to manage EC2 instances without opening inbound SSH ports.

**Detailed Example:**
Instead of exposing port 22 to the internet, you install the SSM Agent on your instances and grant them an IAM role with SSM permissions. You can then use **Session Manager** to securely connect to instances through the AWS Console or CLI. This eliminates the need for bastion hosts, reduces attack surface, and provides audit logs of all sessions.

---

## 24. What is EC2 Fleet and when would you use it?

**Simple Answer:**
A feature that lets you provision and manage multiple EC2 instances across instance types, Availability Zones, and purchase options (On-Demand, Spot, Reserved).

**Detailed Example:**
Use EC2 Fleet for large-scale workloads that need to optimize for cost and availability. For example, you can configure a fleet to maintain 100 instances, preferring Spot Instances for cost savings, but falling back to On-Demand if Spot capacity is unavailable. This is useful for batch processing, containerized workloads, or distributed computing where you need many instances with flexible configurations.

---

## 25. How do you monitor EC2 instances?

**Simple Answer:**
Use Amazon CloudWatch for metrics, CloudWatch Logs for log aggregation, and optionally third-party tools.

**Detailed Example:**
**CloudWatch** provides basic metrics like CPU utilization, network I/O, disk I/O, and status checks. Enable **Detailed Monitoring** (1-minute intervals vs. 5-minute) for more granular data. Use **CloudWatch Logs** to collect application and system logs. Set up **CloudWatch Alarms** to trigger notifications or auto-scaling actions. For advanced monitoring, install the **CloudWatch Agent** to collect custom metrics and memory utilization (which isn't tracked by default).

---

## 26. What is the difference between Dedicated Instances, Dedicated Hosts, and On-Demand Instances?

**Simple Answer:**
*   **On-Demand:** Shared tenancy; your instances run on shared hardware.
*   **Dedicated Instances:** Your instances run on hardware dedicated to your account.
*   **Dedicated Hosts:** Physical servers fully dedicated to your use with visibility and control over instance placement.

**Detailed Example:**
Use **Dedicated Instances** for compliance requirements that mandate physical isolation (e.g., certain regulatory standards). Use **Dedicated Hosts** when you need to use existing per-socket, per-core, or per-VM software licenses (like Windows Server licenses) or require specific instance placement. **On-Demand** is suitable for most general workloads and is the most cost-effective option.

---

## 27. What is EC2 Network Interface (ENI) and what are its use cases?

**Simple Answer:**
A virtual network card that you can attach to EC2 instances in a VPC.

**Detailed Example:**
Every EC2 instance has a primary ENI. You can attach **secondary ENIs** for various purposes:
*   Create multi-homed instances (multiple IP addresses)
*   Separate management traffic from application traffic
*   Implement network appliances (firewalls, proxies) with multiple interfaces
*   Failover scenarios where you move an ENI from a failed instance to a standby instance
Each ENI can have its own security group, private IP, and elastic IP.

---

## 28. What is Enhanced Networking in EC2?

**Simple Answer:**
High-performance networking capabilities using SR-IOV (Single Root I/O Virtualization) for lower latency and higher throughput.

**Detailed Example:**
Enhanced Networking provides:
*   Higher packets per second (PPS)
*   Lower latency and jitter
*   Consistent network performance

It's available on most current-generation instance types. For example, compute-intensive applications, real-time gaming servers, or high-frequency trading platforms benefit from enhanced networking. You don't need to configure anything; just launch supported instance types (like C5, M5, R5) with HVM AMIs.

---

## 29. How does EC2 pricing work and what factors affect cost?

**Simple Answer:**
Pricing depends on instance type, region, operating system, purchase option, and data transfer.

**Detailed Example:**
Cost factors:
*   **Instance Type:** Larger/more specialized instances cost more
*   **Region:** Prices vary by geographic location
*   **OS:** Windows instances typically cost more than Linux
*   **Purchase Option:** Spot < Reserved < On-Demand
*   **Data Transfer:** Inbound is free; outbound data transfer incurs charges
*   **EBS Storage:** Charged per GB-month provisioned
*   **Additional Features:** Elastic IPs (if not attached), detailed monitoring, etc.

Use AWS Cost Explorer and Trusted Advisor to optimize spending.

---

## 30. What is EC2 Capacity Reservations and when would you use it?

**Simple Answer:**
Reserves EC2 capacity in a specific Availability Zone for a specified period, ensuring you have resources when needed.

**Detailed Example:**
Use Capacity Reservations for critical workloads that must launch at specific times, such as end-of-month batch processing, seasonal events, or disaster recovery scenarios. Unlike Reserved Instances (which provide billing discounts), Capacity Reservations guarantee physical capacity. You pay for the reserved capacity whether you use it or not. Combine with Reserved Instances to get both capacity assurance and cost savings.
