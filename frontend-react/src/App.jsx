import React, { useEffect, useState, useCallback } from "react";
import { fallbackArticles } from "./data/fallbackArticles";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const fetchArticles = useCallback(async () => {
    setLoading(true);

    if (!API_BASE_URL) {
      setArticles(fallbackArticles);
      setSelectedArticle(fallbackArticles[0]);
      setUsingFallback(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/articles`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setArticles(data);
      setSelectedArticle(data[0]);
      setUsingFallback(false);
    } catch {
      setArticles(fallbackArticles);
      setSelectedArticle(fallbackArticles[0]);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.pageBg,
        color: theme.text,
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: theme.headerBg,
          color: theme.headerText,
          padding: "14px 20px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={styles.headerInner}>
          <strong style={{ fontSize: 20 }}>BeyondChats</strong>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {usingFallback && (
              <span style={styles.demoBadge}>
                Demo Mode · Backend not deployed
              </span>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              style={styles.iconButton}
            >
              {darkMode ? "☀" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        <div style={{ ...styles.card, background: theme.surface }}>
          <div style={styles.layout}>
            {/* SIDEBAR */}
            <aside style={styles.sidebar}>
              <h4 style={{ marginBottom: 8 }}>Articles</h4>
              <small style={{ opacity: 0.7 }}>{articles.length} total</small>

              <div style={{ marginTop: 16 }}>
                {loading ? (
                  <div>Loading…</div>
                ) : (
                  articles.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setSelectedArticle(a)}
                      style={{
                        ...styles.articleItem,
                        background:
                          selectedArticle?.id === a.id
                            ? theme.activeBg
                            : "transparent",
                        borderLeft:
                          selectedArticle?.id === a.id
                            ? `3px solid ${theme.accent}`
                            : "3px solid transparent",
                      }}
                    >
                      {a.title}
                    </div>
                  ))
                )}
              </div>
            </aside>

            {/* ARTICLE */}
            <section style={styles.content}>
              {selectedArticle && (
                <>
                  <h1 style={styles.title}>{selectedArticle.title}</h1>

                  <span
                    style={{
                      ...styles.badge,
                      background: theme.badgeBg,
                      color: theme.badgeText,
                    }}
                  >
                    {selectedArticle.is_updated
                      ? "AI Enhanced"
                      : "Source Article"}
                  </span>

                  <p style={styles.bodyText}>{selectedArticle.content}</p>

                  <div style={styles.sourceBox}>
                    <span style={{ color: theme.sourceLabel }}>Source:</span>
                    <a
                      href={selectedArticle.source_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: theme.link }}
                    >
                      {selectedArticle.source_url}
                    </a>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "16px",
          color: theme.footerText,
        }}
      >
        © 2025 BeyondChats · Assignment Submission
      </footer>
    </div>
  );
}

/* ---------------- THEMES ---------------- */

const lightTheme = {
  pageBg: "#f3f7fb",
  surface: "#ffffff",
  headerBg: "#0b3350",
  headerText: "#ffffff",
  text: "#0f172a",
  activeBg: "#eef2ff",
  accent: "#2563eb",
  badgeBg: "#e0e7ff",
  badgeText: "#1e40af",
  sourceLabel: "#374151",
  link: "#2563eb",
  footerText: "#475569",
};

const darkTheme = {
  pageBg: "#0a0a0a",
  surface: "#0f1113",
  headerBg: "#0c1720",
  headerText: "#ffffff",
  text: "#f8fafc",
  activeBg: "#111827",
  accent: "#60a5fa",
  badgeBg: "#1e293b",
  badgeText: "#93c5fd",
  sourceLabel: "#9ca3af",
  link: "#60a5fa",
  footerText: "#9ca3af",
};

/* ---------------- STYLES ---------------- */

const styles = {
  headerInner: {
    maxWidth: 1280,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  main: {
    padding: "clamp(16px, 4vw, 32px)",
  },

  card: {
    maxWidth: 1280,
    margin: "0 auto",
    borderRadius: 14,
    padding: "clamp(16px, 3vw, 28px)",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    gap: 32,
  },

  sidebar: {
    fontSize: 14,
  },

  articleItem: {
    padding: "10px 12px",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 6,
  },

  content: {
    minWidth: 0,
  },

  title: {
    fontSize: "clamp(26px, 4vw, 42px)",
    lineHeight: 1.1,
  },

  badge: {
    display: "inline-block",
    marginTop: 8,
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12,
  },

  bodyText: {
    marginTop: 20,
    lineHeight: 1.8,
    fontSize: 17,
  },

  sourceBox: {
    marginTop: 24,
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    fontSize: 14,
  },

  demoBadge: {
    background: "#374151",
    color: "#e5e7eb",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
  },

  iconButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 18,
    color: "inherit",
  },
};
