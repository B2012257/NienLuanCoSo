package company.app.employermanagement.models;

import company.app.employermanagement.requests.ScheduleRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "shift_detail", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_uid", "shift_id"})})
public class Shift_detail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_uid")
    private User user_uid;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "shift_id")
    private Shift shift;
    @NotNull
    int overtime;
    @NotNull
    String note;
    @NotNull
    int totalTime;
    @NotNull
    int start;
    @NotNull
    int end;

    @CreationTimestamp
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    private LocalDateTime updatedDateTime;
    boolean isPresent = false;

    public Shift getShift() {
        return shift;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser_uid() {
        return user_uid;
    }

    public void setUser_uid(User user_uid) {
        this.user_uid = user_uid;
    }

    public void setShift(Shift shift) {
        this.shift = shift;
    }

    public int getOvertime() {
        return overtime;
    }

    public void setOvertime(int overtime) {
        this.overtime = overtime;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getEnd() {
        return end;
    }

    public void setEnd(int end) {
        this.end = end;
    }

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

    public boolean isPresent() {
        return isPresent;
    }

    public void setPresent(boolean present) {
        isPresent = present;
    }

    @Override
    public String toString() {
        return "Shift_detail{" +
                "id=" + id +
                ", user_uid=" + user_uid +
                ", shift=" + shift +
                ", overtime=" + overtime +
                ", note='" + note + '\'' +
                ", totalTime=" + totalTime +
                ", start=" + start +
                ", end=" + end +
                ", createdDateTime=" + createdDateTime +
                ", updatedDateTime=" + updatedDateTime +
                ", isPresent=" + isPresent +
                '}';
    }
}


