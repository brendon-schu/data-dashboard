# React + Next.js Data Dashboard (Demonstration Project)

This is a full-stack **React + Next.js** dashboard application designed as both a **practice tool** and a **functional data management system**. It demonstrates real-world development skills including file handling, dynamic UI rendering, database operations, and stateful user interaction.

While it’s primarily a personal demo project, the system is fully usable and can serve as a foundation for real applications, admin panels, or future freelance work.

---

## 🛠️ Development Skills Demonstrated

This project touches nearly every core aspect of professional React + Next.js development:

- ✅ Functional components with dynamic props and conditional rendering
- ✅ `useState`, `useEffect`, and state management patterns
- ✅ Dynamic data-driven UI (sidebar tool toggles, dropdowns, toolbars)
- ✅ Backend API routes using Next.js `/pages/api/`
- ✅ File upload and download handling
- ✅ PostgreSQL integration using `pg` client
- ✅ File parsing and format conversion (CSV, JSON, SQL)
- ✅ Programmatic table creation and SQL insert logic
- ✅ Full CRUD (Create, Read, Update, Delete) dataset management
- ✅ Authentication-ready setup with session demo user
- ✅ Tailwind CSS with DaisyUI theme switching
- ✅ Modular layout with left/right sidebars, toolbar, and main content panel
- ✅ Conditional panel display based on user settings
- ✅ Utility-first styling, responsive layout, and scroll isolation via `100vh`/`100vw`

---

## 📦 Features

Here’s a complete list of currently implemented and planned features:

### ✅ Core Pages

- **Dashboard**: Central workspace with dynamic tool display based on dataset type
- **Data Manager**: Upload, convert, export, and delete datasets (CSV, JSON, SQL)
- **Profile**: Displays current user info (name, location, email, etc.)
- **Settings**: Save display theme, reference links, ambient visual settings, and which panels to show
- **Log**: (Planned) System activity log and audit trail

### ✅ Dataset Features

- Upload CSV or JSON files
- Reference existing SQL tables by name
- View datasets in all three formats (CSV, JSON, SQL)
- Convert datasets between formats
- Export CSV and JSON files directly
- Auto-clean deletion (removes DB table + local files)
- Internal PostgreSQL dataset registry with metadata: name, types, row count, file/table path

### 🧩 Sidebar Panel System

There are **12 sidebar panels** available, with **8 implemented** and **4 outstanding**:

#### Implemented:
- Dataset info preview
- Aggregation tools (sum, mean, etc.)
- Chart or graph panel
- Dataset stats

### 🔧 Remaining / Planned Features

1. 🎨 **Visual Toy Panel**:  
   Fun animation panel using canvas or SVG (e.g., moving lines or bouncing cube).

2. 🔗 **Reference Links Panel**:  
   Quick-access links pulled from user settings and styled for fast access.

3. 🧮 **Calculator Utility**:  
   Basic calculator using a math library, with potential for scientific mode.

4. 📜 **Audit Log Viewer**:  
   Pull recent log entries (once logging is implemented) and display them cleanly.

5. 🖼 **Image Handling & Uploads**:  
   Upload, preview, and manipulate images (e.g., crop, rotate, apply filters).

6. 🎮 **Advanced UI/UX Elements**:  
   Game-style interface elements (sliders, toggles, custom inputs) to demonstrate creative, interactive design.

7. 📊 **Expanded Charts**:  
   Click on mini charts to expand and analyze data in more detail.

8. 🗃 **Data Table with CRUD Support**:  
   Create/edit/delete dataset rows manually, or generate a table from scratch without import.

9. 📂 **Simple File Manager**:  
  Upload, view, and delete local files via a basic interface.

10. 🕒 **Clock Panel**:  
  Sidebar panel showing time/date; clicking the clock may expand a calendar or scheduler.


## ⚙️ Setup (Demo Use)

> Requires Node.js, npm, and PostgreSQL

1. Clone the repo
2. Create a `.env` file with your DB credentials
3. Run the setup script to create required DB tables
4. Start the server:

```bash
npm install
npm run dev

