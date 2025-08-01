# 🩺 PulseVision - Medical Imaging Platform

PulseVision is an AI-powered medical imaging platform designed to help Ethiopian healthcare professionals analyze patient scans (e.g., X-rays, CT scans) efficiently. The platform supports diagnosis prediction, patient record management, and role-based access for doctors and admins.

---

## 🚀 Deployed On

Frontend URL: [https://pulse-vision-mu.vercel.app](https://pulse-vision-mu.vercel.app)

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

### Dashboard

| Dashboard |
|-----------|
| ![Dashboard](https://raw.githubusercontent.com/Amanbanti/PulseVision/main/assets/dashbord.jpg) |

---

### Scan Upload

| Scan Upload |
|-------------|
| ![Upload](https://raw.githubusercontent.com/Amanbanti/PulseVision/main/assets/upload.jpg) |

---

### Patient View

| Patient View |
|--------------|
| ![Patient](https://raw.githubusercontent.com/Amanbanti/PulseVision/main/assets/patients.jpg) |

---

### User View

| User View |
|-----------|
| ![User](https://raw.githubusercontent.com/Amanbanti/PulseVision/main/assets/Users.jpg) |
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
    cd backend
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
    cd fronted
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


