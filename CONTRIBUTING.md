# 🌟 Hacktoberfest 2024 Contribution Guide for Medi-Connect 🏥

Welcome to the **Medi-Connect** repository! We are thrilled that you're interested in contributing to this project. **Medi-Connect** aims to streamline hospital appointments and OPD management. This contribution guide will walk you through setting up the project, making your contributions count for **Hacktoberfest 2024**, and improving healthcare accessibility through technology! 🌐💻

Deployed Project: [Medi-Connect](https://medi-connect-in.netlify.app/)

## 🚀 How to Contribute

We welcome all contributors! Whether you're a seasoned developer or a newbie in open source, follow these steps to contribute:

### 1. Fork the Repository

Click the **Fork** button at the top-right corner of this repository to create your own copy.

### 2. Clone Your Fork

Once you've forked the repository, clone it to your local machine:

```bash
git clone https://github.com/Luson045/medi-connect.git
```

### 3. Create a New Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
```

### 4. Set Up MongoDB and `.env`

#### Create Your MongoDB Database

- You can use a local instance of MongoDB or opt for a cloud database like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

#### Add the `.env` File

In the root of your project directory, create a `.env` file and add the following:

```bash
PASSDB="your-mongodb-connection-password"
JWT="your-jwt-secret"
```

Replace `"your-mongodb-connection-password"` with your MongoDB connection password, and `"your-jwt-secret"` with a secret key for JWT authentication.

Example:

```bash
PASSDB="mySecurePassword123"
JWT="superSecretJWTKey"
```

### 5. Install Dependencies

To install the required dependencies, run:

```bash
npm install
```

### 6. Run the Development Server

Now that everything is set up, start the development server:

#### Start the Backend

```bash
npm run index
```

This will start the Node.js backend on `http://localhost:5000` to handle APIs for appointments, user management, and hospital data.

#### Start the Frontend

```bash
npm start
```

This will start the React frontend on `http://localhost:3000`.

### 7. Make Your Changes

Now that the project is running, you can start coding. Whether you're fixing bugs, adding features, or improving documentation, ensure your code is clean and well-commented.

### 8. Test Your Changes

Before pushing your changes, thoroughly test them to ensure everything works as expected.

### 9. Commit and Push

When you're ready to share your changes, commit and push your code to your fork:

```bash
git add .
git commit -m "Add detailed description of your changes"
git push origin your-branch-name
```

### 10. Create a Pull Request (PR)

Head to your forked repository on GitHub, and click the "New Pull Request" button. Ensure you provide a detailed description of what you've done in the PR description.

## 🌟 What Can You Contribute?

There are several ways you can help improve **Medi-Connect**:

- **🛠️ Bug Fixes**: Found a bug? We’d love your help fixing it.
- **📦 New Features**: Have a cool idea to make the platform better? Add it!
- **📜 Documentation**: If you think our docs can be improved, feel free to enhance them.
- **🧪 Testing**: Writing tests and ensuring code quality is crucial.
- **💡 Ideas & Discussions**: You can open an issue to discuss new features or improvements.

## 📜 Contribution Guidelines

To maintain quality and consistency, please adhere to the following guidelines:

1. **Code Style**: Follow the coding style used throughout the project. Clean, readable code with comments is always appreciated.
2. **Commits**: Write meaningful commit messages.
3. **Pull Requests**: Make sure PRs are focused, well-explained, and reference any issues they address.
4. **Testing**: Ensure that your changes are well-tested locally and don’t break existing functionality.
5. **Environment Setup**: Make sure your `.env` file and MongoDB connection are properly configured.

## 🛠️ Running the Project Locally

1. **Start the Backend Server**:

   ```bash
   npm run index
   ```

2. **Start the React Frontend**:

   ```bash
   npm start
   ```

## 🎉 Hacktoberfest 2024 Participation

We are proud participants of **Hacktoberfest 2024**! Contribute between **October 1st** and **October 31st** and get the chance to earn exclusive Hacktoberfest swag 🏅. Here's how to get started:

- [Register for Hacktoberfest](https://hacktoberfest.com) to get started.
- Open at least 4 quality PRs during October and help us improve **Medi-Connect**!
  
Make sure your PRs are:

- **Focused**: Try to keep them small and meaningful.
- **High-Quality**: Test your changes and follow best practices.

## 🎯 Key Project Links

- **Deployed Project**: [Medi-Connect Platform](https://medi-connect-in.netlify.app/)
- **Repository**: [Medi-Connect on GitHub](https://github.com/Luson045/medi-connect)
- **README**: [Click Here](README.md)

---

Happy Coding 💻 and we look forward to your contributions during **Hacktoberfest 2024**! 🎃
