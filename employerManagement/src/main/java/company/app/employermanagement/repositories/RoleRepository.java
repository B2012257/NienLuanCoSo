package company.app.employermanagement.repositories;

import company.app.employermanagement.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {
    List<Role> findAll();
}
