import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/auth";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  sqft: number;
  tier: string;
  estimatedCost: number;
  companyId: string;
  createdAt: Timestamp | null;
  source?: string;
}

interface Company {
  id: string;
  leads: Lead[];
  totalLeads: number;
  totalValue: number;
}

const DEMO_COMPANIES = ["demo", "green-valley-turf", "socal-lawns", "premier-grass"];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [embedCopied, setEmbedCopied] = useState(false);

  useEffect(() => {
    loadAllLeads();
  }, []);

  const loadAllLeads = async () => {
    setLoading(true);
    const companyMap: Record<string, Lead[]> = {};

    for (const companyId of DEMO_COMPANIES) {
      try {
        const q = query(
          collection(db, `companies/${companyId}/leads`),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          companyMap[companyId] = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Lead));
        } else {
          companyMap[companyId] = [];
        }
      } catch {
        companyMap[companyId] = [];
      }
    }

    const result: Company[] = Object.entries(companyMap).map(([id, leads]) => ({
      id,
      leads,
      totalLeads: leads.length,
      totalValue: leads.reduce((sum, l) => sum + (l.estimatedCost || 0), 0),
    }));

    setCompanies(result);
    setLoading(false);
  };

  const totalLeads = companies.reduce((s, c) => s + c.totalLeads, 0);
  const totalValue = companies.reduce((s, c) => s + c.totalValue, 0);
  const activeCompanies = companies.filter((c) => c.totalLeads > 0).length;

  const selectedLeads = selectedCompany
    ? companies.find((c) => c.id === selectedCompany)?.leads ?? []
    : companies.flatMap((c) => c.leads);

  const getEmbedCode = (companyId: string) => {
    const base = window.location.origin + "/rivalis-widget/";
    return `<iframe src="${base}?companyId=${companyId}&companyName=Your+Company+Name" width="480" height="620" frameborder="0" style="border:none;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.3);"></iframe>`;
  };

  const copyEmbed = async (companyId: string) => {
    await navigator.clipboard.writeText(getEmbedCode(companyId));
    setEmbedCopied(true);
    setTimeout(() => setEmbedCopied(false), 2000);
  };

  const formatDate = (ts: Timestamp | null) => {
    if (!ts) return "—";
    return ts.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-foreground leading-none">Rivalis</h1>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
          <button
            onClick={logout}
            className="text-sm text-muted-foreground hover:text-foreground border border-border px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Leads", value: totalLeads, icon: "👤", color: "text-primary" },
            { label: "Active Companies", value: activeCompanies, icon: "🏢", color: "text-green-400" },
            { label: "Pipeline Value", value: `$${totalValue.toLocaleString()}`, icon: "💰", color: "text-yellow-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-card-border rounded-xl px-6 py-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-card-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Companies</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Click to filter leads</p>
            </div>
            <div className="divide-y divide-border">
              <button
                onClick={() => setSelectedCompany(null)}
                className={`w-full text-left px-5 py-4 transition-colors flex items-center justify-between ${
                  selectedCompany === null ? "bg-primary/10 text-foreground" : "hover:bg-secondary text-muted-foreground"
                }`}
              >
                <span className="font-medium text-sm">All Companies</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">{totalLeads}</span>
              </button>
              {companies.map((company) => (
                <div key={company.id}>
                  <button
                    onClick={() => setSelectedCompany(company.id === selectedCompany ? null : company.id)}
                    className={`w-full text-left px-5 py-4 transition-colors flex items-center justify-between ${
                      selectedCompany === company.id ? "bg-primary/10 text-foreground" : "hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm capitalize">{company.id.replace(/-/g, " ")}</p>
                      <p className="text-xs opacity-70 mt-0.5">${company.totalValue.toLocaleString()} pipeline</p>
                    </div>
                    <span className="text-xs bg-secondary text-foreground px-2 py-0.5 rounded-full font-semibold">{company.totalLeads}</span>
                  </button>
                  {selectedCompany === company.id && (
                    <div className="px-5 pb-4 bg-primary/5">
                      <p className="text-xs text-muted-foreground mb-2">Widget embed code:</p>
                      <div className="bg-background rounded-lg p-3 text-xs text-muted-foreground font-mono break-all border border-border">
                        {getEmbedCode(company.id).substring(0, 80)}...
                      </div>
                      <button
                        onClick={() => copyEmbed(company.id)}
                        className="mt-2 text-xs text-primary hover:underline"
                      >
                        {embedCopied ? "✓ Copied!" : "Copy embed code"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-card border border-card-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">
                  {selectedCompany ? `${selectedCompany.replace(/-/g, " ")} Leads` : "All Leads"}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedLeads.length} total</p>
              </div>
              <button
                onClick={loadAllLeads}
                className="text-xs text-muted-foreground hover:text-foreground border border-border px-3 py-1.5 rounded-lg transition-colors"
              >
                ↻ Refresh
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : selectedLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                  </svg>
                </div>
                <p className="text-muted-foreground text-sm">No leads yet. Share the widget to start capturing leads.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Area</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {selectedLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-secondary/50 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-foreground">{lead.name || "—"}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          <div>{lead.phone}</div>
                          {lead.email && <div className="text-xs">{lead.email}</div>}
                        </td>
                        <td className="px-5 py-3.5 text-foreground">{lead.sqft?.toLocaleString()} sq ft</td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full font-medium">
                            {lead.tier}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-bold text-primary">
                          ${lead.estimatedCost?.toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{formatDate(lead.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl px-6 py-5">
          <h2 className="font-semibold text-foreground mb-4">Add a New Company</h2>
          <p className="text-sm text-muted-foreground mb-4">
            To onboard a new turf company, give them a unique company ID and share the widget embed code. Their leads will automatically appear in this dashboard.
          </p>
          <div className="bg-secondary rounded-xl p-5">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Sample Widget Embed</p>
            <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap break-all">
{`<iframe 
  src="${window.location.origin}/rivalis-widget/?companyId=YOUR_COMPANY_ID&companyName=Company+Name"
  width="480" 
  height="620" 
  frameborder="0"
  style="border:none;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.3);"
></iframe>`}
            </pre>
          </div>
          <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Powered by Rivalis Computer Vision
          </p>
        </div>
      </main>
    </div>
  );
}
