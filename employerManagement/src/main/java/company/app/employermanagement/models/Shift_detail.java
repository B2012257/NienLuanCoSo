package company.app.employermanagement.models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
public class Shift_detail {
    @Id
    private String userUid;
    @Id
    private Long shift_id;
    @Id
    private Date date;
    Date start;
    Date end;
    int overtime; // unit /h vd: 1h, 2h, 0.5h,...
    String note;
    Date schedule_by;
    Date schedule_at;
    @ManyToOne
    @JoinColumn(name = "userUid", referencedColumnName = "uid", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "shift_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Shift shift;

    public Shift_detail() {
    }

    public Shift_detail(String userUid,
                        Long shift_id,
                        Date date,
                        Date start,
                        Date end,
                        int overtime,
                        String note,
                        Date schedule_by,
                        Date schedule_at,
                        User user,
                        Shift shift) {
        this.userUid = userUid;
        this.shift_id = shift_id;
        this.date = date;
        this.start = start;
        this.end = end;
        this.overtime = overtime;
        this.note = note;
        this.schedule_by = schedule_by;
        this.schedule_at = schedule_at;
        this.user = user;
        this.shift = shift;
    }
    public String getUserUid() {
        return userUid;
    }

    public void setUserUid(String userUid) {
        this.userUid = userUid;
    }

    public Long getShift_id() {
        return shift_id;
    }

    public void setShift_id(Long shift_id) {
        this.shift_id = shift_id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getStart() {
        return start;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Date getSchedule_by() {
        return schedule_by;
    }

    public void setSchedule_by(Date schedule_by) {
        this.schedule_by = schedule_by;
    }

    public Date getSchedule_at() {
        return schedule_at;
    }

    public void setSchedule_at(Date schedule_at) {
        this.schedule_at = schedule_at;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public int getOvertime() {
        return overtime;
    }

    public void setOvertime(int overtime) {
        this.overtime = overtime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Shift getShift() {
        return shift;
    }

    public void setShift(Shift shift) {
        this.shift = shift;
    }

    @Override
    public String toString() {
        return "Shift_detail{" +
                "userUid=" + userUid +
                ", shift_id=" + shift_id +
                ", date=" + date +
                ", start=" + start +
                ", end=" + end +
                ", overtime=" + overtime +
                ", note='" + note + '\'' +
                ", schedule_by=" + schedule_by +
                ", schedule_at=" + schedule_at +
                ", user=" + user +
                ", shift=" + shift +
                '}';
    }
}

