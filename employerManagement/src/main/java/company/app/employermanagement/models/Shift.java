package company.app.employermanagement.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Shift {
    @Id
    private Long id;
    private String name;
    @Column(name = "task_id")
    private String taskId;
    @ManyToMany(mappedBy = "shifts")
    private Set<User> users;
    @ManyToOne
    @JoinColumn(name = "shiftListId", referencedColumnName = "id")
    private ShiftList shiftList;
    @OneToOne
    @JoinColumn(name = "task_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Task task;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
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

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
// Other work attributes, getters, setters, and relationships
}
