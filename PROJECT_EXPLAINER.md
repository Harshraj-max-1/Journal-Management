# Research Journal System: Project Overview

This document provides a simple explanation of how your Research Journal Management System is built and how it works.

---

## 1. The Technology Stack (What's under the hood?)

We used a modern set of tools that make the website fast, secure, and easy to use:

*   **TypeScript (The Language):** This is the main language used. It’s like a smarter version of JavaScript that helps prevent errors while writing code.
*   **Next.js (The Foundation):** The primary framework. It handles both the **Frontend** (what you see) and the **Backend** (the logic that happens behind the scenes).
*   **Tailwind CSS (The Styling):** A tool that allows us to design the look and feel (colors, spacing, and layouts) quickly and beautifully.
*   **Supabase (The Database):** This is our "Digital Filing Cabinet." It stores all user profiles, submission records, and review statuses safely.
*   **Prisma (The Connector):** This acts as a bridge between the code and the database, making it easy to save and retrieve information.
*   **Cloudinary (File Storage):** When a user uploads a PDF, it is stored in Cloudinary’s industrial-grade cloud storage, ensuring files are never lost.

---

## 2. Core Functionalities (How it works)

### 🚪 **Authentication (The Security Gate)**
*   **What it does:** Allows users to create accounts and log in.
*   **Google OAuth:** We integrated **NextAuth**, which lets users log in instantly using their Google account—no need to remember another password.
*   **Credentials:** Users can also use a traditional Email/Password setup.

### 📊 **The Dashboard (Your Command Center)**
*   **Bento Grid Layout:** We used a trendy "Bento Box" design for the dashboard, making it look organized and modern.
*   **Role-Based Access:** The system automatically knows if you are an **Author**, **Editor**, or **Publisher**, and shows you only the tools you need.

### 📝 **Manuscript Submission & Tracking**
*   **Submission Form:** Authors can upload their research titles, abstracts, and PDF files.
*   **Real-time Progress Bar:** We built a visual tracker so authors can see exactly where their paper is: *Submitted → Under Review → Accepted → Published.*
*   **Status Updates:** Editors can move papers through these stages with a single click.

### ✨ **Animations & UI (The User Experience)**
*   **GSAP Animations:** We added subtle scroll animations. As you scroll, elements fade and slide into place smoothly.
*   **Micro-interactions:** Buttons change shape or show loading spinners (like a "checkmark" when a task is finished) to give you instant feedback.

---

## 3. Summary of Roles

1.  **Author:** Uploads research and tracks the progress of their papers.
2.  **Editor:** The manager who reviews submissions and assigns them to the next stage.
3.  **Publisher/Reviewer:** Evaluates the quality of the research and provides feedback.
4.  **Reader:** Can view and read the final published scientific papers.

---

**This system is designed to be a "Monolith," meaning everything—the login, the database, and the user interface—is contained in one cohesive package for maximum efficiency.**
