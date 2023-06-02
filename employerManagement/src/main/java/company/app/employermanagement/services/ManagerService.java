package company.app.employermanagement.services;

import company.app.employermanagement.models.User;
import company.app.employermanagement.repositories.UserRepository;
import company.app.employermanagement.responses.ErrorResponse;
import company.app.employermanagement.responses.Response;
import company.app.employermanagement.responses.SuccessfulResponse;
import company.app.employermanagement.untils.JwtTokenUtil;
import company.app.employermanagement.untils.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Service
public class ManagerService{
    @Autowired
    UserRepository userRepository;
    PasswordEncoder encoder;

    public ManagerService() {
        this.encoder = new Argon2PasswordEncoder(
                12,
                64,
                1, 15 * 1024,
                2);
    }

    public Response addEmployee(User employeeDetail) {

        if(employeeDetail != null) {
            //Tạo 1 tài khoản cho người dùng random từ tên + mã cb +
            String fullName = employeeDetail.getFullName();
            String uid = employeeDetail.getUid();
            int firstNameIndex = employeeDetail.getFullName().lastIndexOf(" ");
            String firstName = fullName.substring(firstNameIndex + 1);
            String userName = firstName.toLowerCase() + uid.toLowerCase();
            String password = new PasswordGenerator().generateRandomPassword();
            employeeDetail.setUserName(userName);
            employeeDetail.setPassword(encoder.encode(password));
            User userResponse = this.userRepository.save(employeeDetail);
            userResponse.setPassword(password);
            if(userResponse != null) {
                return new SuccessfulResponse(HttpStatus.OK, "Thành công", userResponse);
            }
            return new ErrorResponse(HttpStatus.NOT_ACCEPTABLE, "Không thành công");
        }
        return new ErrorResponse(HttpStatus.BAD_REQUEST, "Không thành công");

        /* redirect to register api */
    }
    /* Danh sách các nhân viên kèm 1 số thông tin cơ bản, có thể xem chi tiết nhân viên */
    public void allEmployee() {

    }
    //Thông tin chi tiết của 1 nhân viên
    public void detailEmployee() {

    }
    public void editEmployee() {

    }
    public void deleteEmployee() {

    }
    /* sắp lịch làm (Dự kiến giao diện sẽ hiện ra danh sách các nhân viên,
     sau đó chỉ cần chọn ngày làm, giờ bắt đầu, ca, trạng thái làm việc hiện tại.
     Giao diện cho thêm nút chỉnh sửa nếu có cần chỉnh lịch tăng ca */
    public void scheduleEmployee() {

    }
    /*Chỉnh sửa lại lịch nếu như có thay đổi, ghi chú lại lý do thay đổi*/
    public void editScheduleEmployee() {

    }
    /*Hủy lịch của 1 nhân viên, ghi chú lại lý do thay đổi*/
    public void cancelScheduleEmployee() {

    }

}
