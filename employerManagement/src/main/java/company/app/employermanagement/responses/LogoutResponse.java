package company.app.employermanagement.responses;

import org.springframework.http.HttpStatus;

public class LogoutResponse {
    HttpStatus status;
    String message;

    public LogoutResponse() {
    }

    public LogoutResponse(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
