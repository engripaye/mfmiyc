package config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.List;

@Configuration
public class GoogleSheetsConfig {

    private static final String SHEETS_SCOPE =
            "https://www.googleapis.com/auth/spreadsheets";

    @Bean
    public Sheets sheetsClient(
            @Value("${google.service-account.file:}") String credentialsFile,
            @Value("${google.service-account.json:}") String credentialsJson,
            @Value("${spring.application.name:MFM-IYC-Member-Form}") String applicationName
    )throws IOException, GeneralSecurityException {

        GoogleCredentials credentials;

        try (InputStream inputStream = openCredentials(credentialsFile, credentialsJson)) {
            credentials = GoogleCredentials.fromStream(inputStream)
                    .createScoped(List.of(SHEETS_SCOPE));
        }

        return new Sheets.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                new HttpCredentialsAdapter(credentials)
        )
                .setApplicationName(applicationName)
                .build();

    }

    private InputStream openCredentials(
            String credentialsFile,
            String credentialsJson
    ) throws IOException {
        if (credentialsJson != null && !credentialsJson.isBlank()) {
            return new ByteArrayInputStream(
                    credentialsJson.getBytes(StandardCharsets.UTF_8)
            );
        }

        if (credentialsFile != null && !credentialsFile.isBlank()) {
            return new FileInputStream(credentialsFile);
        }

        throw new IllegalStateException(
                "Google credentials are missing. Set GOOGLE_SERVICE_ACCOUNT_JSON " +
                        "or GOOGLE_SERVICE_ACCOUNT_FILE."
        );
    }
}
