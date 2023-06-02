package company.app.employermanagement.responses;

import org.springframework.http.HttpStatus;

public class LogoutResponse extends Response {
    public LogoutResponse(HttpStatus status, String message) {
        super(status, message);
    }
}
