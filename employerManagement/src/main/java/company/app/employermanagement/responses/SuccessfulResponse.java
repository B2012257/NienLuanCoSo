package company.app.employermanagement.responses;

import company.app.employermanagement.models.User;
import org.springframework.http.HttpStatus;

import java.util.List;

public class SuccessfulResponse extends Response {
    private Object data;
//    private List<Object> datalist;

    public SuccessfulResponse(HttpStatus status, String message) {
        super(status, message);
    }
    public SuccessfulResponse(HttpStatus status, String message, Object user) {
        super(status, message);
        this.data = user;
    }
//    public SuccessfulResponse(HttpStatus status, String message, List datalist) {
//        super(status, message);
//        this.datalist = datalist;
//    }
    
    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

//    public List<Object> getDatalist() {
//        return datalist;
//    }
//
//    public void setDatalist(List<Object> datalist) {
//        this.datalist = datalist;
//    }
}
