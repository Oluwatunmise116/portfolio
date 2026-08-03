"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ContactSuccess } from "@/components/contact/contact-success";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/ui/loading-state";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  contactReasons,
  contactSchema,
  projectTypes,
  submitContactForm,
  type ContactFormValues,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    // Keep user input after validation errors; re-validate as they type.
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    if (isSubmitting || status === "submitting") return; // no double submits
    setStatus("submitting");
    try {
      await submitContactForm(values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return <ContactSuccess onReset={() => setStatus("idle")} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Name"
          htmlFor="name"
          required
          error={errors.name?.message}
        >
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="email"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </FormField>
      </div>

      <FormField
        label="Company or organisation"
        htmlFor="company"
        error={errors.company?.message}
      >
        <Input
          id="company"
          autoComplete="organization"
          aria-invalid={errors.company ? true : undefined}
          aria-describedby={errors.company ? "company-error" : undefined}
          {...register("company")}
        />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Reason for contacting"
          htmlFor="reason"
          required
          error={errors.reason?.message}
        >
          <Select
            id="reason"
            defaultValue=""
            aria-invalid={errors.reason ? true : undefined}
            aria-describedby={errors.reason ? "reason-error" : undefined}
            {...register("reason")}
          >
            <option value="" disabled>
              Select a reason…
            </option>
            {contactReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Project type"
          htmlFor="projectType"
          error={errors.projectType?.message}
        >
          <Select id="projectType" defaultValue="" {...register("projectType")}>
            <option value="">Not sure yet</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField
        label="Message"
        htmlFor="message"
        required
        error={errors.message?.message}
        hint="A few sentences about the project, system, or problem is plenty."
      >
        <Textarea
          id="message"
          rows={7}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          {...register("message")}
        />
      </FormField>

      {/* Submission status announcements for assistive tech */}
      <p aria-live="polite" role="status" className="sr-only">
        {status === "submitting" && "Sending your message."}
        {status === "error" &&
          "Your message could not be sent. Please try again."}
      </p>

      {status === "error" && (
        <div
          className="rounded-sm border border-error/40 bg-error/5 p-4 text-sm text-error"
          role="alert"
        >
          Something went wrong while sending. Your message is still in the form
          — please try again, or email me directly instead.
        </div>
      )}

      <div>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? <LoadingState label="Sending…" /> : "Send message"}
        </Button>
      </div>
    </form>
  );
}
