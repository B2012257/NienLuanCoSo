package company.app.employermanagement.controllers;

import company.app.employermanagement.models.User;
import company.app.employermanagement.requests.LoginRequest;
import company.app.employermanagement.responses.LogoutResponse;
import company.app.employermanagement.services.AuthService;
import company.app.employermanagement.untils.LoginRequired;
import company.app.employermanagement.untils.RoleRequired;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path = "/api/auth")
//@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping(path = "/register")
    public ResponseEntity<Object> register(@RequestBody User userRequest) {
        return this.authService.register(userRequest);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest requestBody) {
        return this.authService.login(requestBody);
    }

    @LoginRequired // Yêu cầu phải đã đăng nhập
    @RoleRequired(value = {"Quan Ly", "Admin"}) // Có 1 role là được truy cập
        @GetMapping(path = "/testCookie")
    public ResponseEntity<Object> testCookie(HttpServletRequest request) {
        return this.authService.testCookie(request);
    }

    @LoginRequired // Yêu cầu phải đã đăng nhập
    @PostMapping(path = "/logout")
    public ResponseEntity<LogoutResponse> logout(HttpServletRequest request) {
        return this.authService.logout(request);
    }
}
