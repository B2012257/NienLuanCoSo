package company.app.employermanagement.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @NotNull
    String name;
    @NotNull
    String timeline;

    public Shift(Long id, String name, String timeline) {
        this.id = id;
        this.name = name;
        this.timeline = timeline;
    }

    public Shift() {

    }

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

    public String getTimeline() {
        return timeline;
    }

    public void setTimeline(String timeline) {
        this.timeline = timeline;
    }

    @Override
    public String toString() {
        return "Shift{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", timeline='" + timeline + '\'' +
                '}';
    }
}
