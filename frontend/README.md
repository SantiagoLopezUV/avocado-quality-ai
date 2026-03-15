Guide to Run the Project (AI + Web)

For the avocado diagnosis system to work, two components must run at the same time: the Artificial Intelligence service (our Python API) and the web interface (React).

Follow these steps in the exact order inside Visual Studio Code.

System Requirements

Before running the project, make sure you have the following installed:

Python 3.10 or higher

Node.js 18 or higher

npm (installed automatically with Node.js)

You can verify the installations with:

python --version
node -v
npm -v

If node or npm are not recognized, install Node.js from the official website and restart Visual Studio Code.

STEP 1: Start the Artificial Intelligence (Python)

Open a terminal.

Make sure you are in the main project folder (where the venv folder is located).

Activate your virtual environment.

Start the Python API with the following command:

uvicorn app.main:app --reload

You will know it worked when you see messages similar to:

Application startup complete
Uvicorn running on http://127.0.0.1:8000

Important: Do not close this terminal. Leave it running while you use the system.

STEP 2: Start the Web Interface (React)

Now we will start the web interface, which is the page where images are uploaded.

Open a second terminal in Visual Studio Code (click the "+" button or "New Terminal").

Navigate to the frontend folder:

cd frontend

Install the project dependencies (only required the first time):

npm install

Start the web application:

npm run dev

The terminal will show a link similar to:

http://localhost:5173

Open this link in your browser to use the application and analyze the avocados.

Quick Summary

Terminal 1 (AI):

uvicorn app.main:app --reload

Terminal 2 (Frontend):

cd frontend
npm install
npm run dev

If both services are running at the same time, the system will be fully operational.