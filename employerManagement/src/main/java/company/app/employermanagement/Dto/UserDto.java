package company.app.employermanagement.Dto;

import company.app.employermanagement.models.User;

import java.time.LocalDateTime;

public class UserDto {
    String uid;
    String user_name;
    String full_name;
    String password;
    String birthday;
    String email;
    String phone;
    String avatar_url;
    String identification;
    String role_name;
    String bank;
    LocalDateTime updatedDateTime;
    LocalDateTime createdDateTime;
    String startWorkFromDay;

    public UserDto(String uid, String user_name, String full_name, String password, String birthday, String email, String phone, String avatar_url, String identification, String role_name, String bank, LocalDateTime updatedDateTime, LocalDateTime createdDateTime, String startWorkFromDay) {
        this.uid = uid;
        this.user_name = user_name;
        this.full_name = full_name;
        this.password = password;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
        this.avatar_url = avatar_url;
        this.identification = identification;
        this.role_name = role_name;
        this.bank = bank;
        this.updatedDateTime = updatedDateTime;
        this.createdDateTime = createdDateTime;
        this.startWorkFromDay = startWorkFromDay;
    }
    public UserDto(User user) {
        this.uid = user.getUid();
        this.avatar_url = user.getAvatarUrl();
        this.bank = user.getBank();
        this.email = user.getEmail();
        this.birthday = user.getBirthday();
        this.createdDateTime = user.getCreatedDateTime();
        this.full_name = user.getFullName();
        this.identification = user.getIdentification();
        this.phone = user.getPhone();
        this.role_name = user.getRoleName();
        this.startWorkFromDay = user.getStartWorkFromDay();
        this.updatedDateTime = user.getUpdatedDateTime();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
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

    public String getAvatar_url() {
        return avatar_url;
    }

    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public String getRole_name() {
        return role_name;
    }

    public void setRole_name(String role_name) {
        this.role_name = role_name;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public LocalDateTime getUpdatedDateTime() {
        return updatedDateTime;
    }

    public void setUpdatedDateTime(LocalDateTime updatedDateTime) {
        this.updatedDateTime = updatedDateTime;
    }

    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(LocalDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public String getStartWorkFromDay() {
        return startWorkFromDay;
    }

    public void setStartWorkFromDay(String startWorkFromDay) {
        this.startWorkFromDay = startWorkFromDay;
    }
}
