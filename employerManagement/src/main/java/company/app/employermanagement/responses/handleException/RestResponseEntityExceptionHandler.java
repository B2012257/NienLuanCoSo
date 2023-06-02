package company.app.employermanagement.responses.handleException;

import company.app.employermanagement.responses.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(ForbiddenAccessException.class) //Match với ForbiddenAccessException
    protected ResponseEntity<Object> handleForbiddenAccessException(ForbiddenAccessException ex) {
        String errorMessage = ex.getMessage();
        // Xây dựng đối tượng ErrorResponse chứa thông báo lỗi
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.FORBIDDEN, errorMessage);
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(CustomAuthenticationException.class) //Match với ForbiddenAccessException
    protected ResponseEntity<Object> handleForbiddenAccessException(CustomAuthenticationException ex) {
        String errorMessage = ex.getMessage();
        // Xây dựng đối tượng ErrorResponse chứa thông báo lỗi
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED, errorMessage);
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
}
