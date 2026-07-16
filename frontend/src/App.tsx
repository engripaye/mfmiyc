import { FormEvent, useState } from "react";
import FormField from "./components/FormField";
import { submitMemberForm } from "./services/memberService";
import type { MemberFormData } from "./types/member";

const initialForm: MemberFormData = {
  name: "",
  number: "",
  socialMediaHandle: "",
  houseAddress: "",
  prayerRequest: "",
  birthdayDate: "",
};

type Status =
  | { type: "idle"; message: "" }
  | { type: "success" | "error"; message: string };

export default function App() {
  const [formData, setFormData] = useState<MemberFormData>(initialForm);
  const [status, setStatus] = useState<Status>({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (
    field: keyof MemberFormData,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });
    setIsSubmitting(true);

    try {
      const result = await submitMemberForm(formData);
      setStatus({ type: "success", message: result.message });
      setFormData(initialForm);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "The submission failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page">
      <section className="form-card">
        <header className="form-header">
          <p className="eyebrow">Mountain of Fire and Miracles Ministries</p>
          <h1>MFM IYC Member Form</h1>
          <p>
            Please enter your information correctly. Fields marked with an
            asterisk are required.
          </p>
        </header>

        {status.type !== "idle" && (
          <div
            className={`alert alert-${status.type}`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FormField
            id="name"
            label="1. Name"
            required
            value={formData.name}
            placeholder="Enter your full name"
            autoComplete="name"
            maxLength={120}
            onChange={(event) => updateField("name", event.target.value)}
          />

          <FormField
            id="number"
            label="2. Phone Number"
            required
            type="tel"
            value={formData.number}
            placeholder="+234 800 000 0000"
            autoComplete="tel"
            maxLength={20}
            onChange={(event) => updateField("number", event.target.value)}
          />

          <FormField
            id="socialMediaHandle"
            label="3. Social Media Handle"
            value={formData.socialMediaHandle}
            placeholder="@yourhandle"
            maxLength={120}
            onChange={(event) =>
              updateField("socialMediaHandle", event.target.value)
            }
          />

          <FormField
            id="houseAddress"
            label="4. House Address"
            required
          >
            <textarea
              id="houseAddress"
              name="houseAddress"
              required
              rows={3}
              maxLength={300}
              value={formData.houseAddress}
              placeholder="Enter your current house address"
              autoComplete="street-address"
              onChange={(event) =>
                updateField("houseAddress", event.target.value)
              }
            />
          </FormField>

          <FormField id="prayerRequest" label="5. Prayer Request">
            <textarea
              id="prayerRequest"
              name="prayerRequest"
              rows={5}
              maxLength={2000}
              value={formData.prayerRequest}
              placeholder="Write your prayer request here"
              onChange={(event) =>
                updateField("prayerRequest", event.target.value)
              }
            />
          </FormField>

          <FormField
            id="birthdayDate"
            label="6. Birthday Date"
            required
            type="date"
            value={formData.birthdayDate}
            autoComplete="bday"
            onChange={(event) =>
              updateField("birthdayDate", event.target.value)
            }
          />

          <p className="privacy-note">
            Your information will be used only for church administration,
            member communication, and prayer support.
          </p>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      </section>
    </main>
  );
}
