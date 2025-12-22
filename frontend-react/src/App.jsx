import { useEffect, useState } from "react";
import { fallbackArticles } from "./data/fallbackArticles";

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function loadArticles() {
      try {
        if (!API_BASE_URL) throw new Error("API not configured");

        const res = await fetch(`${API_BASE_URL}/api/articles`);
        if (!res.ok) throw new Error("Backend unreachable");

        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Empty API response");
        }

        setArticles(data);
        setSelectedArticle(data[0]);
        setUsingFallback(false);
      } catch (err) {
        console.warn("Demo mode enabled:", err.message);
        setArticles(fallbackArticles);
        setSelectedArticle(fallbackArticles[0]);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <div
      style={{
        ...styles.app,
        background: theme.pageBg,
        color: theme.textPrimary,
      }}
    >
      {/* HEADER */}
      <header style={{ ...styles.header, background: theme.headerBg }}>
        <div style={styles.headerInner}>
          <strong>BeyondChats</strong>

          <div style={styles.headerRight}>
            {usingFallback && (
              <span style={styles.demoBadge}>
                Demo Mode · Backend API not deployed
              </span>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{ ...styles.themeToggle, borderColor: theme.borderColor }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        <div style={{ ...styles.card, background: theme.surfaceBg }}>
          {/* SIDEBAR */}
          <aside style={styles.sidebar}>
            <h4 style={{ color: theme.textSecondary }}>Articles</h4>
            <small style={{ color: theme.textTertiary }}>
              {articles.length} total
            </small>

            <div style={styles.articleList}>
              {loading ? (
                <p>Loading…</p>
              ) : (
                articles.map((a) => {
                  const active = selectedArticle?.id === a.id;
                  return (
                    <div
                      key={a.id}
                      onClick={() => setSelectedArticle(a)}
                      style={{
                        ...styles.articleItem,
                        background: active ? theme.activeBg : "transparent",
                        borderLeft: active
                          ? `3px solid ${theme.accent}`
                          : "3px solid transparent",
                      }}
                    >
                      {a.title}
                      {usingFallback && (
                        <div style={styles.demoLabel}>Demo article</div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </aside>

          {/* CONTENT */}
          <section style={styles.content}>
            {selectedArticle && (
              <>
                <h1 style={styles.title}>{selectedArticle.title}</h1>

                <span style={styles.badge}>
                  {selectedArticle.is_updated
                    ? "AI Enhanced"
                    : "Source Article"}
                </span>

                <p style={styles.body}>{selectedArticle.content}</p>

                <a
                  href={selectedArticle.source_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: theme.link }}
                >
                  View original source →
                </a>
              </>
            )}
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ ...styles.footer, background: theme.footerBg }}>
        © 2025 BeyondChats · Assignment Submission
      </footer>
    </div>
  );
}

/* ================== STYLES ================== */

const styles = {
  app: { minHeight: "100vh", display: "flex", flexDirection: "column" },

  header: { position: "sticky", top: 0, zIndex: 10 },
  headerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerRight: { display: "flex", gap: "12px", alignItems: "center" },

  demoBadge: {
    fontSize: "11px",
    background: "#374151",
    padding: "4px 10px",
    borderRadius: "999px",
  },

  themeToggle: {
    background: "transparent",
    border: "1px solid",
    borderRadius: "6px",
    padding: "6px",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "clamp(16px, 4vw, 40px)",
  },

  card: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "minmax(200px, 300px) 1fr",
    gap: "32px",
    padding: "clamp(16px, 4vw, 40px)",
    borderRadius: "14px",
  },

  sidebar: { minWidth: 0 },
  articleList: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  articleItem: {
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  demoLabel: {
    fontSize: "11px",
    opacity: 0.6,
  },

  content: { minWidth: 0 },

  title: {
    fontSize: "clamp(24px, 4vw, 42px)",
    lineHeight: 1.2,
    marginBottom: "12px",
  },

  badge: {
    display: "inline-block",
    fontSize: "12px",
    padding: "4px 12px",
    borderRadius: "999px",
    background: "#e5e7eb",
    marginBottom: "24px",
  },

  body: {
    fontSize: "clamp(15px, 1.4vw, 18px)",
    lineHeight: 1.7,
    marginBottom: "24px",
  },

  footer: {
    padding: "16px",
    textAlign: "center",
    fontSize: "13px",
  },
};

/* ================== THEMES ================== */

const lightTheme = {
  pageBg: "#eef2f7",
  surfaceBg: "#ffffff",
  headerBg: "#0c2340",
  footerBg: "#0c2340",
  textPrimary: "#111827",
  textSecondary: "#4b5563",
  textTertiary: "#9ca3af",
  borderColor: "#e5e7eb",
  accent: "#2563eb",
  link: "#2563eb",
  activeBg: "#f3f4f6",
};

const darkTheme = {
  pageBg: "#0a0a0a",
  surfaceBg: "#121212",
  headerBg: "#18181b",
  footerBg: "#18181b",
  textPrimary: "#f4f4f5",
  textSecondary: "#a1a1aa",
  textTertiary: "#71717a",
  borderColor: "#27272a",
  accent: "#60a5fa",
  link: "#60a5fa",
  activeBg: "#18181b",
};

export default App;
