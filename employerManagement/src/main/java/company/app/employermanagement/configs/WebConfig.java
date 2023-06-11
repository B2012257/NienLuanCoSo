package company.app.employermanagement.configs;

import company.app.employermanagement.untils.IsLoginInterceptor;
import company.app.employermanagement.untils.RoleInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private RoleInterceptor roleInterceptor;

    @Autowired
    private IsLoginInterceptor isLoginInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(isLoginInterceptor);
        registry.addInterceptor(roleInterceptor);
//                .addPathPatterns("/api/auth/testCookie"); // Áp dụng interceptor cho các URL trong /api
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5500")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

}
