# BeyondChats – Full Stack Engineer / Technical Product Manager Assignment

This repository contains my submission for the BeyondChats Full Stack Engineer / Technical Product Manager assignment.

The purpose of this assignment was to demonstrate how I approach real-world problems under constraints: system design, trade-offs, clarity of thinking, and execution — rather than perfect completeness.

---

## 🔧 Tech Stack

Backend:
- Laravel (PHP 8.2)
- SQLite (local development)
- Symfony HTTP Client + DomCrawler

Frontend:
- ReactJS (Vite)
- Custom CSS
- Dark / Light mode

Planned (Phase 2):
- Node.js
- LLM APIs (OpenAI / Claude)

---

## 🧱 High-Level Architecture

BeyondChats Blog  
↓  
Laravel Scraper Command  
↓  
Articles Database  
↓  
REST APIs  
↓  
React Frontend  

---

## 📁 Repository Structure

beyondchats-assignment/ │ ├── backend-laravel/ ├── frontend-react/ ├── node-llm-pipeline/ │   └── README.md └── README.md

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

Backend URL:

http://127.0.0.1:8000


---

Frontend (React)

cd frontend-react
npm install
npm run dev

Frontend URL:

http://localhost:5173


---

📌 Phase 1 – Blog Scraping & APIs (Completed)

Objective

Scrape the 5 oldest articles from BeyondChats blogs

Store them in a database

Expose CRUD APIs using Laravel


Pagination & Scraping Strategy

To fetch the oldest articles, the pagination structure of
https://beyondchats.com/blogs/ was analyzed.

The reliable approach is:

1. Load the blog listing page


2. Detect pagination links


3. Identify the last page


4. Scrape articles from that page



For this assignment, the implementation focuses on deterministic scraping of the last page to ensure correctness and simplicity under time constraints.

This trade-off was intentional.


---

Stored Article Fields

title

slug

content

source_url

is_updated

timestamps



---

APIs Implemented

GET    /api/articles
GET    /api/articles/{id}
POST   /api/articles
PUT    /api/articles/{id}
DELETE /api/articles/{id}


---

⚠️ Known Limitation

The article body currently stores preview-level content extracted from the listing page.

Full article scraping was intentionally skipped because:

Blog pages use inconsistent DOM structures

Production systems require template-based or readability-based parsing


The focus was on end-to-end system reliability rather than aggressive scraping.


---

🤖 Phase 2 – LLM-Based Article Enhancement (Design-Level)

Phase 2 is implemented as a design and system plan, not full execution.

Intended Flow

1. Fetch latest article from Laravel API


2. Search Google for related high-ranking articles


3. Scrape content from external sources


4. Use an LLM to rewrite the article


5. Publish updated article via Laravel API with citations



This phase is documented in:

node-llm-pipeline/README.md

The partial implementation reflects a conscious trade-off aligned with the assignment’s time expectations.


---

🎨 Phase 3 – React Frontend (Completed)

Features

Sidebar article navigation

Article reader view

Dark / Light mode toggle

Source article attribution

Clean, responsive layout


Design Philosophy

Content-first UI

Minimal distractions

Production-style internal tool feel

Clear hierarchy and readability



---

🎯 Engineering Trade-offs

Prioritized system clarity over perfect scraping

Focused on end-to-end flow rather than isolated features

Implemented Phase 2 as a design skeleton due to external API and time constraints

Avoided over-engineering



---

🏁 Final Notes

This submission reflects how I approach real-world engineering problems:

Understand constraints

Make intentional trade-offs

Deliver a working system

Document limitations honestly


Partial completion was intentional and aligned with the assignment guidelines.


---

— Om Barabhai

---