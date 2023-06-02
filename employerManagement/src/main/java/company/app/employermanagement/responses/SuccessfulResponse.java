package company.app.employermanagement.responses;

import company.app.employermanagement.models.User;
import org.springframework.http.HttpStatus;

public class SuccessfulResponse extends Response {
    private User user;
    public SuccessfulResponse(HttpStatus status, String message) {
        super(status, message);
    }
    public SuccessfulResponse(HttpStatus status, String message, User user) {
        super(status, message);
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
