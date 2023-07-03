package company.app.employermanagement.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import company.app.employermanagement.untils.RandomIdUntil;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
//@Table(name = "user")
public class User {
    @Id
    private String uid;
    @NotNull
    @Column(name = "user_name")
    String userName;
    @NotNull
    @Column(name = "full_name")
    String fullName;
    @NotNull
    String password;
    String birthday;
    @NotNull
    String email;
    @NotNull
    String phone;
    @Column(name = "avatar_url")
    String avatarUrl;
    @NotNull
    String identification; //CCCD/CMND
    String bank;
    @NotNull
    @Column(name = "role_name")
    private String roleName;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "role_name",
            referencedColumnName = "name",
            insertable = false, updatable = false) //Khoa ngoai tham chieu cot name trong Role
    private Role role; // Tham chiều tới trường roleName
    String gender;
    @CreationTimestamp
    private LocalDateTime createdDateTime;
    String startWorkFromDay;
    @UpdateTimestamp
    private LocalDateTime updatedDateTime;
    public String getGender() {
        return gender;
    }

    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public String getStartWorkFromDay() {
        return startWorkFromDay;
    }

    public void setStartWorkFromDay(String startWorkFromDay) {
        this.startWorkFromDay = startWorkFromDay;
    }

    public void setCreatedDateTime(LocalDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public LocalDateTime getUpdatedDateTime() {
        return updatedDateTime;
    }

    public void setUpdatedDateTime(LocalDateTime updatedDateTime) {
        this.updatedDateTime = updatedDateTime;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public User() {
        this.uid = new RandomIdUntil().randomId();
        this.bank = "";
        this.birthday = "";
        this.phone = "";
        this.avatarUrl = "";
    }

    public User(String uid,
                String user_name,
                String full_name,
                String password, String birthday,
                String email, String phone, String avatar_url,
                String identification,
                String role_name,
                String bank, LocalDateTime updatedDateTime, LocalDateTime createdDateTime, String startWorkFromDay) {
        this.uid = uid;
        this.userName = user_name;
        this.fullName = full_name;
        this.password = password;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
        this.avatarUrl = avatar_url;
        this.identification = identification;
        this.bank = bank;
        this.roleName = role_name;
        this.createdDateTime = createdDateTime;
        this.updatedDateTime = updatedDateTime;
        this.startWorkFromDay = startWorkFromDay;
    }

    public User(User user) {
        this.uid = user.getUid();
        this.userName = user.getUserName();
        this.fullName = user.getFullName();
        this.password = user.getPassword();
        this.birthday = user.getBirthday();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.avatarUrl = user.getAvatarUrl();
        this.identification = user.getIdentification();
        this.bank = user.getBank();
        this.roleName = user.getRoleName();
        this.startWorkFromDay = user.getStartWorkFromDay();
        this.createdDateTime = user.getCreatedDateTime();
        this.updatedDateTime = user.getUpdatedDateTime();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "uid='" + uid + '\'' +
                ", userName='" + userName + '\'' +
                ", fullName='" + fullName + '\'' +
                ", password='" + password + '\'' +
                ", birthday='" + birthday + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", identification='" + identification + '\'' +
                ", bank='" + bank + '\'' +
                ", roleName='" + roleName + '\'' +
                ", role=" + role +
                ", gender='" + gender + '\'' +
                ", createdDateTime=" + createdDateTime +
                ", startWorkFromDay='" + startWorkFromDay + '\'' +
                ", updatedDateTime=" + updatedDateTime +
                '}';
    }
}
