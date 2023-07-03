package company.app.employermanagement.services;

import company.app.employermanagement.Dto.UserDto;
import company.app.employermanagement.models.*;
import company.app.employermanagement.repositories.*;
import company.app.employermanagement.requests.ScheduleRequest;
import company.app.employermanagement.requests.UpdatePresent;
import company.app.employermanagement.responses.ErrorResponse;
import company.app.employermanagement.responses.Response;
import company.app.employermanagement.responses.SuccessfulResponse;
import company.app.employermanagement.untils.JwtTokenUtil;
import company.app.employermanagement.untils.PasswordGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ManagerService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ShiftDetailRepository shiftDetailRepository;
    @Autowired
    ShiftRepository shiftRepository;
    @Autowired
    ShiftListRepository shiftListRepository;
    @Autowired
    RoleRepository roleRepository;
    PasswordEncoder encoder;

    public ManagerService() {
        this.encoder = new Argon2PasswordEncoder(
                12,
                64,
                1, 15 * 1024,
                2);
    }

    public List<Role> getRoles() {
        return this.roleRepository.findAll();
    }

    public Response addEmployee(User employeeDetail) {

        if (employeeDetail != null) {

            //Tạo 1 tài khoản cho người dùng random từ tên + mã cb +
            String fullName = employeeDetail.getFullName();
            String uid = employeeDetail.getUid();
            int firstNameIndex = employeeDetail.getFullName().lastIndexOf(" ");
            String firstName = fullName.substring(firstNameIndex + 1);
            String userName = firstName.toLowerCase() + uid.toLowerCase();
//            String password = new PasswordGenerator().generateRandomPassword();
            String password = "nv123123";
            employeeDetail.setUserName(userName);
            employeeDetail.setPassword(encoder.encode(password));
            User userResponse = this.userRepository.save(employeeDetail);
            userResponse.setPassword(password); // Trả về mật khẩu chưa encode để client ghi lại

            if (userResponse != null) {
                return new SuccessfulResponse(HttpStatus.OK, "Thành công", userResponse);
            }
            return new ErrorResponse(HttpStatus.NOT_ACCEPTABLE, "Không thành công");
        }
        return new ErrorResponse(HttpStatus.BAD_REQUEST, "Không thành công");

        /* redirect to register api */
    }

    /* Danh sách các nhân viên kèm 1 số thông tin cơ bản, có thể xem chi tiết nhân viên */
    public List<User> allEmployee() {
        return userRepository.findAll();
    }

    public Response totalEmployee() {
        return new SuccessfulResponse(HttpStatus.OK, "Lấy thành công tổng nhân sự", userRepository.count());
    }

    public List<User> searchEmployeeByName(String name) {
        if (name != null)
            return userRepository.findAllByFullNameContains(name);

        return new ArrayList<>();
    }

    //Thông tin chi tiết của 1 nhân viên
    public Response detailEmployee(String uid) {
        User userDb = this.userRepository.findOneByUid(uid);
        if (userDb != null) {
            return new SuccessfulResponse(HttpStatus.OK, "Lấy thông tin nhân viên thành công!", userDb);
        } else {
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin nhân viên này!");
        }
    }

    public List<ShiftList> getShiftTypes() {
        return shiftListRepository.findAll();
    }

    public Response DeleteShiftTypes(Long id) {
        shiftListRepository.deleteById(id);
        return new SuccessfulResponse(HttpStatus.OK, "Xóa thành công");
    }

    public void editEmployee() {

    }

    public Response deleteEmployee(String uid) {
        this.userRepository.deleteByUid(uid);
        return new SuccessfulResponse(HttpStatus.OK, "Xóa thành công");
    }

    public Object createShift(Shift shift) {
        String userUid = shift.getSchedule_by().getUid();
        Long shiftListId = shift.getShiftList().getId();
        User us = userRepository.findOneByUid(userUid);
        ShiftList shiftLs = shiftListRepository.findOneById(shiftListId);
        Shift shiftRes = new Shift(shift);

        //Kiểm tra có trùng ngày hay không
//        Boolean isExistByDate = shiftRepository.existsByDate(shift.getDate());
        if (!this.shiftRepository.existsByShiftListIdAndDate(shiftListId, shift.getDate())) {
//            us.setPassword("");
            shiftRes.setShiftList(shiftLs);
            shiftRes.setSchedule_by(us);
            Shift rs = shiftRepository.save(shiftRes);
            if (rs != null)
                return rs;
            else
                return new ErrorResponse(HttpStatus.BAD_REQUEST, "Không thành công! Vui lòng thử lại");
        } else {
            return new ErrorResponse(HttpStatus.BAD_REQUEST, "Không thành công! Ca này đã tồn tại");
        }
    }

    /* sắp lịch làm (Dự kiến giao diện sẽ hiện ra danh sách các nhân viên,
     sau đó chỉ cần chọn ngày làm, giờ bắt đầu, ca, trạng thái làm việc hiện tại.
     Giao diện cho thêm nút chỉnh sửa nếu có cần chỉnh lịch tăng ca */
    public List<Shift_detail> scheduleEmployee(List<Shift_detail> shiftDetails) {

        //Tìm xem thằng này có dđ làm trong ngày hôm nay  chưa
        //Kiểm tra có bị trùng với các giờ tăng ca khác hay không
        System.out.println(shiftDetails);
        //Lấy các ca làm trong ngày đó
        for(Shift_detail oneShiftDetail : shiftDetails) {
            String uid = oneShiftDetail.getUser_uid().getUid();
                    System.out.println(uid);
            Long shiftId = oneShiftDetail.getShift().getId();
            System.out.println(shiftId);
        List<Shift> shiftDbs = this.shiftRepository.findAllByDate(shiftDate);
            for(Shift shift : shiftDbs) {
                System.out.println(shift);
            }
        }
        return this.shiftDetailRepository.saveAllAndFlush(shiftDetails);

    }

    public Shift getShiftOfDay(String date, Long typeId) {
        System.out.println(typeId);
        return this.shiftRepository.findAllByDateAndShiftListId(date, typeId);

    }

    public Response getScheduleFromDayToDay(String dayStart, String dayEnd) {
        // Tìm id ca từ ngày start đến ngày end
        //từ id lấy ra details ca
        //Trả về
        List<Shift> shifts = this.shiftRepository.findByDateBetween(dayStart, dayEnd);
        if(shifts.size() ==0) {
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy ca!");
        }else {
            //Lấy các shift Detail từ các bản shift
            List<Shift_detail> shiftDetails = this.shiftDetailRepository.findAllByShiftIn(shifts);
            return new SuccessfulResponse(HttpStatus.OK, "Thành công", shiftDetails);

        }
    }

    public Object getShiftScheduleOfDay(String date, Long typeId) {
        System.out.println(typeId);
        Shift shift = this.shiftRepository.findAllByDateAndShiftListId(date, typeId);
        if (shift != null) {
            Long shift_id = shift.getId();
            return this.shiftDetailRepository.findAllByShift_id(shift_id);
        }
        return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin ca làm");
    }

    //Hiển thị danh sách nhân viên làm trong ngày
    public Object getAllScheduleInfo(String date) {
        //Lấy ra các ca trong ngày
        List<Shift> shifts = this.shiftRepository.findAllByDate(date);
        //Lấy các nhân viên trong ca đó
        List<Shift_detail> shiftDetails = this.shiftDetailRepository.findAllByShiftIn(shifts);

        return shiftDetails;
    }

    //Chấm công
    public Response updatePresent(UpdatePresent shiftDetail_id) {
        List<Long> idList = shiftDetail_id.getId();
        //Lấy ra id cần cập nhật
        List<Shift_detail> shiftDetails = this.shiftDetailRepository.findAllById(idList);
        for (Shift_detail shiftDetail : shiftDetails) {
            System.out.println(shiftDetail);
            shiftDetail.setPresent(true);
        }

        this.shiftDetailRepository.saveAllAndFlush(shiftDetails);
        return new SuccessfulResponse(HttpStatus.OK, "Chấm công thành công", shiftDetails);
    }

    /*Chỉnh sửa lại lịch nếu như có thay đổi, ghi chú lại lý do thay đổi*/
    public void editScheduleEmployee() {

    }

    /*Hủy lịch của 1 nhân viên, ghi chú lại lý do thay đổi*/
    public void cancelScheduleEmployee() {

    }

}
