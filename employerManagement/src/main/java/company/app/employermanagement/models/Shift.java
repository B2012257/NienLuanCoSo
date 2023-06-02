package company.app.employermanagement.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Shift {
    @Id
    private Long id;
    @OneToOne
    @JoinColumn(name = "task_id")
    private Task taskId;
    @ManyToMany(mappedBy = "shifts")
    private Set<User> users;
    @ManyToOne
    @JoinColumn(name = "shiftListId", referencedColumnName = "id")
    private ShiftList shiftList;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Task getTaskId() {
        return taskId;
    }

    public void setTaskId(Task taskId) {
        this.taskId = taskId;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public ShiftList getShiftListId() {
        return shiftList;
    }

    public void setShiftListId(ShiftList shiftListId) {
        this.shiftList = shiftListId;
    }
    
}
