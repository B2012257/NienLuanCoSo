package company.app.employermanagement.models;

import jakarta.persistence.*;

@Entity
//@IdClass(Shift_detailId.class)
public class Shift_detail {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
        @ManyToOne
        @JoinColumn(name = "user_uid")
        private User user;
        @ManyToOne
        @JoinColumn(name = "shift_id")
        private Shift shift;

        private int overtime;
        String note;
        int totalTime;
        String start;
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


