package company.app.employermanagement.untils;

import company.app.employermanagement.responses.handleException.CustomAuthenticationException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.naming.AuthenticationException;

@Component
public class IsLoginInterceptor implements HandlerInterceptor {
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("IsLoginInterceptor preHandle is calling");

        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            LoginRequired loginRequired = handlerMethod.getMethodAnnotation(LoginRequired.class);

            if (loginRequired != null) {
                    String token = getTokenFromCookie(request);
                    Boolean isTrue = jwtTokenUtil.validateToken(token);

                    if (isTrue) {
                        return true;
                    }
                    throw new CustomAuthenticationException("Vui lòng đăng nhập");
            }
            return true;
        }return true;
    }
    private String getTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("Authentication")) {
                    String cookieValue = cookie.getValue();
                    // Xử lý giá trị của cookie
                    //System.out.println(cookieValue);
                    return cookieValue;
                }
            }
        }
        return "None";
    }
}
