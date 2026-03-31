# Pragmattic

Welcome to **Pragmattic**, a full-stack mobile application ecosystem. This repository contains both the mobile frontend client and the backend API, designed to provide a seamless, scalable, and robust user experience.

## 📑 Table of Contents
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation](#️-installation)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features
* **Cross-Platform Mobile App:** Built to run on modern mobile operating systems.
* **Robust Backend API:** RESTful or GraphQL endpoints powered by Node.js.
* **Modern Data Management:** Utilizes Prisma ORM for type-safe database interactions.
* **Organized Architecture:** Clean separation of concerns with distinct services, controllers, and routing mechanisms.
* **Centralized State Management:** Dedicated store configuration for the mobile client.

## 💻 Technologies Used
### Backend (`/backend-api`)
* **Node.js** - Server environment
* **Prisma** - Next-generation ORM for Node.js and TypeScript
* **Express / Fastify** - (Assumed routing framework based on directory structure)

### Mobile App (`/mobile-app`)
* **React Native / Expo** - (Assumed mobile framework based on `App.js` and `app.json`)
* **React Navigation** - For handling routing and screens

## 📁 Project Structure

The repository is organized into two main directories:

\`\`\`bash
pragmattic/
├── backend-api/          # Node.js backend environment
│   ├── prisma/           # Database schemas and migrations
│   └── src/              # API source code (controllers, routes, services, etc.)
└── mobile-app/           # Mobile frontend application
    ├── assets/           # Images, fonts, and static files
    └── src/              # Mobile source code (components, screens, navigation, store, etc.)
\`\`\`

## 🛠️ Installation

### Prerequisites
* Node.js (v16 or higher recommended)
* npm or yarn
* Mobile development environment (React Native CLI or Expo CLI)
* Database (e.g., PostgreSQL, MySQL) compatible with Prisma

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/mtepenner/pragmattic.git
cd pragmattic
\`\`\`

### 2. Set up the Backend
\`\`\`bash
cd backend-api
npm install
# Rename .env.example to .env and configure your database variables
npx prisma generate
npx prisma db push # Or migrate dev
npm run dev
\`\`\`

### 3. Set up the Mobile App
Open a new terminal window:
\`\`\`bash
cd mobile-app
npm install
npm start
\`\`\`

## 💡 Usage
Once both the backend API and the mobile application are running locally, use your emulator (iOS/Android) or a physical device to launch the application. Ensure the mobile app is pointing to the correct local IP address of your running backend server (e.g., updating `.env` files with your local network IP).

## 🤝 Contributing
Contributions are welcome! If you would like to contribute to Pragmattic, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Copyright (c) 2026 Matthew Timothy Erwin Penner.
