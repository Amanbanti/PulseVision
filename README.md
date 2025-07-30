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

| Dashboard | Scan Upload | Patient View | User View |
|----------|-------------|-------------|
| ![Dashboard](/frontend/dashboard.jpg) | ![Upload](/frontend/upload.jpg) | ![Patient](/frontend/patients.jpg) | ![User](/frontend/Users.jpg) |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/Amanbanti/PulseVision.git](https://github.com/Amanbanti/PulseVision.git)
cd PulseVision
```

### 2. Running the Backend (Server)

Follow these steps to get the server running:

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and populate it based on the `env.example` file.
4.  Start the development server:
    ```bash
    npm run dev
    ```

### 3. Running the Frontend (Client)

Follow these steps to get the client running:

1.  Navigate to the client directory from the root folder:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file and populate it based on the `.env.example` file.
4.  Start the development server:
    ```bash
    npm run dev
    ```


