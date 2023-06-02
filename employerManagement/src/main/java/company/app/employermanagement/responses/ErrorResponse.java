package company.app.employermanagement.responses;

import org.springframework.http.HttpStatus;

public class ErrorResponse extends Response {
    public ErrorResponse(HttpStatus status, String message) {
        super(status, message);
    }

}
