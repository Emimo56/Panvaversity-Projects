package com.example.buganalyzerdemo.service;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {

    public String getGreeting() {
        return "Hello from Greeting Service!";
    }
}