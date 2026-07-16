package service;

import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;
import dto.MemberFormRequest;
import exception.GoogleSheetsException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class GoogleSheetsMemberFormService implements MemberFormService {

    private final Sheets sheets;
    private final String spreadsheetId;
    private final String sheetName;


    public GoogleSheetsMemberFormService(
            Sheets sheets,
            @Value("${google.sheets.spreadsheet-id}") String spreadsheetId,
            @Value("${google.sheets.sheet-name:Members}") String sheetName
    ) {
        this.sheets = sheets;
        this.spreadsheetId = spreadsheetId;
        this.sheetName = sheetName;
    }

    @Override
    public void saveSubmission(MemberFormRequest request) {
        List<Object> row = List.of(
                clean(request.name()),
                clean(request.number()),
                clean(request.socialMediaHandle()),
                clean(request.houseAddress()),
                clean(request.prayerRequest()),
                request.birthdayDate().toString(),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );

        ValueRange body = new ValueRange().setValues(List.of(row));
        String range = "'" + sheetName.replace("'", "''") + "'!A:G";

        try {
            sheets.spreadsheets()
                    .values()
                    .append(spreadsheetId, range, body)
                    .setValueInputOption("USER_ENTERED")
                    .setInsertDataOption("INSERT_ROWS")
                    .execute();
        } catch (IOException exception) {
            throw new GoogleSheetsException(
                    "Failed to append member form submission to Google Sheets.",
                    exception
            );
        }
    }

    private String clean(String value) {
        if (value == null) {
            return "";
        }

        String trimmed = value.trim();

        // Stops spreadsheet-formula injection from public input.
        if (trimmed.startsWith("=")
                || trimmed.startsWith("+")
                || trimmed.startsWith("-")
                || trimmed.startsWith("@")) {
            return "'" + trimmed;
        }

        return trimmed;
    }

}
