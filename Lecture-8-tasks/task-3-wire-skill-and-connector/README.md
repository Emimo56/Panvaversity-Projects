# Request
- I gave the below code and one User POJO class to a new

@PostMapping
public ResponseEntity<User> addUser(@RequestBody User user) {

    log.info("Received request to create user: {}", user.getEmail());
    User savedUser = userService.addUser(user);
    log.info("User created successfully with id: {}", savedUser.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
}
create a new collecction in postman called Testing and create a request for this endpoint and add to it.

- I gave this prompt 
create a new collecction in postman called Testing and create a request for this endpoint and add to it.