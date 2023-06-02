package company.app.employermanagement.untils;

import java.util.ArrayList;
import java.util.List;

public class RandomIdUntil {
    private static final String PREFIX = "SB";
    private static final int CODE_LENGTH = 10000; // 4 ký tự phía sau SB -> vd SBxxxx
    private static List<Integer> generatedCodes = new ArrayList<>();
    public String randomId() {
        boolean isDuplicate;
        int randomInt;

        do {
            double randomDouble = Math.random();
            randomDouble = randomDouble * CODE_LENGTH;
            randomInt = (int) randomDouble;
            isDuplicate = generatedCodes.contains(randomInt);
        } while (isDuplicate);

        generatedCodes.add(randomInt);
        String id = PREFIX + randomInt;
        return id;
    }
}
