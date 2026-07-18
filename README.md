# 🎓 AI-Driven Student Performance System
An intelligent full-stack web application that predicts student academic performance and identifies at-risk students using Machine Learning, helping educators provide timely support and intervention.

    
    Github Link: https://github.com/wwwhimanshumaurya29-afk/student-performance-ai


    
LIVE LINK

frontend:  https://student-performance-ai-theta.vercel.app

backend:   https://student-performance-ai-1-me0f.onrender.com

ml-model:  https://student-performance-ai-h120.onrender.com




## 📌 Overview



This system analyzes behavioral, demographic, and academic factors — such as study time, past failures, absences, and family support — to predict a student's final grade and classify their risk level (Low/Medium/High). It moves beyond simple grade tracking by focusing on early identification of students who may need additional academic support.



## ✨ Features



- **Score Prediction** — Predicts a student's final grade (out of 20) using regression models

- **Risk Classification** — Categorizes students into Low, Medium, or High risk based on predicted performance

- **Interactive Dashboard** — Visualizes class-wide risk distribution and recent prediction trends with charts

- **Student Records** — View and manage all predicted student records stored in the database

- **AI-Powered Suggestions** *(optional module)* — Generates personalized improvement tips for at-risk students using Google Gemini

##Schreenshot##

 <img width="1920" height="1080" alt="Screenshot (220)" src="https://github.com/user-attachments/assets/2cb0cf9a-3f37-4edc-9f3d-2470c618c54c" />

<img width="1920" height="1080" alt="Screenshot (222)" src="https://github.com/user-attachments/assets/7b6f9be7-e52c-4b86-b208-4ea9f0a328f7" />

<img width="1920" height="1080" alt="Screenshot (221)" src="https://github.com/user-attachments/assets/5e21cd96-4551-4596-b8f1-6233fa32a14c" />





## 🏗️ Architecture

React (Frontend) → Node.js/Express (Backend) → Flask ML API → Trained ML Models

↓

MongoDB Atlas

The system uses a polyglot microservice architecture: a Python Flask service handles ML inference, while a Node.js/Express backend manages business logic, database operations, and orchestrates requests between the frontend and the ML service.



## 🛠️ Tech Stack



**Frontend:** React (Vite), React Router, Axios, Recharts



**Backend:** Node.js, Express.js, MongoDB (Mongoose)



**Machine Learning:** Python, Pandas, NumPy, Scikit-learn, XGBoost, Flask



**AI Integration:** Google Gemini API (for personalized suggestions)



**Deployment:** Vercel (Frontend), Render (Backend + ML API)



## 📊 Dataset



This project uses the **Student Performance Dataset** by Cortez & Silva, sourced from Kaggle, containing academic and behavioral records of secondary school students from two Portuguese schools.



Dataset link: [Kaggle - Student Performance Data Set](https://www.kaggle.com/datasets/larsen0966/student-performance-data-set)



Key features used include: study time, past class failures, school/family support, travel time, free time, going out frequency, alcohol consumption, health status, and absences. Prior grades (G1, G2) were intentionally excluded from the feature set to ensure realistic predictions for new students without historical grade data.



## 🤖 Machine Learning Approach



Two separate models were trained and evaluated:



| Task | Models Compared | Best Model |

|------|-----------------|------------|

| Score Prediction (Regression) | Linear Regression, Random Forest, XGBoost | Linear Regression |

| Risk Classification | Logistic Regression, Random Forest, XGBoost | XGBoost |



Models were evaluated using MAE and R² score (regression) and Accuracy (classification), then serialized using `joblib` for deployment.



## 🚀 Getting Started



### Prerequisites

- Node.js (v18+)

- Python (v3.10+)

- MongoDB Atlas account

- Google Gemini API key (optional, for AI suggestions)



### 1. Clone the repository

```bash

git clone https://github.com/wwwhimanshumaurya29-afk/student-performance-ai.git

cd student-performance-ai

```



### 2. ML Model Setup

```bash

cd model-ml

pip install pandas numpy scikit-learn matplotlib seaborn xgboost joblib flask flask-cors

python app.py

```

Runs on `http://localhost:5000`



### 3. Backend Setup

```bash

cd backend

npm install

```

Create a `.env` file:

PORT=5001

ML_API_URL=http://localhost:5000

MONGO_URI=mongodb+srv://Student2026:Student2026@cluster0.r5lbbt9.mongodb.net/studentperformance?retryWrites=true&w=majority&appName=Cluster0


```bash

node server.js

```

Runs on `http://localhost:5001`



### 4. Frontend Setup

```bash

cd frontend

npm install

```

Create a `.env` file:

VITE_API_URL=http://localhost:5001/api

```bash

npm run dev

```

Runs on `http://localhost:5173`



## 📁 Project Structure

student-performance-ai/

├── model-ml/

│   ├── data/

│   ├── saved_models/

│   ├── eda_and_training.ipynb

│   └── app.py

├── backend/

│   ├── models/

│   ├── routes/

│   └── server.js

├── frontend/

│   └── src/

│       ├── components/

│       ├── App.jsx

│       └── App.css

└── README.md



## 🔮 Future Enhancements



- Teacher/Admin authentication and role-based access

- Bulk student data upload via CSV

- Historical performance trend tracking per student

- Email/SMS alerts for high-risk student flags



## 👥 Team



Developed as part of a Summer Training capstone project.



## 📄 License



This project is for educational purposes as part of academic coursework.

