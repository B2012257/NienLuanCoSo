package company.app.employermanagement.repositories;

import company.app.employermanagement.models.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftDetailRepository extends JpaRepository<Shift, String> {
    Shift save(Shift shiftDetail);
}
