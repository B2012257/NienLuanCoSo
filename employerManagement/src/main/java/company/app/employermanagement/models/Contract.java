package company.app.employermanagement.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Contract {
    @Id
    Long id;

    String pdf_link;
    String start;
    String end;
    String sign_date;

    public Contract() {
    }

    public Contract(Long id, String pdf_link, String start, String end, String sign_date) {
        this.id = id;
        this.pdf_link = pdf_link;
        this.start = start;
        this.end = end;
        this.sign_date = sign_date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPdf_link() {
        return pdf_link;
    }

    public void setPdf_link(String pdf_link) {
        this.pdf_link = pdf_link;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public String getSign_date() {
        return sign_date;
    }

    public void setSign_date(String sign_date) {
        this.sign_date = sign_date;
    }

    @Override
    public String toString() {
        return "Contract{" +
                "id=" + id +
                ", pdf_link='" + pdf_link + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                ", sign_date='" + sign_date + '\'' +
                '}';
    }
}
