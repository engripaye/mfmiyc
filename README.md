# 🚀 MFM IYC Member Form Backend

> A production-ready **Java Spring Boot REST API** for collecting member information from the MFM International Youth Church (IYC) digital registration form and automatically storing submissions in **Google Sheets** using the Google Sheets API.

Designed with clean architecture, validation, exception handling, environment-based configuration, and cloud deployment readiness.

---

## 📖 Overview

The **MFM IYC Member Form Backend** powers a digital membership registration platform for church members.

Instead of manually recording member information, this backend receives form submissions through a REST API, validates the data, and securely appends each submission to a Google Spreadsheet.

This provides a lightweight, serverless-friendly data storage solution that is easy for church administrators to manage without requiring a traditional database.

---

## ✨ Features

* ✅ RESTful API built with Spring Boot 4.1
* ✅ Java 21
* ✅ Google Sheets API integration
* ✅ Automatic member data storage
* ✅ Request validation using Jakarta Validation
* ✅ Centralized exception handling
* ✅ Environment variable configuration
* ✅ CORS configuration
* ✅ Secure Google Service Account authentication
* ✅ Spreadsheet formula injection protection
* ✅ Health check endpoint
* ✅ Cloud deployment ready
* ✅ Clean layered architecture
* ✅ Unit testing support

---

# 🏗 Architecture

```
Client (React / Web Form)
            │
            ▼
Spring Boot REST API
            │
            ▼
Validation Layer
            │
            ▼
Service Layer
            │
            ▼
Google Sheets API
            │
            ▼
Google Spreadsheet
```

---

# 📂 Project Structure

```text
mfmiyc-member-form-backend/
│
├── src
│   ├── main
│   │   ├── java
│   │   │
│   │   ├── config
│   │   ├── controller
│   │   ├── dto
│   │   ├── exception
│   │   ├── service
│   │   └── application
│   │
│   └── resources
│       └── application.yml
│
├── test
│
├── .env.example
├── .gitignore
├── pom.xml
└── README.md
```

---

# 🛠 Tech Stack

| Technology         | Purpose               |
| ------------------ | --------------------- |
| Java 21            | Programming language  |
| Spring Boot 3.5    | Backend framework     |
| Spring Web         | REST APIs             |
| Jakarta Validation | Request validation    |
| Google Sheets API  | Data storage          |
| Google OAuth       | Authentication        |
| Maven              | Dependency management |
| JUnit 5            | Testing               |

---

# 📋 API Endpoints

## Submit Member Information

```http
POST /api/members
```

### Request

```json
{
  "name": "John Doe",
  "number": "0701355676",
  "houseAddress": "Lagos, Nigeria",
  "prayerRequest": "Pray for my family",
  "birthdayDate": "2000-05-20"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Your information has been submitted successfully.",
}
```

---

## Health Check

```http
GET /api/members/health
```

Response

```json
{
  "success": true,
  "message": "MFM IYC member form backend is running."
}
```

---

# 📑 Data Stored in Google Sheets

Every submission is automatically written into Google Sheets in the following order:

| Column | Field          |
| ------ | -------------- |
| A      | Name           |
| B      | Phone Number   |
| C      | House Address  |
| D      | Prayer Request |
| E      | Birthday Date  |
| F      | Submitted At   |

---

# 🔐 Validation Rules

The backend validates all incoming requests before processing.

| Field          | Validation                  |
| -------------- | --------------------------- |
| Name           | Required (max 120 characters) |
| Contact        | Valid phone number          |
| House Address  | Required                    |
| Prayer Request | Optional (max 2000 chars)   |
| Birthday Date  | Cannot be a future date     |

---

# 🛡 Security

The project includes several security best practices:

* Input validation
* Spreadsheet formula injection protection
* Environment variable configuration
* Google Service Account authentication
* Centralized exception handling
* Sensitive credentials excluded via `.gitignore`

---

# ⚙ Environment Variables

Create a `.env` file from the provided example.

```env
PORT=8080

FRONTEND_URL=http://localhost:5173

GOOGLE_SPREADSHEET_ID=

GOOGLE_SHEET_NAME=Sheet1

GOOGLE_SERVICE_ACCOUNT_FILE=
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/yourusername/mfmiyc-member-form-backend.git

cd mfmiyc-member-form-backend
```

---

## Install dependencies

```bash
mvn clean install
```

---

## Configure Google Service Account

1. Create a Google Cloud Project.
2. Enable the Google Sheets API.
3. Create a Service Account.
4. Download the JSON credentials.
5. Share your spreadsheet with the service account email.
6. Set the environment variables.

---

## Run the application

```bash
mvn spring-boot:run
```

Application starts at

```
http://localhost:8080
```

---

# 🧪 Testing

Run the tests with:

```bash
mvn test
```

---

# 📬 Example cURL Request

```bash
curl -X POST \
http://localhost:8080/api/v1/member-forms \
-H "Content-Type: application/json" \
-d '{
"name":"John Doe",
"contact":"+2348000000000",
"houseAddress":"Lagos",
"prayerRequest":"Pray for my family",
"birthdayDate":"2000-05-20"
}'
```

---

# 💡 Design Principles

This project follows common Spring Boot best practices:

* Layered Architecture
* Constructor Dependency Injection
* Separation of Concerns
* Single Responsibility Principle
* Interface-based Service Layer
* DTO Pattern
* Exception-Driven Error Handling
* Environment-Based Configuration

---

# 📈 Future Improvements

* JWT Authentication
* Spring Security
* PostgreSQL support
* Email notifications
* SMS notifications
* Docker support
* CI/CD pipeline
* Swagger/OpenAPI documentation
* Audit logging
* Admin dashboard
* Rate limiting
* Monitoring with Spring Boot Actuator

---

# 🤝 Contributing

Contributions are welcome.

If you'd like to improve the project:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Olabowale Babatunde Ipaye**

Backend Software Engineer

* Java • Spring Boot • REST APIs
* Python • FastAPI
* PostgreSQL • MySQL
* Google Cloud APIs
* Docker • Git • CI/CD

---

## ⭐ Why This Project Matters

This project demonstrates practical backend engineering skills by integrating a Spring Boot REST API with Google Sheets as a lightweight data store. It showcases API design, input validation, secure third-party integration, clean architecture, exception handling, and deployment-ready configuration—making it a strong portfolio project for backend development roles.
