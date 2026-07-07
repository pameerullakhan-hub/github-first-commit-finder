# Genesis: GitHub First Commit Finder

Genesis is a premium, high-fidelity developer utility that locates the very first (genesis) commit of any public GitHub repository. Inspired by modern **AI Agent Platforms** (featuring glassmorphism, radial glow gradients, and a command-palette query bar), it separates presentation from core API logic.

## 🚀 Key Features

- **Linear-Page Optimization:** Instead of retrieving thousands of commits sequentially, the backend fetches Page 1, reads the GitHub response headers, parses the `rel="last"` pagination link, and jumps directly to the last page to fetch the earliest commit in just 2 API requests.
- **Deep Dark Aesthetic:** Styled with transparent glass panels (`backdrop-blur`), subtle borders, glowing active-state inputs, and background ambient neon glows.
- **Project Age & Journey Timeline:** Computes the exact age of the project and displays an interactive, styled timeline leading from repository birth to its current star counts and active language.
- **Search History & Share Links:** Local-storage search history caching and query parameter synchronization (`?repo=owner/repo`) for seamless result sharing.

---

## 🛠️ Tech Stack

- **Backend:** FastAPI (Python), HTTPX (async requests), Pydantic Settings, Pytest.
- **Frontend:** React (Vite + TypeScript), Tailwind CSS, Lucide icons.

---

## 💻 Local Setup Instructions

Ensure you have **Python 3.8+** and **Node.js 18+** installed on your system.

### 1. Run the Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. (Optional) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Linux/macOS:
   source venv/bin/activate
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables (Optional but highly recommended to avoid API rate limits):
   - Edit the `.env` file inside `backend/` and supply your token:
     ```env
     GITHUB_TOKEN=ghp_yourPersonalAccessTokenHere
     ```
5. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The backend API docs will be active at `http://localhost:8000/api/v1/docs`.

### 2. Run the Frontend (Vite + React)

1. Open a new terminal tab and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
   The frontend interface will open at `http://localhost:3000` (or the port specified in your console).

---

## 🧪 Running Tests

To execute the backend unit tests (specifically verifying the repository parser logic, pagination headers, and async mock calls):

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Execute pytest:
   ```bash
   python -m pytest -v
   ```
