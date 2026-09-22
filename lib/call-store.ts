export type StoredCall = {
  customerName: string;
  phone: string;
  callPurpose: string;
  outcome: string;
  sentiment: string;
  summary: string;
  followUpRequired: boolean;
  timestamp: string;
};

type Store = { calls: StoredCall[] };

const globalStore = globalThis as typeof globalThis & { __callFlowStore?: Store };
const store = globalStore.__callFlowStore ?? { calls: [] };
globalStore.__callFlowStore = store;

export function saveCall(call: Omit<StoredCall, "timestamp"> & { timestamp?: string }) {
  const storedCall = { ...call, timestamp: call.timestamp || new Date().toISOString() };
  store.calls = [storedCall, ...store.calls.filter((item) => item.timestamp !== storedCall.timestamp)];
  return storedCall;
}

export function getCalls(limit = 500) {
  return store.calls.slice(0, limit);
}
