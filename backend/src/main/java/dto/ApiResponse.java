package dto;

public record ApiResponse(
        boolean success,
        String message
) {
}
