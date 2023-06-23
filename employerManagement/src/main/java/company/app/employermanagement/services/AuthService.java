package company.app.employermanagement.services;

import com.project.app.response.LoginResponse;
import company.app.employermanagement.models.User;
import company.app.employermanagement.repositories.UserRepository;
import company.app.employermanagement.requests.LoginRequest;
import company.app.employermanagement.responses.LogoutResponse;
import company.app.employermanagement.untils.JwtTokenUtil;
import company.app.employermanagement.untils.RoleRequired;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
@Service
public class AuthService {
    @Autowired
    UserRepository userRepository;
    Argon2PasswordEncoder encoder;
    JwtTokenUtil jwtTokenUtil;

    public AuthService() {
        this.encoder = new Argon2PasswordEncoder(
                12,
                64,
                1, 15 * 1024,
                2);
        jwtTokenUtil = new JwtTokenUtil();
    }

    public ResponseEntity<Object> register(User userRequest) {

        String userNameRequest = userRequest.getUserName();
        String passwordRequest = userRequest.getPassword();
        String encodedPassword = encoder.encode(passwordRequest);
        if (userRepository.existsByUserName(userNameRequest)) {
            return ResponseEntity.ok("Đã tồn tại");
        }

        userRequest.setPassword(encodedPassword);
        userRepository.save(userRequest);
        return ResponseEntity.ok(userRequest);
    }

    public ResponseEntity<Object> login(LoginRequest body) {
        String username = body.getUserName();
        String password = body.getPassword();
        User userDB = this.userRepository.findOneByUserName(username);

        //Have username
        if (userDB != null) {
            var validPassword = encoder.matches(password, userDB.getPassword());
            //right password
            if (validPassword) {
                //Generate token ->>
                String token = jwtTokenUtil.generateToken(username, userDB.getRoleName());

                ResponseCookie cookie = ResponseCookie.from("Authentication", token)
                        .httpOnly(true)
                        .sameSite("Lax")
                        .path("/") // Đảm bảo cookie áp dụng cho toàn bộ ứng dụng
                        .build();

                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
                LoginResponse userRs = new LoginResponse(
                        userDB,
                        "Đăng nhập thành công",
                        HttpStatus.OK);

                return ResponseEntity.ok()
                        .headers(headers)
                        .body(userRs);

            } else /*Wrong password*/
                return new ResponseEntity<>(
                        new LoginResponse("Sai mật khẩu", HttpStatus.UNAUTHORIZED),
                        HttpStatus.UNAUTHORIZED);
        }
//      Doesn't exist account
        return new ResponseEntity<>(
                new LoginResponse("Tài khoản không tồn tại trong hệ thống",HttpStatus.NOT_FOUND),
                HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Object> testCookie(HttpServletRequest request) {

        return ResponseEntity.ok("{\"message\": \"Hello World\"}");
    }

    public ResponseEntity<LogoutResponse> logout(HttpServletRequest request) {
        //Ghi đè tại cookie cũ và cho hết hạn luôn. Trình duyệt sẽ tự xóa
        ResponseCookie cookie = ResponseCookie.from("Authentication", null)
                .maxAge(0) // Thời gian sống của cookie (đơn vị: giây)
                .httpOnly(true) // Chỉ cho phép truy cập qua HTTP, không cho phép JavaScript truy cập
                //.secure(true) // Chỉ sử dụng cookie qua kết nối HTTPS
                .path("/") // Đường dẫn áp dụng cookie (ở đây áp dụng cho toàn bộ ứng dụng)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok()
                .headers(headers)
                .body(new LogoutResponse(HttpStatus.OK, "Đăng xuất thành công"));
    }
}
