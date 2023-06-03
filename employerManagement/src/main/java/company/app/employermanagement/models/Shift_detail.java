package company.app.employermanagement.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "shift_detail", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_uid", "shift_id"})})
public class Shift_detail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_uid")
    private User user;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "shift_id")
    private Shift shift;
    @NotNull
    private int overtime;
    @NotNull
    String note;
    @NotNull
    int totalTime;
    @NotNull
    String start;
    @NotNull
    String end;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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


    public int getOvertime() {
        return overtime;
    }

    public void setOvertime(int overtime) {
        this.overtime = overtime;
    }

    // Constructors, getters, setters
}


