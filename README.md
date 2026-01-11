# Nexus - E-Commerce Platform

Nexus is your one-stop solution for a modern e-commerce experience. This project consists of a TypeScript-based Express backend and a React/Vite frontend.

## Project Structure
- `backend/`: Express.js server with MongoDB.
- `frontend/`: React application built with Vite and Tailwind CSS.

## Local Development

### Prerequisites
- Node.js (Latest LTS recommended)
- `pnpm` (or `npm`/`yarn`)
- MongoDB (Running locally or a cloud instance)

### Backend Setup
1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```
2. **Environment Variables**:
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Set the following variables:
   - `MONGODB_URI`: Connect to your MongoDB, you can create on [mongodb.com](https://mongodb.com) or on your local machine.
   - `JWT_SECRET`: Secure your user tokens.
   - `CORS_ORIGIN`: Allow specific origins for cross-origin requests.
3. **Install Dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
4. **Run Database Seeder** (Optional):
   ```bash
   pnpm seed
   ```
5. **Start Development Server**:
   ```bash
   pnpm dev
   ```

### Frontend Setup
1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```
2. **Environment Variables**:
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Set `VITE_API_URL` to point to your backend (e.g., `http://localhost:5001`).
3. **Install Dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
4. **Start Development Server**:
   ```bash
   pnpm dev
   ```