# EcoFlow

This project combines the power of Node.js for server-side functionality and React Native for building a cross-platform mobile application.

## Prerequisites

- **Node.js and npm (or Yarn):** Download and install the latest version of Node.js from the official website (https://nodejs.org/en). npm (Node Package Manager) comes bundled with Node.js. If you prefer, you can use Yarn as an alternative package manager (https://classic.yarnpkg.com/lang/en/).
- **Development Environment:** Choose a code editor or IDE of your preference, such as Visual Studio Code (https://visualstudio.microsoft.com/), WebStorm (https://www.jetbrains.com/webstorm/), or Sublime Text (https://www.sublimetext.com/).

## Installation

1. **Clone or Download the Repository:**
   - If using Git:
     ```bash
     git clone [https://github.com/your-username/your-repo.git](https://github.com/your-username/your-repo.git)
     ```
   - Otherwise, download the ZIP archive and extract the contents.
2. **Navigate to the Project Directory:**
   ```bash
   cd ecoflow
   ```
3. **Navigate to the client Directory:**

   ```bash
   cd client
   ```

4. **Run react native:**

   ```bash
   npm install
   npx expo start
   ```

5. **Navigate to the server Directory:**

   ```bash
   cd server
   ```

6. **Run nodejs express:**
   ```bash
   npm install
   npm start
   ```


**Sample env for client**
API="http://localhost:8000"
ENDPOINT: "",
PLATFORM: "",
PROJECTID: "",
DATABASEID: "",
USERCOLLECTIONID: "",
POSTCOLLECTIONID: "",
STORAGEID: "",

**Sample env for server**
CLIENT_URL = "http://192.168.1.7:8081/"
