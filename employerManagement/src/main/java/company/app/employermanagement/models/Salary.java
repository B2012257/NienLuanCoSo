package company.app.employermanagement.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
public class Salary {
    @Id
    int level;
    @NotNull
    long base;
    @NotNull
    long overtime;
    @CreationTimestamp
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    private LocalDateTime updatedDateTime;

    public void setLevel(int level) {
        this.level = level;
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

    @NotNull
    long allowance; //Trợ cấp
    public Salary() {
    }

    public Salary(char level, long base, long overtime, long allowance) {
        this.level = level;
        this.base = base;
        this.overtime = overtime;
        this.allowance = allowance;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(char level) {
        this.level = level;
    }

    public long getBase() {
        return base;
    }

    public void setBase(long base) {
        this.base = base;
    }

    public long getOvertime() {
        return overtime;
    }

    public void setOvertime(long overtime) {
        this.overtime = overtime;
    }

    public long getAllowance() {
        return allowance;
    }

    public void setAllowance(long allowance) {
        this.allowance = allowance;
    }

    @Override
    public String toString() {
        return "Salary{" +
                "level=" + level +
                ", base=" + base +
                ", overtime=" + overtime +
                ", allowance=" + allowance +
                '}';
    }
}
