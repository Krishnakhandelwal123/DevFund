<div align="center">

# 💸 DevFund

### *Fund the Future of Development*

A full-stack crowdfunding and patronage platform connecting supporters with developers, designers, and data scientists.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B?style=flat-square&logo=razorpay)](https://razorpay.com/)
[![Firebase](https://img.shields.io/badge/Auth-Firebase-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)

</div>

---

## 📖 Overview

**DevFund** is a MERN-based crowdfunding platform built for the tech community. Supporters can discover and financially back creators, while creators — developers, data scientists, and designers — can build a public profile, share posts, and receive funding for their work.

---

## ✨ Features

### For Supporters
- 🔍 **Explore** — Browse and discover tech creators
- 👤 **Creator Profiles** — View bio, posts, social links, and stats
- 💳 **One-time Donations** — Fund creators via Razorpay (min ₹50)
- ❤️ **Like Posts** — Engage with creator content
- 📊 **Funding History** — Track your contributions

### For Creators
- 🚀 **Become a Creator** — Set up a profile with bio, category, avatar, and social links
- 📝 **Create Posts** — Share image + caption updates with your supporters
- 📈 **Analytics** — View supporter count, earnings, and post stats
- 👥 **Manage Supporters** — See who's backing you
- 💰 **Payout Setup** — Link UPI/Bank account for withdrawals via Razorpay

### Authentication
- 📧 Email/Password signup & login
- 🔑 Google OAuth sign-in
- ✅ Email verification via code
- 🔐 Forgot/Reset password flow
- 🛡️ Role-based access: `Supporter` (default) and `Creator`

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (React + Vite)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │   Supporter  │  │   Creator    │  │     Auth     │               │
│  │   Dashboard  │  │   Dashboard  │  │  (Firebase)  │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         └──────────────────┼─────────────────┘                        │
│                            │ Axios (REST API)                         │
└────────────────────────────┼─────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js + Express)                        │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────────┐  │
│  │   Auth     │ │  Creator   │ │  Supporter │ │    Payments      │  │
│  │  Routes    │ │  Routes    │ │  Routes    │ │   (Razorpay)     │  │
│  └────────────┘ └────────────┘ └────────────┘ └──────────────────┘  │
│              Auth Middleware · Sanitize · Rate Limit                  │
└────────────────────────────┼─────────────────────────────────────────┘
                             ▼
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   MongoDB    │    │  Cloudinary  │    │   Razorpay   │
│  (Database)  │    │   (Images)   │    │  (Payments)  │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite 7 | UI framework & build tool |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Zustand | Lightweight state management |
| Axios | HTTP client |
| Firebase | Client-side auth & Google OAuth |
| Razorpay Checkout | Payment UI |
| Three.js / R3F | 3D graphics & visuals |
| Lucide React + Radix UI | Icons & UI primitives |
| Locomotive Scroll | Smooth scrolling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | Runtime & web framework |
| MongoDB + Mongoose 8 | Database & ODM |
| Firebase Admin | Server-side token verification |
| JWT + bcryptjs | Auth & password hashing |
| Razorpay | Payment processing |
| Cloudinary | Image uploads & storage |
| Nodemailer | Transactional emails |
| Multer | File upload handling |
| Helmet + CORS + express-rate-limit | Security |
| DOMPurify + jsdom | XSS protection |

---

## 💳 Payment Flow

```
Supporter selects amount
        │
        ▼
Backend creates Razorpay order + Donation record
        │
        ▼
Razorpay Checkout modal handles payment
        │
        ▼
Backend verifies signature & updates Donation status
        │
        ▼
5% platform fee applied → net amount credited to creator
        │
        ▼
Creator withdraws via linked UPI/Bank (Razorpay settlement)
```

---

## 📁 Project Structure

```
DevFund/
├── backend/
│   ├── index.js                    # Express app entry
│   └── src/
│       ├── controllers/            # auth, creator, supporter, post, payment
│       ├── lib/                    # db, firebase, razorpay, cloudinary
│       ├── middlewares/            # auth, upload, rateLimit, sanitize
│       ├── models/                 # User, Post, Donation, SupporterProfile, etc.
│       └── routes/                 # auth, supporter, creator, post, payment
└── frontend/
    └── src/
        ├── components/             # Navbar, Hero, Footer, Sky, Card, etc.
        ├── lib/                    # Axios instance, Firebase config
        ├── pages/                  # Home, Login, Signup, CreatorProfile, etc.
        ├── pages/dashboard/        # Supporter: Home, Explore, Notifications, Settings
        ├── pages/creatorDashboard/ # Creator: Posts, Analytics, Supporters, Settings
        └── Store/                  # AuthStore, CreatorStore, SupporterStore (Zustand)
```

---

## 🗄️ Data Models

| Model | Description |
|---|---|
| **User** | Name, email, password/Google, roles (`isSupporter`, `isCreator`), embedded profiles |
| **CreatorProfile** | Display name, bio, category, avatar, social links |
| **SupporterProfile** | Total funded, creators funded, projects supported |
| **CreatorStats** | Supporters count, total earnings, total posts |
| **Post** | Creator reference, image, caption, likes |
| **Donation** | Supporter, creator, amounts (paise), status, Razorpay IDs |
| **CreatorRazorpayAccount** | UPI ID and bank details for payouts |

---

## 🔌 API Reference

| Prefix | Endpoints |
|---|---|
| `/api/auth` | `POST` signup, login, logout, google, verifyemail, forgotpassword, resetpassword, becomecreator · `GET` check · `PUT` updatepassword |
| `/api/supporter` | Supporter profile & related |
| `/api/creator` | Creator profile, public profile by ID, Razorpay setup |
| `/api/posts` | Create post, get creator posts, like/unlike |
| `/api/payments` | Create donation order, verify payment |

---

## 🔒 Security

- **Helmet** — Secure HTTP headers
- **DOMPurify** — XSS input sanitization
- **express-rate-limit** — Rate limiting on sensitive routes
- **CORS** — Restricted to client origin
- **JWT + secure cookies** — Session management
- **bcryptjs** — Password hashing
- **Razorpay signature verification** — Payment integrity
- **dotenv** — Secrets never committed to source

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance
- Accounts for: Razorpay, Cloudinary, Firebase, SMTP provider

### Environment Variables

Create a `.env` file in `/backend`:

```env
MONGODB_URI=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_URL=http://localhost:5173
# Firebase Admin SDK config
# SMTP config for Nodemailer
```

### Installation & Running

```bash
# Clone the repo
git clone https://github.com/your-username/devfund.git
cd devfund

# Backend
cd backend
npm install
npm run dev          # Runs on http://localhost:3000

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev          # Runs on http://localhost:5173
```

---

## 👥 User Flows

```
Signup → Verify Email → Role: Supporter (default)
                                │
              ┌─────────────────┴──────────────────┐
              ▼                                     ▼
        As Supporter                          Become Creator
    Explore → View Profile               Fill Creator Form
    → Donate via Razorpay           Create Posts → View Analytics
                                    Set Payout → Receive Donations
```

---

<div align="center">

Built with ❤️ for the developer community

</div>
