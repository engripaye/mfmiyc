package dev.engripaye.mfmiyc.exception;

import dev.engripaye.mfmiyc.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleException(
            MethodArgumentNotValidException exception
    ){
        String message = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .distinct()
                .collect(Collectors.joining(" "));

        return ResponseEntity.badRequest()
                .body(new ApiResponse(false, message));
    }

    @ExceptionHandler(GoogleSheetsException.class)
    public ResponseEntity<ApiResponse> handleGoogleSheets(
            GoogleSheetsException exception
    ) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(new ApiResponse(
                        false,
                        "The form could not be saved right now. Please try again."
                ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleUnexpected(Exception exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(
                        false,
                        "An unexpected error occurred."
                ));
    }
}
