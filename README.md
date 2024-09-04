# Movie World

**Movie World** is a movie rating website built using **Next.js** and **Node.js**. This platform allows users to explore popular movies and series, view detailed information, and eventually review them (work in progress).

## Installation Process

### Server

1. **Install MongoDB**: Ensure you have MongoDB Server (community edition) installed and running on your machine.
2. **Navigate to the Server Directory**:
    ```bash
    cd server
    npm install
    ```
3. **Environment Variables**:
    - Copy `.env.example` to `.env` and configure it with your environment details:
      ```env
      MONGODB_URL="your_mongodb_connection_string"
      PORT="your_server_port"
      SECRET_KEY="your_jsonwebtoken_secret_key"
      TMDB_BASE_URL="https://api.themoviedb.org/3"
      TMDB_API_KEY="your_tmdb_api_key"
      ```
4. **Run the Server**:
    ```bash
    npm run start
    ```
    or for development:
    ```bash
    npm run dev
    ```

### Client

1. **Navigate to the Client Directory**:
    ```bash
    cd client
    npm install
    ```
2. **Run the Client**:
    ```bash
    npm run dev
    ```

## Features

- **Popular Movies**
- **Popular Series**
- **Movie/Series Details**
- **Auth and Review** *(Work in Progress)*

## Tech Stack

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Next.js](https://nextjs.org/)
- [Node.js](https://nodejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Flowbite React](https://flowbite-react.com/)

## Author

**Md. Yamin**  
[LinkedIn](https://linkedin.com/in/mdyamin007)
