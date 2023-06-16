package company.app.employermanagement.controllers;

import company.app.employermanagement.models.*;
import company.app.employermanagement.models.Shift;
import company.app.employermanagement.repositories.ShiftListRepository;
import company.app.employermanagement.requests.ScheduleRequest;
import company.app.employermanagement.responses.Response;
import company.app.employermanagement.services.ManagerService;
import company.app.employermanagement.untils.LoginRequired;
import company.app.employermanagement.untils.RoleRequired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Yêu cầu role Nhân viên,
//Yêu cầu đã đăng nhập mới được truy cập
@RestController
@RequestMapping(path = "/api/manager")
public class ManagerController {
    @Autowired
    private ManagerService managerService;
    @Autowired
    ShiftListRepository shiftListRepository;


    @RoleRequired(value = {"Quan Ly"}) // Có 1 role là được truy cập
    @GetMapping("/roles")
    public List<Role> getRoles() {
        /* redirect to register api */
        return this.managerService.getRoles();
    }

    @RoleRequired(value = {"Quan Ly", "Admin"}) // Có 1 role là được truy cập
    @PostMapping("/employee/add")
    public Response addEmployee(@RequestBody User employeeDetail) {
        /* redirect to register api */
        return this.managerService.addEmployee(employeeDetail);
    }

    /* Danh sách các nhân viên kèm 1 số thông tin cơ bản, có thể xem chi tiết nhân viên */
    @GetMapping("/employees")
    @LoginRequired
    @RoleRequired({"Quan Ly"})
    public List<User> allEmployee() {
        return this.managerService.allEmployee();
    }
    @GetMapping("/employees/search")
    @LoginRequired
    @RoleRequired({"Quan Ly"})
    public List<User> searchEmployeeByName(@RequestParam(name = "name") String name) {
        return this.managerService.searchEmployeeByName(name);
    }

    @GetMapping("/shiftTypes")
    @LoginRequired
    @RoleRequired({"Quan Ly"})
    public List<ShiftList> getShiftTypes() {
        return this.managerService.getShiftTypes();
    }
    //Thông tin chi tiết của 1 nhân viên
    @GetMapping("/employee/detail/{uuid}")
    public void detailEmployee() {

    }

    @PostMapping("/employee/edit/{uid}")
    public void editEmployee() {

    }

    @PostMapping("/employee/delete/{uid}")
    public void deleteEmployee() {

    }

    @PostMapping("/shift/create")
    public Object createShift(@RequestBody Shift shift) {

        return managerService.createShift(shift);
    }

    /* sắp lịch làm (Dự kiến giao diện sẽ hiện ra danh sách các nhân viên,
     sau đó chỉ cần chọn ngày làm, giờ bắt đầu, ca, trạng thái làm việc hiện tại.
     Giao diện cho thêm nút chỉnh sửa nếu có cần chỉnh lịch tăng ca */
    @PostMapping("/employee/schedule")
    public Object scheduleEmployee(@RequestBody Shift_detail shiftDetail) {
        return this.managerService.scheduleEmployee(shiftDetail);
    }

    @GetMapping("/employee/schedules")
    public Object getAllScheduleInfo(@RequestParam("date") String date) {
        return this.managerService.getAllScheduleInfo(date);
    }

    /*Chỉnh sửa lại lịch nếu như có thay đổi, ghi chú lại lý do thay đổi*/
    @PostMapping("/employee/schedule/edit")
    public void editScheduleEmployee() {

    }

    /*Hủy lịch của 1 nhân viên, ghi chú lại lý do thay đổi*/
    @PostMapping("/employee/schedule/cancel")
    public void cancelScheduleEmployee() {

    }

    @PostMapping("/employee/schedule/createShift")
    public ShiftList createShift(@RequestBody ShiftList shiftList) {

        return this.shiftListRepository.save(shiftList);
    }
}
