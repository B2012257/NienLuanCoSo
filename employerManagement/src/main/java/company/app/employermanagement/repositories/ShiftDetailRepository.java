package company.app.employermanagement.repositories;

import company.app.employermanagement.models.Shift;
import company.app.employermanagement.models.Shift_detail;
import company.app.employermanagement.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShiftDetailRepository extends JpaRepository<Shift_detail, Long> {
    Shift_detail save(Shift shiftDetail);

    List<Shift_detail> findAllByShiftIn(List<Shift> shifts);

    List<Shift_detail> findAllByShift_id(Long id);
//    User findByUser_uid(String uid);

}