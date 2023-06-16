package company.app.employermanagement.repositories;

import company.app.employermanagement.models.ShiftList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftListRepository extends JpaRepository<ShiftList, Long> {
    ShiftList save(ShiftList shiftList);
    ShiftList findOneById(Long id);


    void deleteById(Long id);
}
