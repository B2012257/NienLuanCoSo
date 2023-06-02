//package company.app.employermanagement.services;
//
//import company.app.employermanagement.repositories.*;
//import company.app.employermanagement.models.*;
//
//import jakarta.servlet.http.HttpSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
////import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.RequestBody;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class authService {
//    @Autowired
//    UserRepository userRepository;
//    private final Argon2PasswordEncoder encoder;
//
//    private Map<String, Object> onlineUser = new HashMap<String, Object>();
//
//    public authService() {
//        this.encoder = new Argon2PasswordEncoder(12, 64, 1, 15 * 1024, 2);
//    }
//
//    private HttpSession session;
//
//    public ResponseEntity<Object> register(User userReq) {
//
//        String userNameRes = userReq.getUserName();
//        String myPassword = userReq.getPassword();
//
//        User userDB = this.userRepository.findOneByUserName(userNameRes);
//        //Encode password
//        String encodedPassword = encoder.encode(myPassword);
////        System.out.println(encodedPassword);
//        userReq.setPassword(encodedPassword);
//        if(userReq.getStatus() == null) {
//            userReq.setStatus("");
//        }
//
//        if (userDB == null) {
//            //Save
//            userReq.setAvatarUrl("https://th.bing.com/th/id/OIP.fGYoopo_oN_1QZnCmAXz3wHaHa?pid=ImgDet&rs=1");
//            User saver = this.userRepository.save(userReq);
//            return ResponseEntity.ok(saver);
//        }
//
//        return new ResponseEntity<>("{\"message\": \"This account already in the system\"}",
//                HttpStatus.NOT_ACCEPTABLE);
//
//    }
//
//    public ResponseEntity<Object> login(@RequestBody Map<String, String> requestBody, HttpSession session) {
////        HttpHeaders headers = new HttpHeaders();
////        headers.setContentType(MediaType.APPLICATION_JSON);
//        this.session = session;
//        String username = requestBody.get("username");
//        String password = requestBody.get("password");
//
////        System.out.println(username + password);
//
//        User userDB = this.userRepository.findOneByUserName(username);
//
//        //Have username
//        if (userDB != null) {
//            var validPassword = encoder.matches(password, userDB.getPassword());
//            System.out.println(validPassword);
//            //right password
//            if (validPassword) {
//
//
//                //Add uid in to this.session
//                this.session.setAttribute("uid", userDB.getUid());
//                return new ResponseEntity<>(userDB, HttpStatus.OK);
//            } else /*Wrong password*/
//                return new ResponseEntity<>("Wrong password", HttpStatus.NOT_FOUND);
//        }
////      Doesn't exist account
//        return new ResponseEntity<>("Doesn't exist this account", HttpStatus.NOT_FOUND);
//
//    }
//
//    public ResponseEntity<Object> logout(@RequestBody Map<String, String> requestBody) {
//        if (this.session == null)
//            return new ResponseEntity<>(
//                    "{\"message\": \"Đăng xuất thành công\", \"status\": 200}", HttpStatus.OK);
//        else {
//            //remove this session through uid
//            this.session.removeAttribute("uid");
//            System.out.println(this.session.getAttribute("uid") + "hihi");
//            return new ResponseEntity<>(
//                    "{\"message\": \"Đăng xuất thành công\", \"status\": 200}", HttpStatus.OK);
//        }
//
//    }
//}
