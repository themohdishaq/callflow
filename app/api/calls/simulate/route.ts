import { NextRequest, NextResponse } from "next/server";
import { saveCall } from "@/lib/call-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      customerName,
      phone,
      callPurpose,
    } = body;

    if (!customerName || !phone || !callPurpose) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing customer information",
        },
        { status: 400 }
      );
    }

    /*
     * Hackathon MVP:
     * telephony is simulated.
     *
     * The resulting automation after the call
     * is REAL and runs through Fastn.
     */

    const escalated =
      callPurpose.toLowerCase().includes("renewal");

    const callOutcome = escalated
      ? {
          customerName,
          phone,
          callPurpose,
          outcome: "Escalated",
          sentiment: "Frustrated",
          summary:
            "Customer requested account manager review regarding pricing discrepancy.",
          followUpRequired: true,
        }
      : {
          customerName,
          phone,
          callPurpose,
          outcome: "Confirmed",
          sentiment: "Positive",
          summary:
            "Customer successfully confirmed during the AI call.",
          followUpRequired: false,
        };

    const webhookUrl = process.env.FASTN_WEBHOOK_URL || process.env.FASTN_CALL_OUTCOME_WEBHOOK;
    if (!webhookUrl) {
      return NextResponse.json({ success: false, error: "Fastn webhook is not configured" }, { status: 503 });
    }

    const fastnResponse = await fetch(
      webhookUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(callOutcome),
        cache: "no-store",
      }
    );

    const fastnResult = await fastnResponse.json();

    if (!fastnResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Fastn automation failed",
          details: fastnResult,
        },
        { status: fastnResponse.status }
      );
    }

    saveCall(callOutcome);

    return NextResponse.json({
      success: true,

      message: "AI call simulation completed",

      simulation: true,

      call: callOutcome,

      automation: {
        fastn: true,
        accepted: true,
        event: fastnResult,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Call processing failed",
      },
      { status: 500 }
    );
  }
}