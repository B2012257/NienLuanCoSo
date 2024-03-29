package company.app.employermanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Description project: Website quản lý lịch làm của quán trà sữa
 * Author: Pham Quang Thai B2012257
 * Class: DI2096A4-KTPM
 * Start: 13:00pm 28/8/2023
 * End: 7:00am 03/07/2023
 */

@SpringBootApplication
@Controller
public class EmployerManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployerManagementApplication.class, args);
    }


}
