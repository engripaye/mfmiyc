package dev.engripaye.mfmiyc;

import com.google.api.services.sheets.v4.Sheets;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
class MfmiycApplicationTests {

    @MockitoBean
    private Sheets sheets;

    @Test
    void contextLoads() {
    }

}
