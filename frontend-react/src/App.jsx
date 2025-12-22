import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setSelectedArticle(data[0] || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
            <span style={{ ...styles.navItem, color: theme.headerText }}>Articles</span>
            <span style={{ ...styles.navItem, color: theme.headerText }}>Resources</span>
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
                  {selectedArticle.content
                    .split("\n\n")
                    .map((p, i) => (
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
            © 2025 BeyondChats. Built for assignment.
          </span>
          <div style={styles.footerLinks}>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
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

const styles = {
  app: { minHeight: "100vh", display: "flex", flexDirection: "column" },

  header: { position: "sticky", top: 0, zIndex: 10 },
  headerContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    height: "64px",
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoText: { fontSize: "18px", fontWeight: 600 },
  headerRight: { display: "flex", alignItems: "center", gap: "24px" },
  navItem: { fontSize: "14px" },
  themeToggle: {
    width: "36px",
    height: "36px",
    borderRadius: "6px",
    cursor: "pointer",
    background: "transparent",
  },

  mainWrapper: { flex: 1, padding: "48px 32px" },
  contentGrid: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "40px",
    display: "grid",
    gridTemplateColumns: "320px minmax(0,1fr)",
    gap: "56px",
    borderRadius: "14px",
  },

  sidebarTitle: { fontSize: "12px", letterSpacing: "0.1em" },
  sidebarCount: { fontSize: "12px", marginBottom: "24px" },
  articleList: { display: "flex", flexDirection: "column", gap: "6px" },
  articleItem: {
    padding: "12px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  articleArea: { minWidth: 0 },
  article: { maxWidth: "760px" },
  articleHeader: { paddingBottom: "32px", marginBottom: "32px" },
  articleTitle: { fontSize: "38px", lineHeight: 1.15 },
  badge: {
    display: "inline-block",
    fontSize: "12px",
    padding: "4px 12px",
    borderRadius: "999px",
    marginTop: "12px",
  },
  articleBody: { fontSize: "18px", lineHeight: 1.75 },
  paragraph: { marginBottom: "24px" },
  articleFooter: { marginTop: "48px", paddingTop: "24px" },

  footerInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "32px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
  },
  footerLinks: { display: "flex", gap: "16px" },
};

export default App;
