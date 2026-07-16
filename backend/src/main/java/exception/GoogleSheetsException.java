package exception;

public class GoogleSheetsException extends RuntimeException{

    public GoogleSheetsException(String message, Throwable cause) {
        super(message, cause);
    }
}
