package dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record MemberFormRequest(
        @NotBlank(message = "Name is required.")
        @Size(max = 120, message = "Name must not exceed 120 characters.")
        String name,

        @NotBlank(message = "Phone number is required.")
        @Pattern(
                regexp = "^[+0-9][0-9\\s-]{7,19}$",
                message = "Enter a valid phone number."
        )
        String number,

        @Size(
                max = 120,
                message = "Social media handle must not exceed 120 characters."
        )
        String socialMediaHandle,

        @NotBlank(message = "House address is required.")
        @Size(
                max = 300,
                message = "House address must not exceed 300 characters."
        )
        String houseAddress,

        @Size(
                max = 2000,
                message = "Prayer request must not exceed 2,000 characters."
        )
        String prayerRequest,

        @NotNull(message = "Birthday date is required.")
        @PastOrPresent(message = "Birthday date cannot be in the future.")
        LocalDate birthdayDate
) {
}
