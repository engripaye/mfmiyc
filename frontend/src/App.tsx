import { FormEvent, useState } from "react";
import FormField from "./components/FormField";
import { submitMemberForm } from "./services/memberService";
import type { MemberFormData } from "./types/member";

const initialForm: MemberFormData = {
  name: "",
  number: "",
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
          <img
            className="church-logo"
            src="/images/mfm-iyc-logo.jpg"
            alt="MFM Ipaja Youth Church"
          />
          <div className="header-copy">
            <p className="eyebrow">Mountain of Fire and Miracles Ministries</p>
            <h1>Member Information Form</h1>
            <p>
              Welcome to MFM Ipaja Youth Church. Please provide your details
              below so we can stay connected with you.
            </p>
          </div>
        </header>

        {status.type === "error" && (
          <div
            className="alert alert-error"
            role="alert"
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
            placeholder="Enter your phone number"
            autoComplete="tel"
            maxLength={20}
            onChange={(event) => updateField("number", event.target.value)}
          />

          <FormField
            id="houseAddress"
            label="3. House Address"
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

          <FormField id="prayerRequest" label="4. Prayer Request">
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
            label="5. Birthday Date"
            required
            type="date"
            value={formData.birthdayDate}
            autoComplete="bday"
            onChange={(event) =>
              updateField("birthdayDate", event.target.value)
            }
          />

          <p className="privacy-note">
            <span aria-hidden="true">&#128274;</span> Your information is private
            and will be used only for church administration, communication,
            and prayer support. Fields marked with * are required.
          </p>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      </section>

      {status.type === "success" && (
        <div className="success-overlay" role="presentation">
          <section
            className="success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            aria-describedby="success-description"
          >
            <div className="success-icon" aria-hidden="true">
              <span>✓</span>
            </div>
            <p className="success-kicker">Submission received</p>
            <h2 id="success-title">Thank you!</h2>
            <p id="success-description" className="success-message">
              {status.message}
            </p>
            <p className="success-note">
              We’re delighted to have you connected with MFM Ipaja Youth
              Church. God bless you.
            </p>
            <button
              className="success-close"
              type="button"
              autoFocus
              onClick={() => setStatus({ type: "idle", message: "" })}
            >
              Done
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
