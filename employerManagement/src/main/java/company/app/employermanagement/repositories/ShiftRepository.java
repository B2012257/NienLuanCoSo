package company.app.employermanagement.repositories;

import company.app.employermanagement.models.Shift;
import company.app.employermanagement.models.ShiftList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    Shift save(Shift shift);

}
