import { NextResponse } from "next/server";

const FASTN_INTAKE_WEBHOOK =
  "https://webhooks.fastn.dev/prod/triggers/personal_fa5e780a2e2ced7c1bf852f3/webhooks/8f1b852f-5237-458c-a6ab-6f9aa07a0c22";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const callPurpose = String(body.callPurpose || "").trim();

    if (!name) return NextResponse.json({ success: false, error: "Missing required field: name" }, { status: 422 });
    if (!email) return NextResponse.json({ success: false, error: "Missing required field: email" }, { status: 422 });
    if (!emailPattern.test(email)) return NextResponse.json({ success: false, error: `Invalid email format: ${email}` }, { status: 422 });
    if (!phone) return NextResponse.json({ success: false, error: "Missing required field: phone" }, { status: 422 });
    if (!callPurpose) return NextResponse.json({ success: false, error: "Missing required field: callPurpose" }, { status: 422 });

    const response = await fetch(FASTN_INTAKE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        company: String(body.company || "Not specified").trim() || "Not specified",
        callPurpose,
        message: String(body.message || "None").trim() || "None",
        ...(body.adminEmail ? { adminEmail: String(body.adminEmail).trim() } : {}),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ success: false, error: `Fastn ingestion error: ${errorText}` }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully and queued for processing.",
      eventId: result?.data?.id,
    }, { status: 202 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    }, { status: 500 });
  }
}