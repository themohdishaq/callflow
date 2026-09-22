import { NextRequest, NextResponse } from "next/server";
import { getCalls } from "@/lib/call-store";

export async function GET(req: NextRequest) {
  const limit = Number(new URL(req.url).searchParams.get("limit") || "100");
  const webhookUrl = process.env.FASTN_HISTORY_WEBHOOK_URL;

  try {
    if (!webhookUrl) {
      return NextResponse.json({ success: false, records: [], error: "Fastn history workflow is not configured" }, { status: 503 });
    }

    const response = await fetch(
      webhookUrl,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ limit }),

        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Fastn History Error:", result);

      return NextResponse.json(
        {
          success: false,
          records: [],
          error: "Unable to retrieve call history",
          details: result,
        },
        { status: response.status }
      );
    }

    // Fastn may wrap the workflow response inside data
    const payload = result.data || result;

    return NextResponse.json({
      success: true,
      count: payload.count ?? payload.records?.length ?? 0,
      total: payload.total ?? payload.records?.length ?? 0,
      records: payload.records || [],
    });
  } catch (error) {
    console.error("GET /api/history:", error);
    const records = getCalls(limit);
    return NextResponse.json({ success: true, source: "local-fallback", count: records.length, total: records.length, records });
  }
}