package com.project.app.response;


import company.app.employermanagement.models.User;
import company.app.employermanagement.responses.Response;
import org.springframework.http.HttpStatus;

public class LoginResponse extends Response {
    private User user;
    public LoginResponse(User user, String message, HttpStatus status) {
        super(status, message);
        this.user = user;
//        this.user.setPassword("");
    }
    public LoginResponse(String message, HttpStatus status) {
        super(status, message);
    }

    public User getUser() {
        return user;
    }
}
