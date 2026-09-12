## URL Shortener Application

A simple URL shortening service built with Node.js, Express, and Mongoose. Converts long URLs to short codes and handles redirection.

---

## 📦 Installation

1. **Prerequisites**
   - [Node.js](https://nodejs.org/) (v20+)
   - [MongoDB](https://www.mongodb.com/) (running locally or via Docker)

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Variables**
Create a `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/url-shortener
PORT=3000
```

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev  # Watches TS files and restarts on changes
```

### Production Build
```bash
npm run build  # Compiles TypeScript to dist/
npm start      # Starts the server using dist/index.js
```

### Docker (if using docker-compose.yml)
```bash
docker-compose up -d
```

---

## 📦 Project Structure

```
url-shortener/
├── src/
│   ├── app.ts         # Express application setup
│   ├── models/        # Mongoose schemas
│   ├── utils/         # Utility functions
│   ├── middleware/    # Request handlers
│   └── schemas/       # Validation schemas
├── dist/              # Compiled JavaScript (auto-generated)
├── .env               # Environment variables
├── tsconfig.json      # TypeScript compiler options
└── package.json       # Project metadata
```

---

## 📡 API Endpoints

### 1. Create Short URL
**POST** `/shorten`
**Request Body**:
```json
{
  "url": "https://example.com"
}
```
**Response**:
```json
{
  "_id": "654321...",
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "createdAt": "2023-09-12T12:34:56.789Z"
}
```

### 2. Redirect by Short Code
**GET** `/shorten/:code`
**Example**: `http://localhost:3000/abc123`
**Response**: 301 redirect to original URL

### 3. Update Short URL
**PUT** `/shorten/:code`
**Request Body**:
```json
{
  "url": "https://new-example.com"
}
```
**Response**:
```json
{
  "_id": "654321...",
  "originalUrl": "https://new-example.com",
  "shortCode": "abc123",
  "updatedAt": "2023-09-12T12:34:56.789Z"
}
```

### 4. Delete Short URL
**DELETE** `/shorten/:code`
**Response**: 204 No Content

### 5. Health Check
**GET** `/health`
**Response**:
```json
{
  "ok": true
}
```

---

## 🧪 Testing
```bash
npm test              # Run all tests
npm run test:coverage # View coverage report
```

---

## 🔧 Refactoring Suggestions

1. **Modularize Code**
   - Separate routes, controllers, and models into distinct files
   - Use middleware for common tasks (e.g., URL validation)

2. **Improve Error Handling**
   - Add global error handler for uncaught exceptions
   - Validate input using Zod schema in route handlers

3. **Enhance Security**
   - Add rate limiting
   - Use Helmet for HTTP headers
   - Sanitize user inputs

4. **Database Optimization**
   - Add indexing to shortCode field
   - Implement TTL for expired links

5. **Documentation**
   - Add JSDoc comments to all public APIs
   - Create Swagger/OpenAPI documentation

---

## 📝 Notes
- The application uses TypeScript with file extensions `.ts`
- Ensure MongoDB is running before starting the server.
- For production, consider using a reverse proxy (Nginx) and environment-specific configs.