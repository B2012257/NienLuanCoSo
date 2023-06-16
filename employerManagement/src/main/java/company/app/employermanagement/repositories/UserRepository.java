package company.app.employermanagement.repositories;

import company.app.employermanagement.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    User save(User entity);
    Boolean existsByUserName(String userName);
    User findOneByUserName(String userName);
    User findOneByUid(String uid);
    List<User> findAllByFullNameContains(String name);
}
