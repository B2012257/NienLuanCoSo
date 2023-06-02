package company.app.employermanagement.untils;

import company.app.employermanagement.responses.handleException.ForbiddenAccessException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;

@Component
public class RoleInterceptor implements HandlerInterceptor {
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle is calling");

        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            RoleRequired roleRequired = handlerMethod.getMethodAnnotation(RoleRequired.class);
            if (roleRequired != null) {
                // Lấy ra role cần cos để được phép truy cập
                String[] requiredRoles = roleRequired.value();
                String token = getTokenFromCookie(request); //Get token from cookies
                String userRole = jwtTokenUtil.getRoleFromToken(token);  //Dùng jwt until giải mã token ra để tìm role

                //Nếu đúng role mới được truy cập (đáp ứng 1 trong các role là được)
                if (!Arrays.asList(requiredRoles).contains(userRole)) {
                    throw new ForbiddenAccessException("Bạn không có quyền truy cập tính năng này");
                }
            }
        }
        return true;
    }

    private String getTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("Authentication")) {
                    String cookieValue = cookie.getValue();
                    // Xử lý giá trị của cookie
                    return cookieValue;
                }
            }
        }
        return "None";
    }
}
