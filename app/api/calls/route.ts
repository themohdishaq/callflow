import { NextRequest, NextResponse } from "next/server";
import { saveCall } from "@/lib/call-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      customerName,
      phone,
      callPurpose,
      outcome,
      sentiment,
      summary,
      followUpRequired,
    } = body;

    if (!customerName) {
      return NextResponse.json(
        { success: false, error: "Customer name is required" },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (!callPurpose) {
      return NextResponse.json(
        { success: false, error: "Call purpose is required" },
        { status: 400 }
      );
    }

    const payload = {
      customerName,
      phone,
      callPurpose,

      // These can initially be pending
      outcome: outcome || "Pending",
      sentiment: sentiment || "Pending",
      summary: summary || "Awaiting call",
      followUpRequired: followUpRequired ?? false,
    };

    const webhookUrl = process.env.FASTN_WEBHOOK_URL || process.env.FASTN_CALL_OUTCOME_WEBHOOK;
    if (!webhookUrl) {
      return NextResponse.json({ success: false, error: "Fastn webhook is not configured" }, { status: 503 });
    }

    const response = await fetch(
      webhookUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Fastn error:", result);

      return NextResponse.json(
        {
          success: false,
          error: "Fastn automation failed",
          details: result,
        },
        { status: response.status }
      );
    }

    saveCall(payload);

    return NextResponse.json({
      success: true,
      message: "Customer successfully sent to Fastn",
      event: result,
    });
  } catch (error) {
    console.error("POST /api/calls:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}