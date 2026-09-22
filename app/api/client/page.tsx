"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Check,
  FileText,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const appointmentTypes = [
  "Annual Plan Renewal",
  "Appointment Confirmation",
  "Technical Support",
  "Product Inquiry",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  callPurpose: string;
  company: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  callPurpose: "Appointment Confirmation",
  company: "",
  message: "",
};

export default function ClientPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  };

  async function submitAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          callPurpose: form.callPurpose,
          company: form.company.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "We could not submit your appointment.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not submit your appointment.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8f7] text-[#15263a]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[.85fr_1.15fr]">
        <section className="relative hidden overflow-hidden bg-[#10243a] px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
          <div className="absolute -right-24 top-20 size-72 rounded-full border border-[#78d7ad]/20" />
          <div className="absolute -right-10 top-34 size-44 rounded-full border border-[#78d7ad]/15" />
          <div className="relative">
            <Link href="/" className="flex items-center gap-3 text-[19px] font-semibold tracking-[-.02em]">
              <span className="grid size-9 place-items-center rounded-xl bg-[#78d7ad] text-[#10243a]"><Activity size={21} strokeWidth={2.5} /></span>
              CallFlow <span className="text-[#78d7ad]">AI</span>
            </Link>
            <div className="mt-28 max-w-[440px]">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#78d7ad]">A smoother way to connect</p>
              <h1 className="text-5xl font-bold leading-[1.08] tracking-[-.055em] xl:text-6xl">Let&apos;s find a time that works for you.</h1>
              <p className="mt-6 max-w-[390px] text-sm leading-7 text-[#aebdca]">Share a few details and our team will follow up with an appointment that fits your schedule.</p>
            </div>
          </div>
          <div className="relative flex items-center gap-3 text-xs text-[#aebdca]"><ShieldCheck size={17} className="text-[#78d7ad]" /> Your information is securely sent to our team.</div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-[580px]">
            <div className="mb-8 lg:hidden"><Link href="/" className="flex items-center gap-3 text-lg font-bold"><span className="grid size-9 place-items-center rounded-xl bg-[#10243a] text-[#78d7ad]"><Activity size={19} /></span>CallFlow <span className="text-[#41a77d]">AI</span></Link></div>
            {status === "success" ? (
              <SuccessState onNewAppointment={() => setStatus("idle")} />
            ) : (
              <>
                <div className="mb-8">
                      <p className="mb-3 text-[11px] font-bold uppercase tracking-[.17em] text-[#4b9c79]">Contact our team</p>
                      <h2 className="text-3xl font-bold tracking-[-.045em] sm:text-4xl">Tell us how we can help.</h2>
                      <p className="mt-3 text-sm leading-6 text-[#7d8b9c]">Share a few details and the right person will follow up shortly.</p>
                </div>
                <form onSubmit={submitAppointment} className="space-y-5 rounded-2xl border border-[#e0e9e5] bg-white p-5 shadow-[0_20px_60px_rgba(36,67,58,.07)] sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" icon={<UserRound size={16} />}>
                          <input required value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="David Chen" className="form-input" />
                        </Field>
                        <Field label="Email address" icon={<FileText size={16} />}>
                          <input required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="david@example.com" className="form-input" />
                    </Field>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone number" icon={<Phone size={16} />}>
                      <input required type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+1 555 0244" className="form-input" />
                    </Field>
                        <Field label="Company" icon={<FileText size={16} />} optional>
                          <input value={form.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Example Company" className="form-input" />
                        </Field>
                  </div>
                  <Field label="What is this about?" icon={<FileText size={16} />}>
                    <select value={form.callPurpose} onChange={(event) => updateField("callPurpose", event.target.value)} className="form-input appearance-none">
                      {appointmentTypes.map((type) => <option key={type}>{type}</option>)}
                    </select>
                  </Field>
                  <Field label="Anything we should know?" icon={<FileText size={16} />} optional>
                    <textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Tell us what you would like to discuss" rows={4} className="form-input resize-none" />
                  </Field>
                  {status === "error" && <p role="alert" className="rounded-lg bg-[#fff0ee] px-3 py-2 text-xs font-medium text-[#c7534e]">{errorMessage}</p>}
                  <button disabled={status === "sending"} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#10243a] text-sm font-bold text-white transition hover:bg-[#203b5a] disabled:cursor-wait disabled:opacity-70">
                    {status === "sending" ? "Sending request..." : <>Send request <ArrowRight size={16} /></>}
                  </button>
                      <p className="text-center text-[11px] text-[#98a5b0]">Your details are securely sent to our team.</p>
                </form>
              </>
            )}
          </div>
        </section>
      </div>
      <style jsx global>{`
        .form-input { width: 100%; border: 1px solid #dfe8e4; border-radius: 10px; background: #fbfdfc; padding: 11px 12px; font-size: 13px; color: #27394d; outline: none; transition: border-color .2s, box-shadow .2s; }
        .form-input::placeholder { color: #a6b1ba; }
        .form-input:focus { border-color: #6bc79e; box-shadow: 0 0 0 3px rgba(107,199,158,.14); }
      `}</style>
    </main>
  );
}

function Field({ label, icon, optional, children }: { label: string; icon: React.ReactNode; optional?: boolean; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 flex items-center gap-2 text-xs font-bold text-[#4d6071]">{icon}{label}{optional && <span className="font-normal text-[#a0abb4]">(optional)</span>}</span>{children}</label>;
}

function SuccessState({ onNewAppointment }: { onNewAppointment: () => void }) {
  return <div className="rounded-2xl border border-[#dcebe3] bg-white p-8 text-center shadow-[0_20px_60px_rgba(36,67,58,.07)] sm:p-12"><div className="mx-auto grid size-16 place-items-center rounded-full bg-[#e3f8ed] text-[#249864] ring-8 ring-[#f1fbf5]"><Check size={30} strokeWidth={2.5} /></div><p className="mt-7 text-[11px] font-bold uppercase tracking-[.17em] text-[#4b9c79]">Request received</p><h2 className="mt-3 text-3xl font-bold tracking-[-.045em]">Thanks, we&apos;ll be in touch.</h2><p className="mx-auto mt-4 max-w-[360px] text-sm leading-6 text-[#7d8b9c]">Your details have been securely sent to our team. We&apos;ll follow up with you shortly.</p><button onClick={onNewAppointment} className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl border border-[#dfe8e4] px-5 text-sm font-bold text-[#30475b] transition hover:bg-[#f5faf7]">Submit another request <ArrowRight size={15} /></button></div>;
}
