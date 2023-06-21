package company.app.employermanagement.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"shiftListId", "date"})})
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shiftListId", referencedColumnName = "id")
    private ShiftList shiftList;
    private String task;
    private String date;
    @NotNull
    @ManyToOne()
    @JoinColumn(referencedColumnName = "uid")
    private User schedule_by;
    @CreationTimestamp
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    private LocalDateTime updatedDateTime;

    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
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

    public Shift(Shift shift) {
        this.id = shift.getId();
        this.shiftList = shift.getShiftList();
        this.task = shift.getTask();
        this.date = shift.getDate();
        this.schedule_by = shift.getSchedule_by();
    }

    public Shift(Long id, ShiftList shiftList, String task, String date, User schedule_by) {
        this.id = id;
        this.shiftList = shiftList;
        this.task = task;
        this.date = date;
        this.schedule_by = schedule_by;
    }

    public Shift() {

    }

    @Override
    public String toString() {
        return "Shift{" +
                "id=" + id +
                ", shiftList=" + shiftList +
                ", task='" + task + '\'' +
                ", date='" + date + '\'' +
                ", schedule_by=" + schedule_by +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public List<String> getUsers() {
//        return users;
//    }
//    public void setUsers(List<String> users) {
//        this.users = users;
//    }
    public ShiftList getShiftList() {
        return shiftList;
    }

    public void setShiftList(ShiftList shiftList) {
        this.shiftList = shiftList;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public User getSchedule_by() {
        return schedule_by;
    }

    public void setSchedule_by(User schedule_by) {
        this.schedule_by = schedule_by;
    }
}
