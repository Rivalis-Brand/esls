import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ADMIN_PASSWORD = "Artieboi!";
const SESSION_KEY = "esls_admin_session";

type Lead = {
  id: string;
  [key: string]: any;
};

type Tab = "introLeads" | "estimates" | "inquiries";

function formatValue(val: any): string {
  if (!val) return "—";
  if (typeof val === "object" && val?.seconds) {
    return new Date(val.seconds * 1000).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  }
  if (typeof val === "object") return JSON.stringify(val);
  return String(val);
}

const COLUMN_ORDER: Record<Tab, string[]> = {
  introLeads: ["name", "phone", "email", "source", "createdAt", "timestamp"],
  estimates:  ["name", "phone", "email", "sqft", "surface", "total", "createdAt", "timestamp"],
  inquiries:  ["name", "phone", "email", "message", "service", "createdAt", "timestamp"],
};

function getColumns(tab: Tab, leads: Lead[]): string[] {
  const preferred = COLUMN_ORDER[tab];
  const all = leads.length > 0 ? Object.keys(leads[0]).filter(k => k !== "id") : [];
  const sorted = [
    ...preferred.filter(k => all.includes(k)),
    ...all.filter(k => !preferred.includes(k)),
  ];
  return sorted;
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("introLeads");
  const [data, setData] = useState<Record<Tab, Lead[]>>({ introLeads: [], estimates: [], inquiries: [] });
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    setFirebaseError(null);
    const tabs: Tab[] = ["introLeads", "estimates", "inquiries"];

    const sortByTime = (docs: Lead[]) =>
      [...docs].sort((a, b) => {
        const ta = a.timestamp?.seconds ?? (a.timestamp instanceof Date ? a.timestamp.getTime() / 1000 : 0);
        const tb = b.timestamp?.seconds ?? (b.timestamp instanceof Date ? b.timestamp.getTime() / 1000 : 0);
        return tb - ta;
      });

    Promise.all(
      tabs.map(async (tab) => {
        try {
          const snap = await getDocs(collection(db, tab));
          const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          return sortByTime(docs);
        } catch (err: any) {
          if (err?.code === "permission-denied") {
            setFirebaseError("Firebase permission denied — go to Firebase Console → Firestore → Rules and set: allow read, write: if true;");
          }
          return [];
        }
      })
    ).then(([introLeads, estimates, inquiries]) => {
      setData({ introLeads, estimates, inquiries });
      setLoading(false);
    });
  }, [authed]);

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
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-400 text-black font-bold transition"
            >
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

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Lead Dashboard</h1>
          <p className="text-white/40 text-xs">Elite Synthetic Lawn Solutions · {total} total leads</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-white/40 hover:text-white text-sm transition">← Site</a>
          <button onClick={handleLogout} className="text-sm text-white/40 hover:text-red-400 transition">Sign out</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {tabs.map(t => (
            <div key={t.key} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t.label}</p>
              <p className="text-3xl font-black text-green-400">{data[t.key].length}</p>
            </div>
          ))}
        </div>

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

        {firebaseError && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-red-400 text-sm">
            <strong>Firebase Error:</strong> {firebaseError}
            <div className="mt-2 text-red-400/70 text-xs">
              Go to Firebase Console → Firestore → Rules and set: <code className="bg-black/30 px-1 rounded">allow read, write: if true;</code> (for testing) or restrict to authenticated users.
            </div>
          </div>
        )}

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
                    {columns.map(col => (
                      <th key={col} className="px-4 py-3 text-left text-white/40 font-medium text-xs uppercase whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentLeads.map((lead, i) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-4 py-3 text-white/30">{i + 1}</td>
                      {columns.map(col => (
                        <td key={col} className="px-4 py-3 text-white/80 max-w-[240px] truncate">
                          {formatValue(lead[col])}
                        </td>
                      ))}
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
