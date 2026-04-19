import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ADMIN_PASSWORD = "Artieboi!";
const SESSION_KEY = "esls_admin_session";

type Lead = {
  id: string;
  followedUp?: boolean;
  [key: string]: any;
};

type Tab = "introLeads" | "estimates" | "inquiries";

function formatValue(val: any): string {
  if (val === null || val === undefined) return "—";
  if (typeof val === "boolean") return val ? "Yes" : "No";
  if (typeof val === "object" && val?.seconds) {
    return new Date(val.seconds * 1000).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  }
  if (typeof val === "object") return JSON.stringify(val);
  return String(val);
}

const COLUMN_ORDER: Record<Tab, string[]> = {
  introLeads: ["name", "phone", "email", "source", "timestamp"],
  estimates:  ["name", "phone", "email", "sqft", "surface", "total", "timestamp"],
  inquiries:  ["name", "phone", "email", "message", "service", "timestamp"],
};

function getColumns(tab: Tab, leads: Lead[]): string[] {
  const preferred = COLUMN_ORDER[tab];
  const all = leads.length > 0
    ? Object.keys(leads[0]).filter(k => k !== "id" && k !== "followedUp")
    : [];
  return [
    ...preferred.filter(k => all.includes(k)),
    ...all.filter(k => !preferred.includes(k)),
  ];
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("introLeads");
  const [data, setData] = useState<Record<Tab, Lead[]>>({ introLeads: [], estimates: [], inquiries: [] });
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const [actionId, setActionId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPasswordInput("");
  }

  const fetchData = () => {
    setLoading(true);
    setFirebaseError(null);
    setDebugLog([]);
    const tabs: Tab[] = ["introLeads", "estimates", "inquiries"];
    const logs: string[] = [];

    const sortByTime = (docs: Lead[]) =>
      [...docs].sort((a, b) => {
        const ta = a.timestamp?.seconds ?? 0;
        const tb = b.timestamp?.seconds ?? 0;
        return tb - ta;
      });

    Promise.all(
      tabs.map(async (tab) => {
        try {
          logs.push(`Fetching ${tab}...`);
          const snap = await getDocs(collection(db, tab));
          logs.push(`✓ ${tab}: ${snap.docs.length} docs found`);
          const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          return sortByTime(docs);
        } catch (err: any) {
          const msg = err?.code ?? err?.message ?? String(err);
          logs.push(`✗ ${tab} error: ${msg}`);
          if (err?.code === "permission-denied") {
            setFirebaseError("Firebase rules are blocking reads. Go to Firebase Console → Firestore → Rules and set: allow read, write: if true;");
          } else {
            setFirebaseError(`Error fetching data: ${msg}`);
          }
          return [];
        }
      })
    ).then(([introLeads, estimates, inquiries]) => {
      setData({ introLeads, estimates, inquiries });
      setDebugLog(logs);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!authed) return;
    fetchData();
  }, [authed]);

  async function toggleFollowedUp(lead: Lead) {
    setActionId(lead.id);
    try {
      const newVal = !lead.followedUp;
      await updateDoc(doc(db, activeTab, lead.id), { followedUp: newVal });
      setData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(l =>
          l.id === lead.id ? { ...l, followedUp: newVal } : l
        ),
      }));
    } catch (err: any) {
      setFirebaseError(`Could not update: ${err?.code ?? err?.message}`);
    } finally {
      setActionId(null);
    }
  }

  async function deleteLead(id: string) {
    setActionId(id);
    try {
      await deleteDoc(doc(db, activeTab, id));
      setData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(l => l.id !== id),
      }));
    } catch (err: any) {
      setFirebaseError(`Could not delete: ${err?.code ?? err?.message}`);
    } finally {
      setActionId(null);
      setConfirmDelete(null);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-white/50 text-sm mt-1">Elite Synthetic Lawn Solutions</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(false); }}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${passwordError ? "border-red-500" : "border-white/10"} text-white placeholder-white/30 focus:outline-none focus:border-green-500 transition`}
              autoFocus
            />
            {passwordError && <p className="text-red-400 text-sm">Incorrect password.</p>}
            <button type="submit" className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-400 text-black font-bold transition">
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-white/30 hover:text-white/60 text-sm transition">← Back to site</a>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "introLeads", label: "Intro Leads" },
    { key: "estimates",  label: "Estimates" },
    { key: "inquiries",  label: "Inquiries" },
  ];

  const currentLeads = data[activeTab];
  const columns = getColumns(activeTab, currentLeads);
  const total = data.introLeads.length + data.estimates.length + data.inquiries.length;
  const followedCount = currentLeads.filter(l => l.followedUp).length;
  const pendingCount = currentLeads.length - followedCount;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Lead Dashboard</h1>
          <p className="text-white/40 text-xs">Elite Synthetic Lawn Solutions · {total} total leads</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={fetchData} className="text-sm text-white/40 hover:text-green-400 transition">↻ Reload</button>
          <a href="/" className="text-white/40 hover:text-white text-sm transition">← Site</a>
          <button onClick={handleLogout} className="text-sm text-white/40 hover:text-red-400 transition">Sign out</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {tabs.map(t => (
            <div key={t.key} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t.label}</p>
              <p className="text-3xl font-black text-green-400">{data[t.key].length}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === t.key
                  ? "bg-green-500 text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {t.label} ({data[t.key].length})
            </button>
          ))}
        </div>

        {/* Follow-up summary for current tab */}
        {currentLeads.length > 0 && (
          <div className="flex gap-3 mb-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2 text-xs text-yellow-400">
              ⏳ {pendingCount} need follow-up
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2 text-xs text-green-400">
              ✓ {followedCount} followed up
            </div>
          </div>
        )}

        {/* Error */}
        {firebaseError && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-red-400 text-sm">
            <strong>Error:</strong> {firebaseError}
          </div>
        )}

        {/* Debug log */}
        {debugLog.length > 0 && (
          <div className="mb-4 bg-white/3 border border-white/10 rounded-xl px-5 py-3 font-mono text-xs space-y-1">
            {debugLog.map((line, i) => (
              <div key={i} className={line.startsWith("✓") ? "text-green-400" : line.startsWith("✗") ? "text-red-400" : "text-white/40"}>
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Confirm delete modal */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center">
              <p className="text-white font-semibold mb-2">Delete this lead?</p>
              <p className="text-white/50 text-sm mb-6">This cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteLead(confirmDelete)}
                  disabled={actionId === confirmDelete}
                  className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold transition text-sm disabled:opacity-50"
                >
                  {actionId === confirmDelete ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-white/30">Loading leads...</div>
        ) : currentLeads.length === 0 ? (
          <div className="text-center py-20 text-white/30">No {activeTab} yet.</div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-left text-white/40 font-medium text-xs uppercase">#</th>
                    <th className="px-4 py-3 text-left text-white/40 font-medium text-xs uppercase whitespace-nowrap">Status</th>
                    {columns.map(col => (
                      <th key={col} className="px-4 py-3 text-left text-white/40 font-medium text-xs uppercase whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right text-white/40 font-medium text-xs uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeads.map((lead, i) => (
                    <tr
                      key={lead.id}
                      className={`border-b border-white/5 transition ${
                        lead.followedUp ? "bg-green-500/5" : "hover:bg-white/5"
                      }`}
                    >
                      <td className="px-4 py-3 text-white/30">{i + 1}</td>

                      {/* Follow-up toggle */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleFollowedUp(lead)}
                          disabled={actionId === lead.id}
                          title={lead.followedUp ? "Mark as not followed up" : "Mark as followed up"}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${
                            lead.followedUp
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                          } disabled:opacity-40`}
                        >
                          {actionId === lead.id ? "…" : lead.followedUp ? "✓ Done" : "⏳ Pending"}
                        </button>
                      </td>

                      {columns.map(col => (
                        <td key={col} className="px-4 py-3 text-white/80 max-w-[220px] truncate">
                          {formatValue(lead[col])}
                        </td>
                      ))}

                      {/* Delete */}
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setConfirmDelete(lead.id)}
                          title="Delete lead"
                          className="text-white/20 hover:text-red-400 transition text-lg leading-none"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
