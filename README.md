📦 Frontend Auth & UI Integration
Tech Stack: Next.js, Tailwind CSS, @solana/web3.js, JWT-based Auth

Features Implemented:

🔐 Signup (/signup)

Role-based (Freelancer / Client) registration

Stores JWT token in local storage upon success

Redirects to /dashboard after signup

🔐 Login (/login)

Authenticates with backend API

Stores token and redirects to dashboard

🚪 Logout

Clears stored JWT

Redirects to login screen

🧩 Wallet Connect UI (Solana)

Basic wallet connect button using @solana/web3.js

Backend wallet signature/authentication logic: TODO

🎨 Tailwind CSS integrated for styling

🧪 All routes tested via manual browser and API requests.

## 🔧 Run the App

```bash
npm run dev
```
