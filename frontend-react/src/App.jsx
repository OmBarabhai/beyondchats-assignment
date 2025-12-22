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
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/articles`);
        if (!res.ok) throw new Error("Backend not reachable");

        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Empty API response");
        }

        setArticles(data);
        setSelectedArticle(data[0]);
        setUsingFallback(false);
      } catch (err) {
        console.warn("Using fallback data:", err.message);
        setArticles(fallbackArticles);
        setSelectedArticle(fallbackArticles[0]);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <div style={{ ...styles.app, backgroundColor: theme.pageBg, color: theme.textPrimary }}>
      {/* HEADER */}
      <header
        style={{
          ...styles.header,
          backgroundColor: theme.headerBg,
          borderBottom: `1px solid ${theme.borderColor}`,
        }}
      >
        <div style={styles.headerContainer}>
          <span style={{ ...styles.logoText, color: theme.headerText }}>
            BeyondChats
          </span>

          <div style={styles.headerRight}>
            <span style={{ ...styles.navItem, color: theme.headerText }}>
              Articles
            </span>

            {usingFallback && (
              <span style={styles.demoBadge}>
                Demo Mode · Backend running locally
              </span>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                ...styles.themeToggle,
                border: `1px solid ${theme.borderColor}`,
                color: theme.headerText,
              }}
            >
              {darkMode ? "☀" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main style={styles.mainWrapper}>
        <div
          style={{
            ...styles.contentGrid,
            backgroundColor: theme.surfaceBg,
            boxShadow: theme.cardShadow,
          }}
        >
          {/* SIDEBAR */}
          <aside>
            <h4 style={{ ...styles.sidebarTitle, color: theme.textSecondary }}>
              Articles
            </h4>

            <span style={{ ...styles.sidebarCount, color: theme.textTertiary }}>
              {articles.length} total
            </span>

            <div style={styles.articleList}>
              {loading ? (
                <p style={{ color: theme.textTertiary }}>Loading…</p>
              ) : (
                articles.map((article) => {
                  const active = selectedArticle?.id === article.id;
                  return (
                    <div
                      key={article.id}
                      onClick={() => {
                        setSelectedArticle(article);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      style={{
                        ...styles.articleItem,
                        backgroundColor: active ? theme.activeBg : "transparent",
                        borderLeft: active
                          ? `3px solid ${theme.accent}`
                          : "3px solid transparent",
                      }}
                    >
                      <span style={{ color: theme.textPrimary }}>
                        {article.title}
                      </span>

                      {usingFallback && (
                        <div style={styles.metaText}>
                          Demo article
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </aside>

          {/* ARTICLE VIEW */}
          <section style={styles.articleArea}>
            {selectedArticle && (
              <article style={styles.article}>
                <div
                  style={{
                    ...styles.articleHeader,
                    borderBottom: `1px solid ${theme.borderColor}`,
                  }}
                >
                  <h1 style={{ ...styles.articleTitle, color: theme.textPrimary }}>
                    {selectedArticle.title}
                  </h1>

                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: selectedArticle.is_updated
                        ? theme.aiBadgeBg
                        : theme.sourceBadgeBg,
                      color: selectedArticle.is_updated
                        ? theme.aiBadgeText
                        : theme.sourceBadgeText,
                    }}
                  >
                    {selectedArticle.is_updated ? "AI Enhanced" : "Source Article"}
                  </span>
                </div>

                <div style={{ ...styles.articleBody, color: theme.textBody }}>
                  {selectedArticle.content.split("\n\n").map((p, i) => (
                    <p key={i} style={styles.paragraph}>
                      {p}
                    </p>
                  ))}
                </div>

                <footer
                  style={{
                    ...styles.articleFooter,
                    borderTop: `1px solid ${theme.borderColor}`,
                  }}
                >
                  <span style={{ color: theme.textTertiary }}>Source</span>
                  <a
                    href={selectedArticle.source_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: theme.link }}
                  >
                    {selectedArticle.source_url}
                  </a>
                </footer>
              </article>
            )}
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          ...styles.footer,
          backgroundColor: theme.footerBg,
          borderTop: `1px solid ${theme.borderColor}`,
        }}
      >
        <div style={styles.footerInner}>
          <span style={{ color: theme.footerText }}>
            © 2025 BeyondChats · Assignment Submission
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ===== SMALL BUT CRITICAL STYLE FIXES ===== */

const styles = {
  app: { minHeight: "100vh", display: "flex", flexDirection: "column" },

  header: { position: "sticky", top: 0, zIndex: 10 },
  headerContainer: {
    maxWidth: "min(1400px, 100%)",
    margin: "0 auto",
    height: "64px",
    padding: "0 clamp(16px, 4vw, 32px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  demoBadge: {
    fontSize: "11px",
    padding: "4px 10px",
    borderRadius: "999px",
    background: "#374151",
    color: "#9ca3af",
  },

  mainWrapper: {
    flex: 1,
    padding: "clamp(16px, 4vw, 48px)",
  },

  contentGrid: {
    maxWidth: "min(1400px, 100%)",
    margin: "0 auto",
    padding: "clamp(20px, 4vw, 40px)",
    display: "grid",
    gridTemplateColumns: "minmax(220px, 320px) minmax(0,1fr)",
    gap: "clamp(24px, 4vw, 56px)",
    borderRadius: "14px",
  },

  metaText: {
    fontSize: "11px",
    opacity: 0.6,
    marginTop: "4px",
  },
}
/* THEMES */

const lightTheme = {
  pageBg: "#eef2f7",
  surfaceBg: "#ffffff",
  headerBg: "#0c2340",
  footerBg: "#0c2340",
  textPrimary: "#111827",
  textBody: "#374151",
  textSecondary: "#4b5563",
  textTertiary: "#9ca3af",
  headerText: "#ffffff",
  footerText: "rgba(255,255,255,0.85)",
  borderColor: "#e5e7eb",
  accent: "#2563eb",
  link: "#2563eb",
  activeBg: "#f3f4f6",
  aiBadgeBg: "#dbeafe",
  aiBadgeText: "#1e40af",
  sourceBadgeBg: "#f3f4f6",
  sourceBadgeText: "#6b7280",
  cardShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const darkTheme = {
  pageBg: "#0a0a0a",
  surfaceBg: "#121212",
  headerBg: "#18181b",
  footerBg: "#18181b",
  textPrimary: "#f4f4f5",
  textBody: "#d4d4d8",
  textSecondary: "#a1a1aa",
  textTertiary: "#71717a",
  headerText: "#e5e7eb",
  footerText: "#a1a1aa",
  borderColor: "#27272a",
  accent: "#60a5fa",
  link: "#60a5fa",
  activeBg: "#18181b",
  aiBadgeBg: "#1e3a5f",
  aiBadgeText: "#93c5fd",
  sourceBadgeBg: "#27272a",
  sourceBadgeText: "#a1a1aa",
  cardShadow: "0 12px 30px rgba(0,0,0,0.4)",
};

/* STYLES */
// 
// const styles = {
  // app: { minHeight: "100vh", display: "flex", flexDirection: "column" },
// 
  // header: { position: "sticky", top: 0, zIndex: 10 },
  // headerContainer: {
    // maxWidth: "1400px",
    // margin: "0 auto",
    // height: "64px",
    // padding: "0 32px",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "space-between",
  // },
  // logoText: { fontSize: "18px", fontWeight: 600 },
  // headerRight: { display: "flex", alignItems: "center", gap: "24px" },
  // navItem: { fontSize: "14px" },
  // themeToggle: {
    // width: "36px",
    // height: "36px",
    // borderRadius: "6px",
    // cursor: "pointer",
    // background: "transparent",
  // },
// 
  // mainWrapper: { flex: 1, padding: "48px 32px" },
  // contentGrid: {
    // maxWidth: "1400px",
    // margin: "0 auto",
    // padding: "40px",
    // display: "grid",
    // gridTemplateColumns: "320px minmax(0,1fr)",
    // gap: "56px",
    // borderRadius: "14px",
  // },
// 
  // sidebarTitle: { fontSize: "12px", letterSpacing: "0.1em" },
  // sidebarCount: { fontSize: "12px", marginBottom: "24px" },
  // articleList: { display: "flex", flexDirection: "column", gap: "6px" },
  // articleItem: {
    // padding: "12px 16px",
    // borderRadius: "8px",
    // cursor: "pointer",
    // fontSize: "14px",
  // },
// 
  // articleArea: { minWidth: 0 },
  // article: { maxWidth: "760px" },
  // articleHeader: { paddingBottom: "32px", marginBottom: "32px" },
  // articleTitle: { fontSize: "38px", lineHeight: 1.15 },
  // badge: {
    // display: "inline-block",
    // fontSize: "12px",
    // padding: "4px 12px",
    // borderRadius: "999px",
    // marginTop: "12px",
  // },
  // articleBody: { fontSize: "18px", lineHeight: 1.75 },
  // paragraph: { marginBottom: "24px" },
  // articleFooter: { marginTop: "48px", paddingTop: "24px" },
// 
  // footerInner: {
    // maxWidth: "1400px",
    // margin: "0 auto",
    // padding: "32px",
    // display: "flex",
    // justifyContent: "space-between",
    // fontSize: "13px",
  // },
  // footerLinks: { display: "flex", gap: "16px" },
// };

export default App;
