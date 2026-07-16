package controller;

import dto.ApiResponse;
import dto.MemberFormRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
public class MemberFormController {

    private final MemberFormService memberFormService;

    public MemberFormController(MemberFormService memberFormService) {
        this.memberFormService = memberFormService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse submitMemberForm(
            @Valid @RequestBody MemberFormRequest request
    ) {
        memberFormService.saveSubmission(request);
        return new ApiResponse(
                true,
                "Your information has been submitted successfully."
        );
    }

    @GetMapping("/health")
    public ApiResponse healthCheck() {
        return new ApiResponse(true, "MFM IYC Member Form API is running.");
    }
}
