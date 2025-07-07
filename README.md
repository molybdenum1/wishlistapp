# 🎁 Wishlist App

A modern web application for creating, organizing, and sharing wishlists and gift ideas with friends and family.

## Features

- 📝 Create and manage multiple wishlists
- ➕ Add, edit, and remove wishlist items
- 📱 Access your wishlists from any device
- 🔒 Secure authentication with Firebase
- 🎨 Beautiful UI with Material UI
- ☁️ Data stored in Cloud Firestore

## Tech Stack

- **React** (with TypeScript)
- **Vite** (for fast development)
- **Firebase Auth** (user authentication)
- **Cloud Firestore** (database)
- **Material UI** (UI components)
- **ESLint** (code quality)

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/wishlist.git
   cd wishlist
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure Firebase:**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com/).
   - Enable Email/Password authentication and Firestore.
   - Copy your Firebase config to `src/config/firebase.ts`.

4. **Run the app:**
   ```sh
   npm run dev
   ```

5. **Build for production:**
   ```sh
   npm run build
   ```

## Folder Structure

```
src/
  api/             # Firestore API functions
  components/      # Reusable React components
  pages/           # Application pages (About, Contact, Wishlist, etc.)
  config/          # Firebase configuration
  data/            # TypeScript types and mock data
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

&copy; {year} Wishlist App. Made with ❤️