package dev.engripaye.mfmiyc.service;

import dev.engripaye.mfmiyc.dto.MemberFormRequest;

public interface MemberFormService {

    void saveSubmission(MemberFormRequest request);
}
