package company.app.employermanagement.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Collection;

@Entity
public class Role {
    @Id
    String name;
    @NotNull
    @OneToOne
    @JoinColumn(name = "salary_level",referencedColumnName = "level")
    Salary salary;

    public Salary getSalary() {
        return salary;
    }

    public void setSalary(Salary salary) {
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role(String name, Salary salary_level) {
        this.name = name;
        this.salary = salary_level;
    }

    public Role() {
    }

    @Override
    public String toString() {
        return "Role{" +
                "name='" + name + '\'' +
                ", salary_level=" + salary +
                '}';
    }
}
