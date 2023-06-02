package company.app.employermanagement.untils;

import java.util.Random;

public class PasswordGenerator {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@()";
    private static final int PASSWORD_LENGTH = 6;

    public PasswordGenerator() {
    }

    public String generateRandomPassword() {
        Random random = new Random();
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            int index = random.nextInt(CHARACTERS.length()); //Lấy ra số nguyên ngẫu nhiên từ 0 -> hết độ dài của chuỗi CHARACTERS
            password.append(CHARACTERS.charAt(index));
        }

        return password.toString();
    }

}
