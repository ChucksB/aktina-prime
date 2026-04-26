import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Contact form submitting to Web3Forms (https://web3forms.com).
 *
 * To wire it up:
 *   1. Sign up free at https://web3forms.com — no account required, just an email.
 *   2. They send you an access key.
 *   3. Replace `WEB3FORMS_ACCESS_KEY` below.
 *
 * Until then, submissions will fail with a clear error and the user is shown
 * a fallback mailto link so messages still reach the inbox.
 */
const WEB3FORMS_ACCESS_KEY = "fa737920-69f1-410b-9410-fa93dd3dff38";
const FALLBACK_EMAIL = "hello@aktinaprime.com";

type Status = "idle" | "submitting" | "success" | "error";

const PROJECT_TYPES = [
  "Tech / product design",
  "Media / production",
  "Publicity / campaign",
  "Something else",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const reduce = useReducedMotion();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("from_name", "Aktina Prime website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (res.ok && json?.success) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(json?.message ?? "Could not send message. Please try the email link below.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error. Please try the email link below.");
    }
  }

  return (
    <div className="card p-7 md:p-9">
      <div className="eyebrow"><span className="num">—</span><span>Start a conversation</span></div>

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE_QUINT }}
            className="mt-6"
          >
            <h3 className="font-display font-semibold text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-tight">
              Message received<span style={{ color: "var(--color-brand)" }}>.</span>
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-[1.6]" style={{ color: "var(--color-muted)" }}>
              A reply will land in your inbox within one working day. In urgent cases, mail us directly at{" "}
              <a className="link" href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="link mt-7 inline-block text-[0.875rem]"
            >
              Send another message →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: EASE_QUINT }}
            onSubmit={onSubmit}
            className="mt-6 flex flex-col gap-5"
            noValidate
          >
            <Field id="cf-name" label="Name">
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="input"
              />
            </Field>

            <Field id="cf-email" label="Email">
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input"
              />
            </Field>

            <Field id="cf-subject" label="What can we help with?">
              <select id="cf-subject" name="subject" defaultValue="" required className="input">
                <option value="" disabled>Select a project type</option>
                {PROJECT_TYPES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>

            <Field id="cf-message" label="Tell us about your project">
              <textarea
                id="cf-message"
                name="message"
                required
                rows={4}
                className="input resize-y"
              />
            </Field>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn btn-accent btn-arrow mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{status === "submitting" ? "Sending…" : "Send message"}</span>
              {status !== "submitting" ? (
                <span className="btn-arrow-glyph" aria-hidden="true">→</span>
              ) : null}
            </button>

            {status === "error" ? (
              <div
                role="alert"
                className="text-[0.8125rem] leading-[1.5]"
                style={{ color: "var(--color-brand)" }}
              >
                {errorMsg}{" "}
                <a className="link" href={`mailto:${FALLBACK_EMAIL}`}>
                  Email us directly →
                </a>
              </div>
            ) : null}

            <p className="text-[0.75rem] leading-[1.5]" style={{ color: "var(--color-muted)" }}>
              Or just write to <a className="link" href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[0.75rem] uppercase tracking-[0.14em] font-medium"
        style={{ color: "var(--color-muted)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
