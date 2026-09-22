import { NextResponse } from "next/server";
import { getCalls } from "@/lib/call-store";

type HistoryRecord = {
  outcome?: string;
  sentiment?: string;
  followUpRequired?: boolean | string;
  [key: string]: unknown;
};

function dashboardPayload(records: HistoryRecord[], source = "fastn") {
  const completed = records.filter((record) => record.outcome && record.outcome.toLowerCase() !== "pending").length;
  const escalated = records.filter((record) => record.outcome?.toLowerCase() === "escalated").length;
  const followUps = records.filter((record) => record.followUpRequired === true || record.followUpRequired === "true" || record.followUpRequired === "YES").length;
  return {
    success: true,
    source,
    stats: { totalCalls: records.length, completed, escalated, followUps, positive: records.filter((record) => record.sentiment?.toLowerCase() === "positive").length, frustrated: records.filter((record) => record.sentiment?.toLowerCase() === "frustrated").length },
    recentCalls: records.slice(0, 10),
    records,
  };
}

export async function GET() {
  const webhookUrl = process.env.FASTN_HISTORY_WEBHOOK_URL;
  const localRecords = getCalls();

  try {
    if (!webhookUrl) {
      return NextResponse.json(dashboardPayload(localRecords, "local-fallback"));
    }

    const response = await fetch(
      webhookUrl,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ limit: 500 }),

        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Fastn Dashboard Error:", result);
      return NextResponse.json(dashboardPayload(localRecords, "local-fallback"));
    }

    const payload = result.data || result;
    const records: HistoryRecord[] = Array.isArray(payload.records) ? payload.records : [];

    return NextResponse.json(dashboardPayload(records));
  } catch (error) {
    console.error("Dashboard API:", error);
    const records = getCalls();
    return NextResponse.json(dashboardPayload(records, "local-fallback"));
  }
}