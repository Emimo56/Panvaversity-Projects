
1) give the file path of SKILL.md file created in task 1 to this task and ask it to create a skill of it. 
2) than gave a directory of POJO class and a code below to create the request

 @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        log.info("Received request to update user with id: {}", id);

        User updatedUser = userService.updateUser(id, user);

        log.info("User updated successfully with id: {}", id);

        return ResponseEntity.ok(updatedUser);
    }

3) It asked me whether I want to create in postman also and I said yes and it created in postman
4) i selected the wrong folder than I told it to move the newly created request to testing folder 