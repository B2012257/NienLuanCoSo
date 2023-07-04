package company.app.employermanagement.repositories;

import company.app.employermanagement.models.Shift;
import company.app.employermanagement.models.ShiftList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    Shift save(Shift shift);
    Boolean existsByDate(String date);
    Boolean existsByShiftListId(Long id);
    Boolean existsByShiftListIdAndDateAndIsDeleted(Long shiftListId, String date, Boolean isDeleted);
    List<Shift> findAllByDateAndIsDeleted(String date, Boolean isDeleted);
    Shift findAllByDateAndShiftListIdAndIsDeleted(String date, Long id, Boolean isDeleted);
    List<Shift> findByDateBetweenAndIsDeleted(String startDate, String endDate, Boolean isDeleted);

    Shift findOneById(Long id);
}
