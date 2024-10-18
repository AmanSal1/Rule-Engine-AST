# Rule Engine AST

A simple 3-tier Rule Engine application designed to determine user eligibility based on various attributes, including age, department, income, and spending. This system utilizes an Abstract Syntax Tree (AST) to represent conditional rules, enabling dynamic creation, combination, and modification of these rules.

## Installation

Follow these steps to set up the application locally:

### Backend Setup

1. **Change Directory to Server:**

   ```bash
   cd server
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Create Environment Configuration:**

   Create a `.env` file in the server directory using the sample provided below:

   ```
   MONGODB_URL="your_database_url"
   ```

4. **Start the Backend Server:**

   ```bash
   node index.js
   ```

### Frontend Setup

1. **Change Directory to Client:**

   ```bash
   cd client
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Frontend:**

   ```bash
   npm run dev
   ```

## Usage

Once both the backend and frontend servers are running, you can access the application in your browser at `http://localhost:5173`.

## Preview

https://github.com/user-attachments/assets/f3d84650-0b7a-4fb6-83f0-fdcd8ad4a7b1



