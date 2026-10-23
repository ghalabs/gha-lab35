# Academia-Synapse [Student Management System (SMS)]

A full-stack application for managing student records, built with Node.js/Express/MongoDB for the backend and React for the frontend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Application Setup](#application-setup)
- [Running Tests](#running-tests)

## Features

- **CRUD Operations**: Complete functionality to Create, Read, Update, and Delete student records.
- **Frontend/Backend Separation**: Clear separation between the React UI and the REST API.
- **Unit Tested**: Both the API (Jest/Supertest) and the UI components (Jest/RTL) are covered with unit tests.
- **Persistent Data**: Uses MongoDB to store student data permanently.

## Technologies Used

### Backend (Node.js/Express)
- **Node.js**: Runtime environment.
- **Express.js**: Web application framework for REST API.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **Jest & Supertest**: For API unit and integration testing.

### Frontend (React)
- **React**: JavaScript library for building the UI.
- **Axios**: HTTP client for API communication.
- **Jest & React Testing Library (RTL)**: For component unit testing.

## Project Structure

The project is divided into two main folders: `backend` for the API and `frontend` for the UI.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   **Node.js** (v18 or higher)
-   **npm** (Node Package Manager)
-   **MongoDB** (A running instance of MongoDB, either local or cloud-based)

### Application Setup

1.  **Install MongoDB in the workstation:**
    ```bash
    # a. From a terminal, install gnupg and curl if they are not already available:
    sudo apt-get install gnupg curl
    
    # b. To import the MongoDB public GPG key, run the following command:
    curl -fsSL https://pgp.mongodb.com/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor


    # c. Create the list file /etc/apt/sources.list.d/mongodb-org-8.0.list for your version of Ubuntu.
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

    # d. Issue the following command to reload the local package database:
    sudo apt-get update

    # e. To install the latest stable version, issue the following
    sudo apt install -y mongodb-org
    
    #c. Once installed, the mongodb user will be automatically created, and you can start your database:
    sudo systemctl start mongod
    sudo systemctl enable mongod
    sudo systemctl status mongod
    ```

2.  **Navigate to the academia-synapse directory:**
    ```bash
    cd academia-synapse
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    npm install --prefix backend
    npm install --prefix frontend
    npm install pm2
    ```

4.  **Start the backend and frontend server:**
     ```bash
    npm start

    # Application opens at http://localhost:3000
    ```

## Running Tests
```bash
npm run test-all
```

## Stopping academia-synapse
```bash
npm stop
```

Author - Soumiyajit Das Chowdhury


























