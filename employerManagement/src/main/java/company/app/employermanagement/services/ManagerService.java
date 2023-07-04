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
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Block;
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
    @PersistenceContext
    private EntityManager entityManager;

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
        User userDb =  this.userRepository.findOneByUid(uid);
        this.userRepository.delete(userDb);
        this.userRepository.flush();
        return new SuccessfulResponse(HttpStatus.OK, "Xóa thành công");
    }

    public Object createShift(Shift shift) {
        String userUid = shift.getSchedule_by().getUid();
        Long shiftListId = shift.getShiftList().getId();
        User us = userRepository.findOneByUid(userUid);
        ShiftList shiftLs = shiftListRepository.findOneById(shiftListId);
        Shift shiftRes = new Shift(shift);
        System.out.println(shiftRes);

        //Kiểm tra có trùng ngày hay không
//        Boolean isExistByDate = shiftRepository.existsByDate(shift.getDate());
        System.out.println(this.shiftRepository.existsByShiftListIdAndDateAndIsDeleted(shiftListId, shift.getDate(), false) + "test");
        if (!this.shiftRepository.existsByShiftListIdAndDateAndIsDeleted(shiftListId, shift.getDate(), false)) {
//            us.setPassword("");
            shiftRes.setShiftList(shiftLs);
            shiftRes.setSchedule_by(us);
            shiftRes.setDeleted(false);
            Shift rs = shiftRepository.save(shiftRes);
            if (rs != null) {
                System.out.println(rs);
                return rs;
            }
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
        System.out.println(shiftDetails);
        return this.shiftDetailRepository.saveAllAndFlush(shiftDetails);

    }

    public Shift getShiftOfDay(String date, Long typeId) {
        System.out.println(typeId);
        return this.shiftRepository.findAllByDateAndShiftListIdAndIsDeleted(date, typeId, false);

    }

    public Response getScheduleFromDayToDay(String dayStart, String dayEnd) {
        // Tìm id ca từ ngày start đến ngày end
        //từ id lấy ra details ca
        //Trả về
        List<Shift> shifts = this.shiftRepository.findByDateBetweenAndIsDeleted(dayStart, dayEnd, false);
        if(shifts.size() ==0) {
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy ca!");
        }else {
            //Lấy các shift Detail từ các bản shift
            List<Shift_detail> shiftDetails = this.shiftDetailRepository.findAllByShiftIn(shifts);
            return new SuccessfulResponse(HttpStatus.OK, "Thành công", shiftDetails);

        }
    }

    public Response DeleteShiftDetails(String shiftId) {
        System.out.println(shiftId);
        //Lấy ra các shiftDetails dựa vào id
        List<Shift_detail> shiftDetails = this.shiftDetailRepository.findAllByShift_id(Long.valueOf(shiftId));

        if(shiftDetails.size() > 0) {
            try {
                this.shiftDetailRepository.deleteAll(shiftDetails);
                this.shiftDetailRepository.flush();
                Shift shiftDb = this.shiftRepository.findOneById(Long.valueOf(shiftId));
                shiftDb.setDeleted(true);
                this.shiftRepository.save(shiftDb);

                return new SuccessfulResponse(HttpStatus.OK, "Xóa thành công lịch các nhân viên " + shiftDb.getShiftList().getName() + " ngày: " + shiftDb.getDate());
            } catch (Exception e) {
                return new ErrorResponse(HttpStatus.NOT_FOUND, "Xóa không thành công lịch làm");
            }
        }
        return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy ca cần xóa");
    }


        public Response deleteShift(String shiftId) {
            System.out.println(shiftId);
            //Lấy ra các shiftDetails dựa vào id
            try {
                Shift shiftDb = this.shiftRepository.findOneById(Long.valueOf(shiftId));
                shiftDb.setDeleted(true);
                this.shiftRepository.save(shiftDb);
                System.out.println(shiftDb);

                return new SuccessfulResponse(HttpStatus.OK, "Xóa thành công lịch ca làm " + shiftDb.getShiftList().getName() + " ngày: " + shiftDb.getDate(), shiftDb);
            } catch (Exception e) {
                return new ErrorResponse(HttpStatus.OK, "Xóa khong thanh cong");

            }
        }

    public Object getShiftScheduleOfDay(String date, Long typeId) {
        System.out.println(typeId);
        Shift shift = this.shiftRepository.findAllByDateAndShiftListIdAndIsDeleted(date, typeId, false);
        System.out.println(shift);

        if (shift != null) {
            Long shift_id = shift.getId();
            return this.shiftDetailRepository.findAllByShift_id(shift_id);
        }
        return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin ca làm");
    }

    //Hiển thị danh sách nhân viên làm trong ngày
    public Object getAllScheduleInfo(String date) {
        //Lấy ra các ca trong ngày
        List<Shift> shifts = this.shiftRepository.findAllByDateAndIsDeleted(date, false);
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

    public String totalEmployeeInWorking() {
        //Tìm số lượng nhân viên làm viiệc hôm nay
       String dNow = String.valueOf((java.time.LocalDate.now()));
        // Lấy ra các ca trong ngày
        List<Shift> shifts = this.shiftRepository.findAllByDateAndIsDeleted(dNow, false);
        List shift_details = this.shiftDetailRepository.findAllByShiftIn(shifts);
    return String.valueOf((shift_details.size()));
    }

}
