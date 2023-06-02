package company.app.employermanagement.controllers;

import company.app.employermanagement.models.Shift;
import company.app.employermanagement.models.ShiftList;
import company.app.employermanagement.models.Shift;
import company.app.employermanagement.models.User;
import company.app.employermanagement.repositories.ShiftRepository;
import company.app.employermanagement.responses.Response;
import company.app.employermanagement.services.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//Yêu cầu role Nhân viên,
//Yêu cầu đã đăng nhập mới được truy cập
@RestController
@RequestMapping(path = "/api/manager")
public class ManagerController {
    @Autowired
    private ManagerService managerService;
    @Autowired
    ShiftRepository shiftRepository;
    @PostMapping("/employee/add")
    public Response addEmployee(@RequestBody User employeeDetail) {
        /* redirect to register api */
        return this.managerService.addEmployee(employeeDetail);
    }

    /* Danh sách các nhân viên kèm 1 số thông tin cơ bản, có thể xem chi tiết nhân viên */
    @GetMapping("/employees")
    public void allEmployee() {

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

    /* sắp lịch làm (Dự kiến giao diện sẽ hiện ra danh sách các nhân viên,
     sau đó chỉ cần chọn ngày làm, giờ bắt đầu, ca, trạng thái làm việc hiện tại.
     Giao diện cho thêm nút chỉnh sửa nếu có cần chỉnh lịch tăng ca */
    @PostMapping("/employee/schedule")
    public Shift scheduleEmployee(@RequestBody Shift shift) {
        return this.managerService.scheduleEmployee(shift);
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

            return this.shiftRepository.save(shiftList);
    }
}
