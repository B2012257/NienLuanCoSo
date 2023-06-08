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
    Boolean existsByShiftListIdAndDate(Long shiftListId, String date);
    List<Shift> findAllByDate(String date);
}
