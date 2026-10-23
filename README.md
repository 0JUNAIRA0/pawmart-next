# 🐾 PawMart — Pet Adoption & Supplies (Next.js)

PawMart is a community marketplace where people can **adopt pets for free** and **buy or sell pet food, accessories and care products** in their city. It is built with the **Next.js App Router** and **Firebase Authentication**, with public browsing pages and protected pages for adding and managing products.

**Live demo:** https://your-app.vercel.app <!-- replace after deploying -->

---

## ✨ Key Features

- **Landing page with 7 sections**: sticky responsive navbar, hero with CTA, categories, featured items, “Why adopt”, testimonials, CTA banner, and footer
- **Firebase Authentication**: email/password register and login, plus Google sign-in
- **Auth state with the Context API** (`AuthProvider` / `useAuth`)
- **User dropdown in the navbar** after login, with user info, Add Product, Manage Products and Logout
- **Items page** with live search and filters for **category, price range and location**, plus sorting
- **Dynamic details page** (`/items/[id]`) with full description, specifications, price/date/location, related items and a back button
- **Protected routes**: `/items/add` and `/items/manage` redirect logged-out users to `/login`
- **Add Product form** with inline validation, a loading state, image preview and a toast on success
- **Manage Products** as a table on desktop and cards on mobile, with View and Delete (with a confirmation dialog)
- **Light/dark theme** toggle that remembers your choice
- Responsive layout for mobile, tablet and desktop, with hover/focus states and small animations

## 🛠 Tech Stack

| Area | Tools |
|---|---|
| Framework | Next.js (App Router), React |
| Auth | Firebase Authentication |
| Styling | Tailwind CSS v4, daisyUI v5 |
| UI | react-icons, react-hot-toast |
| Data | Static seed data + `localStorage` for user-added and deleted items |

## 🚀 Setup & Installation

```bash
# 1. Clone
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
npm install

# 3. Add Firebase config
cp .env.example .env.local
# then fill in the values from Firebase Console → Project settings → Your apps

# 4. Run the dev server
npm run dev
```

Open http://localhost:3000.

**Firebase console setup**

1. Go to **Authentication → Sign-in method** and enable **Email/Password** and **Google**.
2. Go to **Authentication → Settings → Authorized domains** and add your Vercel domain (e.g. `your-app.vercel.app`).

**Deploying to Vercel:** import the repo, add the same `NEXT_PUBLIC_FIREBASE_*` variables under *Settings → Environment Variables*, then deploy.

## 🗺 Route Summary

| Route | Page | Access |
|---|---|---|
| `/` | Landing page (7 sections) | Public |
| `/items` | All items with search & filters | Public |
| `/items/[id]` | Item details | Public |
| `/about` | About PawMart | Public |
| `/contact` | Contact page | Public |
| `/login` | Login (email/password + Google) | Public |
| `/register` | Register (email/password + Google) | Public |
| `/items/add` | Add a product | 🔒 Protected |
| `/items/manage` | Manage products (View / Delete) | 🔒 Protected |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js            # Navbar, Footer, AuthProvider, Toaster
│   ├── page.js              # Landing page
│   ├── about/  contact/  login/  register/
│   └── items/
│       ├── page.js          # list + ItemsBrowser (search/filters)
│       ├── [id]/page.js     # details
│       ├── add/page.js      # protected
│       └── manage/page.js   # protected
├── components/              # Navbar, Footer, ItemCard, AuthForm, PrivateRoute…
├── context/AuthContext.jsx  # Firebase auth state (Context API)
├── data/items.js            # seed items, categories, locations
└── lib/                     # firebase.js, store.js (localStorage)
```

> Note: products you add or delete are saved in your browser’s `localStorage`. Use **Reset demo data** on the Manage page to restore the original items.
