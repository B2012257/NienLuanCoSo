package company.app.employermanagement.controllers;

import company.app.employermanagement.models.*;
import company.app.employermanagement.models.Shift;
import company.app.employermanagement.repositories.ShiftListRepository;
import company.app.employermanagement.requests.UpdatePresent;
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


    @RoleRequired(value = {"Quản lý"}) // Có 1 role là được truy cập
    @GetMapping("/roles")
    public List<Role> getRoles() {
        /* redirect to register api */
        return this.managerService.getRoles();
    }

    @RoleRequired(value = {"Quản lý"}) // Có 1 role là được truy cập
    @PostMapping("/employee/add")
    public Response addEmployee(@RequestBody User employeeDetail) {
        /* redirect to register api */
        return this.managerService.addEmployee(employeeDetail);
    }

    /* Danh sách các nhân viên kèm 1 số thông tin cơ bản, có thể xem chi tiết nhân viên */
    @GetMapping("/employees")
    @LoginRequired
    @RoleRequired({"Quản lý"})
    public List<User> allEmployee() {
        return this.managerService.allEmployee();
    }

    @GetMapping("/employees/search")
    @LoginRequired
    @RoleRequired({"Quản lý"})
    public List<User> searchEmployeeByName(@RequestParam(name = "name") String name) {
        return this.managerService.searchEmployeeByName(name);
    }

    @DeleteMapping("/shiftType/delete")
    @LoginRequired
    @RoleRequired({"Quản lý"})
    public Response DeleteShiftTypes(@RequestParam(name = "id") Long id) {
        return this.managerService.DeleteShiftTypes(id);
    }

    @GetMapping("/shiftTypes")
    @LoginRequired
    @RoleRequired({"Quản lý"})
    public List<ShiftList> getShiftTypes() {
        return this.managerService.getShiftTypes();
    }

    //Thông tin chi tiết của 1 nhân viên
    @LoginRequired
    @GetMapping("/employee/detail")
    public Response detailEmployee(@RequestParam(name = "uid") String uid) {
        return this.managerService.detailEmployee(uid);
    }

    @PostMapping("/employee/edit/{uid}")
    public void editEmployee() {

    }

    @PostMapping("/employee/delete/{uid}")
    public void deleteEmployee() {

    }

    @LoginRequired
    @PostMapping("/shift/create")
    public Object createShift(@RequestBody Shift shift) {

        return managerService.createShift(shift);
    }

    @LoginRequired
    @GetMapping("/shifts")
    public Shift getShiftOfDay(@RequestParam(name = "date") String date, @RequestParam(name = "id") Long id) {

        return managerService.getShiftOfDay(date, id);
    }

    @LoginRequired
    @GetMapping("/shiftsSchedules")
    public Object getShiftScheduleOfDay(@RequestParam(name = "date") String date, @RequestParam(name = "id") Long id) {

        return this.managerService.getShiftScheduleOfDay(date, id);
    }


    @LoginRequired
    @PostMapping("/shiftDetail/delete")
    public Response DeleteShiftDetails(@RequestParam(name = "id") String shiftId) {

        return this.managerService.DeleteShiftDetails(shiftId);
    }
    @LoginRequired
    @PostMapping("/shift/delete")
    public Response DeleteShift(@RequestParam(name = "id") String shiftId) {

        return this.managerService.deleteShift(shiftId);
    }



    /* sắp lịch làm (Dự kiến giao diện sẽ hiện ra danh sách các nhân viên,
     sau đó chỉ cần chọn ngày làm, giờ bắt đầu, ca, trạng thái làm việc hiện tại.
     Giao diện cho thêm nút chỉnh sửa nếu có cần chỉnh lịch tăng ca */
    @LoginRequired
    @PostMapping("/employee/schedule")
    public List<Shift_detail> scheduleEmployee(@RequestBody List<Shift_detail> shiftDetail) {


        return this.managerService.scheduleEmployee(shiftDetail);
    }

    @LoginRequired
    @GetMapping("/employee/schedules")
    public Object getAllScheduleInfo(@RequestParam("date") String date) {
        return this.managerService.getAllScheduleInfo(date);
    }

    @PostMapping("/employee/updatePresent")
    public Object updatePresent(@RequestBody UpdatePresent shiftDT_id) {
        return this.managerService.updatePresent(shiftDT_id);
    }

    /*Chỉnh sửa lại lịch nếu như có thay đổi, ghi chú lại lý do thay đổi*/
    @LoginRequired
    @PostMapping("/employee/schedule/edit")
    public void editScheduleEmployee() {

    }

    @LoginRequired
    /*Hủy lịch của 1 nhân viên, ghi chú lại lý do thay đổi*/
    @PostMapping("/employee/schedule/cancel")
    public void cancelScheduleEmployee() {

    }
    @LoginRequired
    @GetMapping("/schedule/dayToDay")
    public Response getScheduleFromDayToDay(@RequestParam(name = "start") String startDay, @RequestParam(name = "end") String endDay){
        return this.managerService.getScheduleFromDayToDay(startDay, endDay);
    }

    @LoginRequired
    @GetMapping("/employee/total")
    public Response totalEmployee() {
        return this.managerService.totalEmployee();
    }

    @LoginRequired
    @PostMapping("/employee/schedule/createShift")
    public ShiftList createShift(@RequestBody ShiftList shiftList) {

        return this.shiftListRepository.save(shiftList);
    }
}
