<div align="center" width="100%">
    <img src="logo.svg" width="328" alt="" />
</div>

# 🌌 Med-Space (Appointment Booking System)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/tech-React.js-blue.svg)
![Node.js](https://img.shields.io/badge/tech-Node.js-green.svg)
![Express](https://img.shields.io/badge/tech-Express.js-green.svg)
![MongoDB](https://img.shields.io/badge/tech-MongoDB-green.svg)
![GitHub Issues](https://img.shields.io/github/issues/Luson045/medi-connect)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Luson045/medi-connect)

---

## 📖 Table of Contents

- [🚀 Introduction](#introduction)
- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [🎥 Demo](#demo)
- [🚧 Getting Started](#getting-started)
  - [📋 Prerequisites](#prerequisites)
  - [⚙️ Installation](#installation)
  - [🔧 Configuration](#configuration)
- [📊 Usage](#usage)
- [🗂️ Project Structure](#project-structure)
- [🤝 Contributing](#contributing)
- [📜 License](#license)
- [📞 Contact](#contact)

---

## 🚀 Introduction

Welcome to **Med-Space**, a next-gen web-based solution for simplifying and streamlining hospital operations. Whether it’s managing outpatient department (OPD) queues, tracking bed availability in real-time, or managing patient admissions, **Med-Space** is designed to help hospitals run more efficiently while offering a smoother experience for patients.

Developed for the **Smart India Hackathon**, our platform is built to scale and integrate city-wide, enabling hospitals to collaborate and optimize resources effectively.

---

## ✨ Features

- **📅 OPD Queue Management**: 
  - Get real-time updates on patient queues 
  - Easily schedule appointments online 
  - Receive instant notifications and alerts for updates

- **🛏️ Bed Availability Monitoring**: 
  - Track bed occupancy in real-time 
  - Quickly allocate emergency beds 
  - Use filters and sorting to find available beds

- **📝 Patient Admission Management**: 
  - Smooth, hassle-free admission processes 
  - Store and access integrated patient information & medical history 
  - Enhance coordination between doctors and nurses

- **📦 Inventory Management**: 
  - Keep an eye on medicine and consumables stock levels 
  - Receive alerts when stock runs low 
  - Generate detailed inventory reports and analytics

- **🔐 Secure Authentication**:
  - Different roles for doctors and patients 
  - Secure authentication and role-based access control powered by **JWT**

- **🏥 City-Wide Hospital Network**: 
  - Share data seamlessly between hospitals 
  - Centralized management for hospitals across the city 
  - Designed for scalability

---

## 🛠️ Tech Stack

Our stack is built for speed, reliability, and scalability, utilizing modern, widely-used technologies to ensure optimal performance.

- **Frontend**: 
  - ⚛️ [React.js](https://reactjs.org/)
  - 🔄 [Redux](https://redux.js.org/)
  - 🛤️ [React Router](https://reactrouter.com/)
  - 🌐 [Axios](https://axios-http.com/)
  - 🎨 [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) / [SASS](https://sass-lang.com/)

- **Backend**:
  - 🟢 [Node.js](https://nodejs.org/)
  - 🚀 [Express.js](https://expressjs.com/)
  - 🍃 [MongoDB](https://www.mongodb.com/)
  - 🔐 [JWT](https://jwt.io/) for secure authentication

- **Deployment**:
  - 🟣 [Render](https://www.render.com/)
  - 🌍 [Netlify](https://www.netlify.com/)

- **Other Tools**:
  - 💻 [Git](https://git-scm.com/) & [GitHub](https://github.com/)
  - 🧪 [Postman](https://www.postman.com/)
  - 📏 [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

---

## 🎥 Demo

🎬 **[Experience the live demo](https://medi-connect-in.netlify.app/)**

Explore the full capabilities of **Med-Space** through our live demo. This comprehensive platform lets you manage appointments, medical records, and communication—all at your fingertips.

---

## 🚧 Getting Started

Getting started with **Med-Space** is easy. Follow the steps below to set up the project locally and begin contributing or testing.

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- 🟢 [Node.js](https://nodejs.org/)
- 📦 [npm](https://www.npmjs.com/) or 🧶 [Yarn](https://yarnpkg.com/)
- 💻 [Git](https://git-scm.com/)
- 🍃 [MongoDB](https://www.mongodb.com/)
- 🐳 [Docker](https://docs.docker.com/engine/install/)

### ⚙️ Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Luson045/medi-connect
   cd medi-connect
   ```

2. **Install Backend Dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd client
   npm install
   ```

---

## 🔧 Configuration

Before running the project, configure your environment variables in a `.env` file. Add the following:

```env
PORT=5000
PASSDB=your_mongodb_connection_string
JWT=your_jwt_secret
```

### 🐳 Running with Docker

If you're using Docker, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Luson045/medi-connect
   cd medi-connect
   ```

2. **Run Docker Compose**

   ```bash
   docker-compose build
   docker-compose up
   ```

3. **Shut Down Containers**

   ```bash
   docker-compose down
   ```

The frontend will be available on `localhost:3000` and the backend on `localhost:5000`.

---

## 📊 Usage

Once the servers are running, navigate to `http://localhost:3000` in your web browser to start using **Med-Space**.

---

## 🤝 Contributing

We’d love your help in making **Med-Space** even better! Feel free to submit pull requests or open issues for any feature requests or bug fixes.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Contact

For questions or feedback, feel free to reach out to **Luson Basumatary**:

[![LinkedIn](https://img.icons8.com/fluency/32/000000/linkedin.png)](https://www.linkedin.com/in/luson-basumatary-79a93b244/) [![Gmail](https://img.icons8.com/fluency/32/000000/gmail.png)](mailto:yuria4489@gmail.com)

---

## ⭐️ Support

If you enjoy using **Med-Space**, please consider giving it a ⭐ on GitHub. Your support is appreciated!
