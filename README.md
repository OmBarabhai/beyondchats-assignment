# BeyondChats – Full Stack Engineer / Technical Product Manager Assignment

This repository contains my submission for the **BeyondChats Full Stack Engineer / Technical Product Manager** assignment.

The goal of this assignment was **not perfect completeness**, but to demonstrate how I approach real-world problems under constraints - including **system design, trade-offs, prioritization, and execution clarity**.

I focused on building a **reliable end-to-end system**, documenting conscious decisions, and avoiding over-engineering where it didn’t add value.

---

## 🧠 Tech Stack

### Backend

- Laravel (PHP 8.2)
- SQLite (local development)
- Symfony HTTP Client + DomCrawler (scraping)

### Frontend

- ReactJS (Vite)
- Custom CSS
- Dark / Light mode support

### Planned / Design-Level

- Node.js
- LLM APIs (OpenAI / Claude)

---

## 🏗️ High-Level Architecture

```
BeyondChats Blog
        ↓
Laravel Scraper Command
        ↓
Articles Database
        ↓
REST APIs
        ↓
React Frontend
```

This architecture mirrors a **real internal content pipeline**, separating ingestion, storage, transformation, and presentation.

---

## 📁 Repository Structure

```
beyondchats-assignment/
├── backend-laravel/
├── frontend-react/
├── node-llm-pipeline/
│   └── README.md
└── README.md
```

- `backend-laravel` → Scraping + CRUD APIs
- `frontend-react` → Article reader UI
- `node-llm-pipeline` → Phase 2 design & flow documentation

---

## ⚙️ Local Setup Instructions

### Backend (Laravel)

```bash
cd backend-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Backend runs at:
**[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### Frontend (React)

```bash
cd frontend-react
npm install
npm run dev
```

Frontend runs at:
**[http://localhost:5173](http://localhost:5173)**

---

## 🌐 Live Demo

Frontend (Deployed):
👉 **[Add your Vercel link here]**

Backend:
Runs locally via Laravel (setup above)

---

## 📌 Phase 1 – Blog Scraping & CRUD APIs (Completed)

### Objective

- Scrape the **5 oldest articles** from BeyondChats blogs
- Store them in a database
- Expose full CRUD APIs via Laravel

---

### Pagination & Scraping Strategy

To reliably fetch the **oldest articles**, the pagination structure of
[https://beyondchats.com/blogs/](https://beyondchats.com/blogs/) was analyzed.

**Chosen approach:**

1. Load the blog listing page
2. Detect pagination links
3. Identify the **last page**
4. Scrape articles from that page

This ensures deterministic behavior without fragile assumptions.

> **Trade-off:**
> Instead of iterating through all pages, the scraper directly targets the last page.
> This improves reliability and reduces unnecessary requests - an intentional decision under time constraints.

---

### Stored Article Fields

- `title`
- `slug`
- `content`
- `source_url`
- `is_updated`
- timestamps

---

### APIs Implemented

```http
GET    /api/articles
GET    /api/articles/{id}
POST   /api/articles
PUT    /api/articles/{id}
DELETE /api/articles/{id}
```

These APIs are consumed directly by the React frontend.

---

### Known Limitation (Intentional)

The article body currently stores **preview-level content** from the listing page.

**Reason:**

- Blog pages use inconsistent DOM structures
- Production-grade scraping typically requires:

  - Template-based parsing, or
  - Readability / NLP-based extraction

> Given the assignment scope, I prioritized **end-to-end system reliability** over aggressive scraping.

---

## 🤖 Phase 2 – LLM-Based Article Enhancement (Design-Level)

Phase 2 is implemented as a **system design and flow**, not full execution.

### Intended Flow

1. Fetch latest article from Laravel API
2. Search Google for high-ranking related articles
3. Scrape external article content
4. Use an LLM to rewrite/improve the original article
5. Publish updated content via Laravel API with citations

This design is documented in:
📄 `node-llm-pipeline/README.md`

> **Trade-off:**
> Full execution was skipped due to external API dependencies and time constraints, which aligns with the assignment’s expectations for partial completion.

---

## 🎨 Phase 3 – React Frontend (Completed)

### Features

- Sidebar-based article navigation
- Article reader view
- Dark / Light mode toggle
- Source article attribution
- Responsive, production-style layout

### Design Philosophy

- Content-first UI
- Minimal distractions
- Internal-tool / CMS-style experience
- Clear hierarchy and readability

---

## 🎯 Engineering Trade-offs

- Prioritized **clarity and reliability** over completeness
- Focused on **end-to-end flow**, not isolated features
- Implemented Phase 2 as a design skeleton intentionally
- Avoided unnecessary infrastructure complexity
- Chose simplicity where it improved maintainability

---

## 🏁 Final Notes

This submission reflects how I approach real-world engineering problems:

- Understand constraints
- Make intentional trade-offs
- Deliver a working system
- Document limitations honestly

Partial completion was **intentional** and aligned with the assignment guidelines.

---

**- Om Barabhai**

---
