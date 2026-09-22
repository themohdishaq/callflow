import { NextResponse } from "next/server";
import { saveCall } from "@/lib/call-store";

const requiredTextFields = [
  "customerName",
  "phone",
  "callPurpose",
  "outcome",
  "sentiment",
  "summary",
] as const;

export async function POST(request: Request) {
  const webhookUrl = process.env.FASTN_WEBHOOK_URL || process.env.FASTN_CALL_OUTCOME_WEBHOOK;

  if (!webhookUrl) {
    return NextResponse.json({ error: "FASTN_WEBHOOK_URL is not configured" }, { status: 503 });
  }

  try {
    const payload: unknown = await request.json();

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json({ error: "A JSON object is required" }, { status: 400 });
    }

    const body = payload as Record<string, unknown>;
    const missingField = requiredTextFields.find(
      (field) => typeof body[field] !== "string" || !body[field].trim(),
    );

    if (missingField || typeof body.followUpRequired !== "boolean") {
      return NextResponse.json(
        { error: "customerName, phone, callPurpose, outcome, sentiment, summary, and followUpRequired are required" },
        { status: 400 },
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: body.customerName,
        phone: body.phone,
        callPurpose: body.callPurpose,
        outcome: body.outcome,
        sentiment: body.sentiment,
        summary: body.summary,
        followUpRequired: body.followUpRequired,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json({ error: "Fastn webhook rejected the call outcome", details: details.slice(0, 500) }, { status: 502 });
    }

    saveCall({
      customerName: String(body.customerName),
      phone: String(body.phone),
      callPurpose: String(body.callPurpose),
      outcome: String(body.outcome),
      sentiment: String(body.sentiment),
      summary: String(body.summary),
      followUpRequired: body.followUpRequired as boolean,
    });

    return NextResponse.json({ synced: true });
  } catch {
    return NextResponse.json({ error: "Unable to reach Fastn" }, { status: 502 });
  }
}
