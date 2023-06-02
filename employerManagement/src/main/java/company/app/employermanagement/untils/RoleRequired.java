package company.app.employermanagement.untils;

import java.lang.annotation.*;

@Target(ElementType.METHOD) //Áp dụng cho phương thức
@Retention(RetentionPolicy.RUNTIME) // Ton tại theo thời gian chương trình
public @interface RoleRequired {
    String[] value() default ""; //Giá trị mặc định
}
