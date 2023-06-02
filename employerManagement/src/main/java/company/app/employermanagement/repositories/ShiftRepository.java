package company.app.employermanagement.repositories;

import company.app.employermanagement.models.ShiftList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftRepository  extends JpaRepository<ShiftList, Long> {
    ShiftList save(ShiftList shiftList);
}
