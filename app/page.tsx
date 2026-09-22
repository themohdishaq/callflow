"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  LayoutDashboard,
  Mail,
  Menu,
  MoreHorizontal,
  Phone,
  PhoneCall,
  Search,
  Settings2,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";

type Customer = { name: string; phone: string; purpose: string; initials: string; color: string };
type CallOutcome = {
  customerName: string;
  phone: string;
  callPurpose: string;
  outcome: string;
  sentiment: string;
  summary: string;
  followUpRequired: boolean;
  timestamp: string;
};

const customers: Customer[] = [
  { name: "Muhammad Ishaq", phone: "03477631929", purpose: "Annual Plan Renewal", initials: "DC", color: "bg-[#d9f4e7] text-[#18794e]" },

];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Customers", icon: Users },
  { label: "Leads", icon: Mail },
  { label: "AI Calls", icon: PhoneCall },
  { label: "Call History", icon: Clock3 },
  { label: "Integrations", icon: Zap },
];


function LeadsView() {
  const stages = [
    { title: "Contact form", detail: "Next.js /api/leads", icon: FileText, color: "bg-[#e5f7ee] text-[#1c9c67]" },
    { title: "Fastn intake", detail: "Published · instant", icon: Zap, color: "bg-[#e8edff] text-[#4d68c8]" },
    { title: "Email follow-up", detail: "Customer + admin", icon: Mail, color: "bg-[#fff0d8] text-[#cc861a]" },
    { title: "Google Sheets", detail: "CallFlow AI Leads", icon: FileText, color: "bg-[#e4f3ea] text-[#23894f]" },
  ];
  return <>
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#6bb694]">Inbound automation</p>
        <h2 className="text-[29px] font-bold tracking-[-.04em]">Leads</h2>
        <p className="mt-1 text-sm text-[#8491a5]">Customer requests are validated, emailed, and logged automatically.</p>
      </div>
      <a href="/api/client" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1c2c46] px-4 text-sm font-semibold text-white shadow-[0_5px_12px_rgba(21,36,58,.15)] transition hover:bg-[#283e5f]">Open lead form <ArrowRight size={15} /></a>
    </div>
    <section className="rounded-xl border border-[#dcebe3] bg-[#f8fdf9] p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#218d5d]"><span className="size-2 rounded-full bg-[#38bd81]" /> Live and connected</div>
          <h3 className="mt-3 text-xl font-bold tracking-[-.025em]">CallFlow AI - Customer Intake</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#718596]">Every submission reaches the published Fastn workflow, which sends both confirmation emails and saves a complete record to the CallFlow AI Leads sheet.</p>
        </div>
        <div className="rounded-lg border border-[#dcebe3] bg-white px-4 py-3 text-right">
          <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#94a49b]">Workflow</p>
          <p className="mt-1 text-sm font-bold text-[#284255]">callflow-ai-intake</p>
          <p className="mt-1 text-[11px] text-[#809190]">v1 · instant</p>
        </div>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-4">
        {stages.map(({ title, detail, icon: Icon, color }, index) => 
          <div key={title} className="relative rounded-xl border border-[#e3eee7] bg-white p-4">
            <div className={`grid size-10 place-items-center rounded-lg ${color}`}>
              <Icon size={18} />
            </div>
            <p className="mt-4 text-xs font-bold text-[#33495b]">{title}</p>
            <p className="mt-1 text-[11px] text-[#8a9a9c]">{detail}</p>
            {index < stages.length - 1 && <ArrowRight className="absolute -right-3 top-8 z-10 hidden text-[#9ab9aa] md:block" size={16} />}
          </div>
        )}
      </div>
    </section>
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-[#e7ebf1] bg-white p-5">
        <p className="text-xs font-medium text-[#8591a3]">Required fields</p>
        <p className="mt-3 text-sm font-bold text-[#33495b]">Name · email · phone · purpose</p>
        <p className="mt-2 text-xs leading-5 text-[#8998a8]">Validated server-side before any workflow run.</p>
      </div>
      <div className="rounded-xl border border-[#e7ebf1] bg-white p-5">
        <p className="text-xs font-medium text-[#8591a3]">Customer confirmation</p>
        <p className="mt-3 flex items-center gap-2 text-sm font-bold text-[#239463]"><Check size={15} /> Gmail connected</p>
        <p className="mt-2 text-xs leading-5 text-[#8998a8]">Sent automatically after intake.</p>
      </div>
      <div className="rounded-xl border border-[#e7ebf1] bg-white p-5">
        <p className="text-xs font-medium text-[#8591a3]">Admin notification</p>
        <p className="mt-3 flex items-center gap-2 text-sm font-bold text-[#239463]"><Check size={15} /> Gmail connected</p>
        <p className="mt-2 text-xs leading-5 text-[#8998a8]">New leads arrive in your inbox and Sheets.</p>
      </div>
    </div>
  </>;
}
const seedHistory: CallOutcome[] = [
  { customerName: "David Chen", phone: "+1-555-0244", callPurpose: "Annual Plan Renewal", outcome: "Escalated", sentiment: "Frustrated", summary: "Customer requested account manager review regarding pricing discrepancy on renewal invoice.", followUpRequired: true, timestamp: "Today, 10:42 AM" },
  { customerName: "Sarah Miller", phone: "+1-555-0188", callPurpose: "Appointment Confirmation", outcome: "Completed", sentiment: "Positive", summary: "Appointment confirmed for Thursday at 2:30 PM.", followUpRequired: false, timestamp: "Today, 9:18 AM" },
  { customerName: "Alex Rivera", phone: "+1-555-0731", callPurpose: "Technical Support", outcome: "Completed", sentiment: "Neutral", summary: "Shared troubleshooting steps and confirmed the issue was resolved.", followUpRequired: false, timestamp: "Yesterday, 4:06 PM" },
];

function initialsFor(name: string) { return name.split(" ").map((part) => part[0]).join(""); }

function normalizeCallOutcome(record: Record<string, unknown>): CallOutcome {
  return {
    customerName: String(record.customerName || record.customer || "Unknown customer"),
    phone: String(record.phone || ""),
    callPurpose: String(record.callPurpose || record.purpose || "Customer call"),
    outcome: String(record.outcome || "Pending"),
    sentiment: String(record.sentiment || "Pending"),
    summary: String(record.summary || "No summary available"),
    followUpRequired: record.followUpRequired === true || record.followUpRequired === "true" || record.followUpRequired === "YES",
    timestamp: String(record.timestamp || record.createdAt || record.updatedAt || "Recently"),
  };
}

function LoadingView() { return <div className="grid min-h-[420px] place-items-center rounded-xl border border-[#e7ebf1] bg-white"><div className="text-center"><div className="mx-auto size-8 animate-spin rounded-full border-2 border-[#dce7e1] border-t-[#48a77e]" /><p className="mt-4 text-sm font-semibold text-[#596b80]">Loading call history...</p></div></div>; }

function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) { return <div className="grid min-h-[420px] place-items-center rounded-xl border border-[#f0dfdc] bg-white p-6"><div className="text-center"><p className="text-sm font-bold text-[#bd5a52]">Dashboard data unavailable</p><p className="mt-2 max-w-md text-xs leading-5 text-[#7d8b9c]">{message}</p><button onClick={onRetry} className="mt-5 rounded-lg bg-[#1c2c46] px-4 py-2 text-xs font-bold text-white">Retry</button></div></div>; }

export default function Home() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [history, setHistory] = useState<CallOutcome[]>(seedHistory);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [callStage, setCallStage] = useState<"Calling" | "Connected" | "Conversation" | "Processing" | "Completed">("Calling");
  const [seconds, setSeconds] = useState(0);
  const [syncState, setSyncState] = useState<"idle" | "syncing" | "success" | "error">("idle");
  const [mobileNav, setMobileNav] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  const loadDashboard = async () => {
    try {
      setDashboardError("");
      const response = await fetch("/api/dashboard", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to load dashboard");
      setHistory((result.records || []).map(normalizeCallOutcome));
    } catch (error) {
      setDashboardError(error instanceof Error ? error.message : "Unable to load dashboard");
    } finally {
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    const loadTimer = window.setTimeout(() => { void loadDashboard(); }, 0);
    return () => window.clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!selectedCustomer || callStage === "Completed") return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [selectedCustomer, callStage]);

  useEffect(() => {
    if (!selectedCustomer || callStage === "Completed") return;
    const stages: Array<"Connected" | "Conversation" | "Processing" | "Completed"> = ["Connected", "Conversation", "Processing", "Completed"];
    const stageIndex = ["Calling", "Connected", "Conversation", "Processing", "Completed"].indexOf(callStage);
    const timeout = window.setTimeout(() => setCallStage(stages[Math.min(stageIndex, 3)]), callStage === "Calling" ? 1500 : callStage === "Connected" ? 1400 : callStage === "Conversation" ? 7000 : 1800);
    return () => window.clearTimeout(timeout);
  }, [selectedCustomer, callStage]);

  useEffect(() => {
    if (callStage !== "Completed" || !selectedCustomer || syncState !== "idle") return;
    const outcome: CallOutcome = { customerName: selectedCustomer.name, phone: selectedCustomer.phone, callPurpose: selectedCustomer.purpose, outcome: "Escalated", sentiment: "Frustrated", summary: "Customer requested account manager review regarding pricing discrepancy on renewal invoice.", followUpRequired: true, timestamp: "Just now" };
    const syncTimer = window.setTimeout(() => setSyncState("syncing"), 0);
    fetch("/api/call-outcome", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(outcome) })
      .then(async (response) => { if (!response.ok) { const result = await response.json().catch(() => null); throw new Error(result?.error || "Webhook failed"); } setHistory((items) => [outcome, ...items]); setSyncState("success"); void loadDashboard(); })
      .catch(() => setSyncState("error"));
    return () => window.clearTimeout(syncTimer);
  }, [callStage, selectedCustomer, syncState]);

  const stats = useMemo(() => ({ total: history.length + (selectedCustomer && syncState === "idle" ? 1 : 0), completed: history.filter((call) => call.outcome === "Completed").length, followUps: history.filter((call) => call.followUpRequired).length, escalated: history.filter((call) => call.outcome === "Escalated").length }), [history, selectedCustomer, syncState]);

  const startCall = (customer: Customer) => { setSelectedCustomer(customer); setCallStage("Calling"); setSeconds(0); setSyncState("idle"); };
  const closeCall = () => { setSelectedCustomer(null); setSyncState("idle"); };
  const timeLabel = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#132238]">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col bg-[#101b30] text-white transition-transform lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[88px] items-center gap-3 border-b border-white/10 px-7"><div className="grid size-9 place-items-center rounded-xl bg-[#78d7ad] text-[#10243a]"><Activity size={21} strokeWidth={2.5} /></div><span className="text-[19px] font-semibold tracking-[-.02em]">CallFlow <span className="text-[#78d7ad]">AI</span></span></div>
        <div className="px-4 pt-8"><p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#8592a8]">Workspace</p>{navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActiveNav(label); setMobileNav(false); }} className={`mb-1 flex h-11 w-full items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition-colors ${activeNav === label ? "bg-[#20304d] text-white" : "text-[#96a3b8] hover:bg-white/5 hover:text-white"}`}><Icon size={17} strokeWidth={1.8} />{label}{label === "AI Calls" && <span className="ml-auto rounded-full bg-[#78d7ad] px-2 py-0.5 text-[10px] font-bold text-[#10243a]">LIVE</span>}</button>)}</div>
        <div className="mt-auto border-t border-white/10 p-5"><div className="mb-5 flex items-center gap-3"><div className="grid size-9 place-items-center rounded-full bg-[#e5c1a8] text-xs font-bold text-[#67402f]">JD</div><div><p className="text-xs font-semibold">Jordan Davis</p><p className="text-[11px] text-[#8794aa]">Admin workspace</p></div><MoreHorizontal className="ml-auto text-[#77859d]" size={18} /></div><div className="rounded-xl bg-[#192840] p-3"><div className="mb-2 flex items-center justify-between text-[11px] text-[#aeb9c9]"><span>Monthly usage</span><span className="text-white">64%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#34445d]"><div className="h-full w-[64%] rounded-full bg-[#78d7ad]" /></div></div></div>
      </aside>
      {mobileNav && <button aria-label="Close navigation" onClick={() => setMobileNav(false)} className="fixed inset-0 z-30 bg-[#08101f]/50 lg:hidden"><span className="sr-only">Close navigation</span></button>}
      <main className="min-h-screen lg:ml-[252px]">
        <header className="flex h-[88px] items-center justify-between border-b border-[#e7ebf1] bg-white px-5 sm:px-9"><div className="flex items-center gap-3"><button onClick={() => setMobileNav(true)} className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"><Menu size={20} /></button><div><p className="text-[11px] font-medium text-[#8290a5]">Saturday, September 19, 2026</p><h1 className="mt-1 text-[20px] font-bold tracking-[-.03em]">Good morning, Jordan <span aria-hidden="true">👋</span></h1></div></div><div className="flex items-center gap-3"><button className="relative grid size-9 place-items-center rounded-lg border border-[#e4e9f0] text-[#718097] hover:bg-slate-50"><Bell size={17} /><i className="absolute right-2 top-2 size-1.5 rounded-full bg-[#f16b68]" /></button><div className="hidden h-8 w-px bg-[#e6eaf0] sm:block" /><div className="hidden items-center gap-2 sm:flex"><div className="grid size-8 place-items-center rounded-full bg-[#e5c1a8] text-[10px] font-bold text-[#67402f]">JD</div><ChevronDown size={15} className="text-[#8a97aa]" /></div></div></header>
        <div className="mx-auto max-w-[1440px] p-5 sm:p-9">
          {dashboardLoading ? <LoadingView /> : dashboardError ? <ErrorView message={dashboardError} onRetry={() => { setDashboardLoading(true); void loadDashboard(); }} /> : activeNav === "Customers" ? <CustomersView onStart={startCall} /> : activeNav === "Leads" ? <LeadsView /> : activeNav === "Call History" ? <HistoryView history={history} /> : activeNav === "Integrations" ? <IntegrationsView /> : <OverviewView stats={stats} history={history} onCustomers={() => setActiveNav("Customers")} />}
        </div>
      </main>
      {selectedCustomer && <CallModal customer={selectedCustomer} stage={callStage} seconds={timeLabel} syncState={syncState} onClose={closeCall} onRestart={() => startCall(selectedCustomer)} />}
    </div>
  );
}

function OverviewView({ stats, history, onCustomers }: { stats: { total: number; completed: number; followUps: number; escalated: number }; history: CallOutcome[]; onCustomers: () => void }) {
  const statCards = [{ label: "Total Calls", value: stats.total, change: "+12.5%", icon: PhoneCall, tint: "bg-[#e4f7ee] text-[#20a06b]" }, { label: "Completed", value: stats.completed, change: "+8.2%", icon: Check, tint: "bg-[#e9e4ff] text-[#7356d9]" }, { label: "Follow-ups Required", value: stats.followUps, change: "+4.1%", icon: Clock3, tint: "bg-[#fff1d9] text-[#d58d23]" }, { label: "Escalated", value: stats.escalated, change: "-2.4%", icon: Bell, tint: "bg-[#ffe4e2] text-[#e36460]" }];
  return <><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#6bb694]">Command center</p><h2 className="text-[29px] font-bold tracking-[-.04em]">Overview</h2><p className="mt-1 text-sm text-[#8491a5]">Keep every customer conversation moving forward.</p></div><button onClick={onCustomers} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1c2c46] px-4 text-sm font-semibold text-white shadow-[0_5px_12px_rgba(21,36,58,.15)] transition hover:bg-[#283e5f]"><PhoneCall size={15} /> Start an AI call</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{statCards.map(({ label, value, change, icon: Icon, tint }) => <div key={label} className="rounded-xl border border-[#e7ebf1] bg-white p-5"><div className="flex items-start justify-between"><div><p className="text-xs font-medium text-[#8591a3]">{label}</p><p className="mt-3 text-[28px] font-bold tracking-[-.04em]">{value}</p></div><div className={`grid size-9 place-items-center rounded-lg ${tint}`}><Icon size={17} /></div></div><p className="mt-4 text-[11px] text-[#8491a5]"><span className={`mr-1 font-bold ${change.startsWith("-") ? "text-[#eb726c]" : "text-[#20a06b]"}`}>{change}</span> vs last month</p></div>)}</div><div className="mt-7 grid gap-6 xl:grid-cols-[1fr_340px]"><section className="overflow-hidden rounded-xl border border-[#e7ebf1] bg-white"><div className="flex items-center justify-between border-b border-[#edf0f4] px-6 py-5"><div><h3 className="text-[15px] font-bold">Recent calls</h3><p className="mt-1 text-xs text-[#8a96a8]">Latest customer conversations</p></div><button className="text-xs font-semibold text-[#4e9c7b] hover:text-[#237054]">View all <ArrowRight className="ml-1 inline" size={13} /></button></div><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead><tr className="border-b border-[#edf0f4] text-[10px] uppercase tracking-[.12em] text-[#99a3b2]"><th className="px-6 py-3 font-semibold">Customer</th><th className="py-3 font-semibold">Purpose</th><th className="py-3 font-semibold">Outcome</th><th className="py-3 font-semibold">Time</th><th className="py-3" /></tr></thead><tbody>{history.slice(0, 4).map((call) => <tr key={`${call.customerName}-${call.timestamp}`} className="border-b border-[#f0f2f5] last:border-0"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="grid size-8 place-items-center rounded-lg bg-[#edf2fb] text-[10px] font-bold text-[#55709c]">{initialsFor(call.customerName)}</div><div><p className="text-xs font-semibold">{call.customerName}</p><p className="mt-0.5 text-[10px] text-[#98a2b1]">{call.phone}</p></div></div></td><td className="text-xs text-[#66758c]">{call.callPurpose}</td><td><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${call.outcome === "Escalated" ? "bg-[#fff0e7] text-[#cc6c32]" : "bg-[#e6f8ef] text-[#239463]"}`}>{call.outcome}</span></td><td className="text-[11px] text-[#8b97a8]">{call.timestamp}</td><td className="pr-5 text-right"><MoreHorizontal size={16} className="text-[#aab2bf]" /></td></tr>)}</tbody></table></div></section><section className="rounded-xl border border-[#e7ebf1] bg-[#1a2a43] p-6 text-white"><div className="mb-6 flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#83d6b0]">AI call performance</p><h3 className="mt-2 text-lg font-bold">Great momentum</h3><p className="mt-1 text-xs leading-5 text-[#aab8ca]">Your AI agent is handling more conversations this month.</p></div><div className="grid size-9 place-items-center rounded-lg bg-white/10 text-[#83d6b0]"><BarChart3 size={18} /></div></div><div className="mb-5 flex items-end gap-2"><span className="text-4xl font-bold tracking-[-.06em]">84.6%</span><span className="mb-1 text-[11px] font-semibold text-[#83d6b0]">+6.8%</span></div><div className="flex h-20 items-end gap-2">{[35, 48, 42, 59, 52, 68, 64, 76, 70, 84, 78, 92].map((height, i) => <div key={i} className={`flex-1 rounded-t-sm ${i === 11 ? "bg-[#83d6b0]" : "bg-[#41617b]"}`} style={{ height: `${height}%` }} />)}</div><div className="mt-3 flex justify-between text-[10px] text-[#8496ac]"><span>Apr 01</span><span>Apr 30</span></div></section></div><div className="mt-7 rounded-xl border border-[#e7ebf1] bg-white p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-[#e4f7ee] text-[#20a06b]"><Sparkles size={19} /></div><div><h3 className="text-sm font-bold">Ready to make a call?</h3><p className="mt-1 text-xs text-[#8894a7]">Select a customer and let CallFlow handle the conversation.</p></div></div><button onClick={onCustomers} className="text-xs font-bold text-[#4e9c7b]">Browse customers <ArrowRight className="ml-1 inline" size={13} /></button></div></div></>;
}

function CustomersView({ onStart }: { onStart: (customer: Customer) => void }) { return <><div className="mb-8"><p className="mb-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#6bb694]">People & conversations</p><h2 className="text-[29px] font-bold tracking-[-.04em]">Customers</h2><p className="mt-1 text-sm text-[#8491a5]">Choose a customer to start a personalized AI conversation.</p></div><div className="mb-5 flex items-center justify-between rounded-xl border border-[#e7ebf1] bg-white p-3"><div className="flex items-center gap-2 px-2 text-xs text-[#94a0b0]"><Search size={16} /> Search customers</div><button className="rounded-lg border border-[#e3e8ef] px-3 py-2 text-xs font-semibold text-[#53637b]">Filter <ChevronDown className="ml-1 inline" size={13} /></button></div><div className="grid gap-4 md:grid-cols-2">{customers.map((customer) => <div key={customer.name} className="rounded-xl border border-[#e7ebf1] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(31,51,78,.07)]"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className={`grid size-11 place-items-center rounded-xl text-xs font-bold ${customer.color}`}>{customer.initials}</div><div><h3 className="text-sm font-bold">{customer.name}</h3><p className="mt-1 text-xs text-[#8693a6]">{customer.phone}</p></div></div><button aria-label={`More options for ${customer.name}`} className="text-[#a7b0bd]"><MoreHorizontal size={18} /></button></div><div className="mt-5 border-t border-[#eef1f5] pt-4"><p className="mb-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#a1aab7]">Call purpose</p><p className="mb-4 text-sm font-medium text-[#53637a]">{customer.purpose}</p><button onClick={() => onStart(customer)} className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#1c2c46] text-xs font-bold text-white transition hover:bg-[#2b4364]"><PhoneCall size={15} /> Start AI Call</button></div></div>)}</div></>; }

function HistoryView({ history }: { history: CallOutcome[] }) { return <><div className="mb-8"><p className="mb-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#6bb694]">Your activity</p><h2 className="text-[29px] font-bold tracking-[-.04em]">Call history</h2><p className="mt-1 text-sm text-[#8491a5]">A complete record of AI-powered customer conversations.</p></div><section className="overflow-hidden rounded-xl border border-[#e7ebf1] bg-white"><div className="flex items-center justify-between border-b border-[#edf0f4] px-6 py-5"><h3 className="text-sm font-bold">Completed calls <span className="ml-2 rounded-full bg-[#edf2f7] px-2 py-1 text-[10px] text-[#6c7a90]">{history.length}</span></h3><button className="grid size-8 place-items-center rounded-lg border border-[#e3e8ef] text-[#718097]"><FileText size={15} /></button></div><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left"><thead><tr className="border-b border-[#edf0f4] text-[10px] uppercase tracking-[.12em] text-[#99a3b2]"><th className="px-6 py-3 font-semibold">Customer</th><th className="py-3 font-semibold">Purpose</th><th className="py-3 font-semibold">Outcome</th><th className="py-3 font-semibold">Sentiment</th><th className="py-3 font-semibold">Follow-up</th><th className="py-3 font-semibold">Timestamp</th></tr></thead><tbody>{history.map((call) => <tr key={`${call.customerName}-${call.timestamp}`} className="border-b border-[#f0f2f5] last:border-0"><td className="px-6 py-4"><p className="text-xs font-semibold">{call.customerName}</p><p className="mt-0.5 text-[10px] text-[#98a2b1]">{call.phone}</p></td><td className="text-xs text-[#66758c]">{call.callPurpose}</td><td><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${call.outcome === "Escalated" ? "bg-[#fff0e7] text-[#cc6c32]" : "bg-[#e6f8ef] text-[#239463]"}`}>{call.outcome}</span></td><td className="text-xs text-[#66758c]">{call.sentiment}</td><td className="text-xs font-medium text-[#cc6c32]">{call.followUpRequired ? "Required" : "None"}</td><td className="text-[11px] text-[#8b97a8]">{call.timestamp}</td></tr>)}</tbody></table></div></section></>; }

function IntegrationsView() { const integrations = [{ name: "Fastn", description: "Automation orchestration", icon: Zap, color: "bg-[#e5f7ee] text-[#1c9c67]" }, { name: "Google Sheets", description: "Data destination", icon: FileText, color: "bg-[#e4f3ea] text-[#23894f]" }, { name: "Notification Service", description: "Follow-up delivery", icon: Bell, color: "bg-[#fff0d8] text-[#cc861a]" }]; return <><div className="mb-8"><p className="mb-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#6bb694]">Connected tools</p><h2 className="text-[29px] font-bold tracking-[-.04em]">Integrations</h2><p className="mt-1 text-sm text-[#8491a5]">The systems that keep your customer workflows in motion.</p></div><div className="grid gap-4 md:grid-cols-3">{integrations.map(({ name, description, icon: Icon, color }) => <div key={name} className="rounded-xl border border-[#e7ebf1] bg-white p-5"><div className="flex items-start justify-between"><div className={`grid size-11 place-items-center rounded-xl ${color}`}><Icon size={20} /></div><span className="flex items-center gap-1.5 text-[10px] font-bold text-[#239463]"><i className="size-1.5 rounded-full bg-[#38bd81]" /> Connected</span></div><h3 className="mt-5 text-sm font-bold">{name}</h3><p className="mt-1 text-xs text-[#8a96a8]">{description}</p><button className="mt-5 text-xs font-semibold text-[#60718a]">Manage connection <ArrowRight className="ml-1 inline" size={13} /></button></div>)}</div><section className="mt-7 rounded-xl border border-[#e7ebf1] bg-white p-6 sm:p-8"><h3 className="text-sm font-bold">Automation flow</h3><p className="mt-1 text-xs text-[#8995a7]">Every completed call triggers this connected workflow.</p><div className="mt-9 flex flex-col items-center justify-between gap-4 sm:flex-row"><FlowStep icon={Activity} title="CallFlow AI" caption="Call completed" color="bg-[#e5f7ee] text-[#1c9c67]" /><ArrowRight className="rotate-90 text-[#b2bcc9] sm:rotate-0" /><FlowStep icon={Zap} title="Fastn" caption="Outcome synced" color="bg-[#e9e4ff] text-[#7356d9]" /><ArrowRight className="rotate-90 text-[#b2bcc9] sm:rotate-0" /><FlowStep icon={FileText} title="Google Sheets" caption="Record updated" color="bg-[#e4f3ea] text-[#23894f]" /><ArrowRight className="rotate-90 text-[#b2bcc9] sm:rotate-0" /><FlowStep icon={Bell} title="Follow-up" caption="Team notified" color="bg-[#fff0d8] text-[#cc861a]" /></div></section></>; }
function FlowStep({ icon: Icon, title, caption, color }: { icon: typeof Activity; title: string; caption: string; color: string }) { return <div className="flex min-w-[130px] flex-col items-center text-center"><div className={`grid size-12 place-items-center rounded-2xl ${color}`}><Icon size={20} /></div><p className="mt-3 text-xs font-bold">{title}</p><p className="mt-1 text-[10px] text-[#929dad]">{caption}</p></div>; }

function CallModal({ customer, stage, seconds, syncState, onClose, onRestart }: { customer: Customer; stage: string; seconds: string; syncState: string; onClose: () => void; onRestart: () => void }) { const conversation = stage === "Conversation" || stage === "Processing" || stage === "Completed"; return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1728]/70 p-4 backdrop-blur-sm"><div className="relative flex max-h-[calc(100vh-32px)] w-full max-w-[780px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"><button aria-label="Close call" onClick={onClose} className="absolute right-5 top-5 z-10 grid size-8 place-items-center rounded-lg text-[#8895a7] hover:bg-slate-100"><X size={18} /></button><div className="border-b border-[#edf0f4] bg-[#f8fafc] px-6 py-5 sm:px-9"><div className="mb-5 flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-[#e5f7ee] text-[#1c9c67]"><Bot size={19} /></div><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#61a987]">AI call in progress</p><h2 className="mt-1 text-lg font-bold">Outbound customer call</h2></div></div><div className="flex items-center gap-4"><div className={`grid size-12 place-items-center rounded-xl text-sm font-bold ${customer.color}`}>{customer.initials}</div><div><p className="font-bold">{customer.name}</p><p className="mt-1 text-xs text-[#8390a3]">{customer.phone} · {customer.purpose}</p></div><div className="ml-auto flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#5a6b83] shadow-sm"><span className={`size-2 rounded-full ${stage === "Completed" ? "bg-[#43bd83]" : "animate-pulse bg-[#f3b44c]"}`} />{stage}<span className="ml-1 font-mono text-[#8996a9]">{seconds}</span></div></div></div><div className="grid min-h-[330px] flex-1 grid-cols-1 sm:grid-cols-[210px_1fr]"><div className="border-b border-[#edf0f4] bg-[#fbfcfd] p-6 sm:border-b-0 sm:border-r"><p className="mb-5 text-[10px] font-bold uppercase tracking-[.15em] text-[#9ba5b3]">Call timeline</p>{["Calling", "Connected", "Conversation", "Processing", "Completed"].map((item, index) => { const current = ["Calling", "Connected", "Conversation", "Processing", "Completed"].indexOf(stage); const done = index < current; return <div key={item} className="flex items-start gap-3"><div className="flex flex-col items-center"><div className={`grid size-6 place-items-center rounded-full text-[10px] font-bold ${item === stage ? "bg-[#1c2c46] text-white" : done ? "bg-[#dff6e9] text-[#25a16c]" : "bg-[#eef1f5] text-[#a1aab7]"}`}>{done ? <Check size={13} /> : index + 1}</div>{index < 4 && <div className={`h-8 w-px ${done ? "bg-[#b5e8cf]" : "bg-[#e2e7ee]"}`} />}</div><p className={`pt-1 text-xs ${item === stage ? "font-bold text-[#1c2c46]" : "text-[#9aa5b5]"}`}>{item}</p></div>})}</div><div className="flex flex-col p-6 sm:p-8"><div className="mb-5 flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#9ba5b3]">Live transcript</p><div className="flex items-center gap-1.5 text-[10px] text-[#8794a7]"><span className="size-1.5 animate-pulse rounded-full bg-[#53c48d]" /> Securely transcribed</div></div><div className="flex-1 space-y-4 overflow-y-auto">{!conversation ? <div className="flex h-full min-h-[170px] flex-col items-center justify-center text-center"><div className="mb-4 grid size-14 place-items-center rounded-full bg-[#e4f7ee] text-[#28aa74] shadow-[0_0_0_10px_#f0fbf5]"><Phone size={23} className="animate-pulse" /></div><p className="text-sm font-bold">Connecting to {customer.name}</p><p className="mt-1 text-xs text-[#929dad]">Your AI agent is initiating the call...</p></div> : <><TranscriptBubble label="AI Agent" text={`Hello ${customer.name.split(" ")[0]}, I'm calling regarding your ${customer.purpose.toLowerCase()}.`} icon={<Bot size={14} />} /><TranscriptBubble label={customer.name.split(" ")[0]} text="I noticed a pricing discrepancy and would like someone to review it." icon={<Users size={14} />} right /><TranscriptBubble label="AI Agent" text="I understand. I'll flag this for follow-up with your account team." icon={<Bot size={14} />} /></>}</div>{stage === "Completed" && syncState === "success" ? <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#bfead3] bg-[#effbf4] p-4"><div className="grid size-9 place-items-center rounded-full bg-[#35b77b] text-white shadow-[0_0_0_5px_#dff7e9]"><Check size={19} strokeWidth={3} /></div><div><p className="text-sm font-bold text-[#1e8057]">Call processed successfully</p><p className="mt-0.5 text-xs text-[#5f9a7e]">Call outcome synced via Fastn</p></div></div> : stage === "Completed" && syncState === "error" ? <div className="mt-5 rounded-xl bg-[#fff2ef] p-4 text-xs font-semibold text-[#c26052]">The call completed, but Fastn could not be reached. <button onClick={onRestart} className="underline">Retry</button></div> : <div className="mt-5 flex items-center justify-between border-t border-[#edf0f4] pt-4"><span className="text-[11px] text-[#9ba5b3]">{stage === "Processing" ? "Preparing call outcome..." : "AI agent is handling this conversation"}</span><div className="flex gap-1"><i className="size-1.5 animate-bounce rounded-full bg-[#9aa8b9]" /><i className="size-1.5 animate-bounce rounded-full bg-[#9aa8b9] [animation-delay:150ms]" /><i className="size-1.5 animate-bounce rounded-full bg-[#9aa8b9] [animation-delay:300ms]" /></div></div>}</div></div><div className="flex items-center justify-between border-t border-[#edf0f4] bg-white px-6 py-4 sm:px-9"><p className="hidden text-[11px] text-[#94a0b0] sm:block"><Settings2 size={13} className="mr-1 inline" /> AI agent: Renewal Specialist</p>{stage === "Completed" ? <button onClick={onClose} className="ml-auto rounded-lg bg-[#1c2c46] px-4 py-2.5 text-xs font-bold text-white">Done</button> : <button onClick={onClose} className="ml-auto rounded-lg border border-[#e2e7ee] px-4 py-2.5 text-xs font-bold text-[#6f7d91]">End call</button>}</div></div></div>; }
function TranscriptBubble({ label, text, icon, right }: { label: string; text: string; icon: React.ReactNode; right?: boolean }) { return <div className={`flex gap-3 ${right ? "flex-row-reverse text-right" : ""}`}><div className={`grid size-7 shrink-0 place-items-center rounded-lg ${right ? "bg-[#edf2fb] text-[#56739e]" : "bg-[#e5f7ee] text-[#1c9c67]"}`}>{icon}</div><div className={`max-w-[90%] rounded-xl px-4 py-3 ${right ? "bg-[#f0f4fa]" : "bg-[#f4faf7]"}`}><p className="mb-1 text-[10px] font-bold text-[#77869a]">{label}</p><p className="text-xs leading-5 text-[#42536c]">{text}</p></div></div>; }
