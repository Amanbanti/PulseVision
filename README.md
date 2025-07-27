# 🩺 PulseVision - Medical Imaging Platform

PulseVision is an AI-powered medical imaging platform designed to help Ethiopian healthcare professionals analyze patient scans (e.g., X-rays, CT scans) efficiently. The platform supports diagnosis prediction, patient record management, and role-based access for doctors and admins.

---

## ✨ Features

- 🔍 AI-based diagnosis for medical scans
- 👨‍⚕️ Role-based user system (Admin, Doctor)
- 📈 Confidence scoring and abnormality detection
- 🧑‍💻 User authentication with JWT
- 📁 Scan upload and report generation
- 🌙 Dark/light mode toggle
- 📊 Admin dashboard with patient and scan insights

---

## 🧑‍💻 Tech Stack

**Frontend:**
- [Next.js (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Hot Toast](https://react-hot-toast.com/)

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT Auth](https://jwt.io/)
- [Hugging Face API](https://huggingface.co/) (for AI diagnosis)

---

## 📸 UI Preview

<!-- Add screenshots here -->
| Dashboard | Scan Upload | Report View |
|----------|-------------|-------------|
| ![Dashboard](docs/dashboard.png) | ![Upload](docs/upload.png) | ![Report](docs/report.png) |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Amanbanti/PulseVision.git
cd PulseVision

#!/usr/bin/env bash
# run.sh — one-shot setup & start script for PulseVision (backend + frontend)

set -euo pipefail

REPO_URL="https://github.com/Amanbanti/PulseVision.git"
PROJECT_DIR="PulseVision"

# 1) Clone
if [ ! -d "$PROJECT_DIR" ]; then
  git clone "$REPO_URL"
fi
cd "$PROJECT_DIR"

########################################
# 2) Backend
########################################
echo "==> Setting up backend..."
cd backend
npm install

# Create .env (edit the placeholders!)
cat > .env <<'EOF'
PORT=5001
MONGO_URI=YOUR_MONGODB_URI_HERE
JWT_SECRET=YOUR_SUPER_SECRET_KEY_HERE
HUGGING_FACE_TOKEN=YOUR_HUGGING_FACE_TOKEN_HERE
EOF

echo "Backend .env created. PLEASE EDIT it with real values before continuing."
read -p "Press Enter to continue (or Ctrl+C to abort) ..."

# Start backend in background
npm run dev &
BACKEND_PID=$!
echo "Backend started on PID $BACKEND_PID"
cd ..

########################################
# 3) Frontend
########################################
echo "==> Setting up frontend..."
cd frontend
npm install

# Create .env.local
cat > .env.local <<'EOF'
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001
EOF

# Start frontend (foreground)
npm run dev

# If frontend exits, bring backend down too
kill $BACKEND_PID 2>/dev/null || true


