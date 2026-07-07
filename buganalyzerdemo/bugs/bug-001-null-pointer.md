# Bug 001 - NullPointerException in HelloController

## Description

Calling the `/hello` endpoint returns a **500 Internal Server Error**.

## Steps to Reproduce

1. Start the Spring Boot application.
2. Open `http://localhost:8080/hello`.
3. Observe the response.

## Expected Result

The endpoint should return:

```
Hello from Greeting Service!
```

## Actual Result

The endpoint returns HTTP 500.

## Stack Trace

```
java.lang.NullPointerException:
Cannot invoke "GreetingService.getGreeting()" because "greetingService" is null
```

## Suspected Files

* HelloController.java
* GreetingService.java
