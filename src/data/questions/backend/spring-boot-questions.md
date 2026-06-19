# Spring Boot Interview Questions

## 1. What is the difference between Spring and Spring Boot?

**Simple Answer:**
Spring is a framework requiring manual setup; Spring Boot is an opinionated extension that automates it.

**Detailed Example:**
In a traditional **Spring** app, you might spend hours configuring `web.xml`, setting up component scanning, and managing version conflicts in your `pom.xml`. With **Spring Boot**, you simply add the `spring-boot-starter-web` dependency, and it automatically configures Tomcat, Spring MVC, and Jackson for JSON processing, allowing you to start coding business logic immediately.

---

## 2. What is the purpose of the `@SpringBootApplication` annotation?

**Simple Answer:**
It's a shortcut that enables configuration, auto-configuration, and component scanning.

**Detailed Example:**
When you annotate your main class with `@SpringBootApplication`, it triggers **Auto-Configuration**. For instance, if it detects `H2` database on the classpath, it automatically sets up an in-memory database bean. If it sees `spring-data-jpa`, it configures an `EntityManager`. This "magic" is driven by the `spring.factories` file inside the starter jars.

---

## 3. How do you handle exceptions in Spring Boot?

**Simple Answer:**
Using `@ControllerAdvice` for global handling and `@ExceptionHandler` for specific errors.

**Detailed Example:**
Instead of wrapping every controller method in a `try-catch` block, you create a class annotated with **`@ControllerAdvice`**. Inside, you define methods with `@ExceptionHandler(ResourceNotFoundException.class)` that return a standardized `ErrorResponse` object with a 404 status. This ensures your API consumers always receive a consistent error format regardless of where the exception occurred.

---

## 4. What is Dependency Injection (DI) and how is it implemented in Spring?

**Simple Answer:**
DI is a pattern where the Spring Container provides objects with their dependencies rather than them creating them.

**Detailed Example:**
In a service layer, instead of using `new UserRepository()`, you declare a constructor parameter `private final UserRepository repo;`. Spring sees this, finds the `UserRepository` bean it created at startup, and "injects" it. Using **Constructor Injection** is preferred because it makes the class immutable and easy to test with mock objects.

---

## 5. What is the difference between `@RestController` and `@Controller`?

**Simple Answer:**
`@Controller` returns views (HTML); `@RestController` returns data (JSON/XML).

**Detailed Example:**
If you are building a backend for a React or Angular frontend, you use **`@RestController`**. When a method returns a `List<User>`, Spring Boot automatically uses Jackson to serialize that list into a JSON array. If you used `@Controller`, Spring would look for a Thymeleaf or JSP template named "users.html" to render.

---

## 6. What is the Spring Actuator?

**Simple Answer:**
A set of production-ready features that help you monitor and manage your application.

**Detailed Example:**
Actuator provides endpoints like `/actuator/health` to check if the app is running, `/actuator/metrics` to see memory usage or HTTP request counts, and `/actuator/env` to view environment properties. It's essential for integrating with monitoring tools like Prometheus or Grafana.

---

## 7. Explain the different Bean Scopes in Spring.

**Simple Answer:**
*   **Singleton:** One instance per container (default).
*   **Prototype:** A new instance every time it's requested.
*   **Request/Session:** One instance per HTTP request or user session.

**Detailed Example:**
A **Singleton** is perfect for stateless services like `PaymentService`. A **Prototype** scope is needed if the bean holds state that shouldn't be shared across threads. **Request** scope is useful for storing information specific to a single API call, like a user's temporary preferences.

---

## 8. What is the difference between `@Component`, `@Repository`, and `@Service`?

**Simple Answer:**
They are all stereotypes for Spring beans, but they indicate different layers of the application.

**Detailed Example:**
*   **`@Component`:** Generic stereotype for any Spring-managed component.
*   **`@Repository`:** Used for DAOs; it translates database exceptions into Spring's `DataAccessException` hierarchy.
*   **`@Service`:** Used for business logic; it helps in organizing code and can be targeted for specific transactional advice.

**Code Example:**
```java
// Service Layer with Constructor Injection
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(String name) {
        return userRepository.save(new User(name));
    }
}

// Global Exception Handler
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleNotFound(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
```
