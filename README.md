# Week 5: Ethical Hacking & Exploiting Vulnerabilities

## 📌 Overview
In this week, ethical hacking techniques were applied to identify and analyze potential vulnerabilities in the developed Node.js application. The focus was on testing SQL Injection (SQLi) and Cross-Site Request Forgery (CSRF), along with evaluating the effectiveness of implemented security mechanisms.

---

## 🔍 1. Reconnaissance & Application Analysis

The application was analyzed to identify endpoints and possible attack surfaces.

### 🌐 Target Application
http://localhost:5000

---

### 📍 Identified Endpoints
- `GET /` → Home route  
- `GET /api/data` → Protected data  
- `POST /login` → Authentication endpoint  

---

### 🔑 Observed Security Features
- API Key Authentication (`x-api-key`)  
- Rate Limiting (10 requests per 15 minutes)  
- Security Headers (Helmet)  
- CORS Restrictions  

---

### 🎯 Attack Surface
The `/login` endpoint was selected as the primary target since it accepts user input:
- `username`  
- `password`  

---

## 🧪 2. SQL Injection Testing

### ⚙️ Tool Used
- SQLMap  

---

### 🧾 Command Executed
```bash
sqlmap -u "http://localhost:5000/login" \
--data='{"username":"admin","password":"1234"}' \
--headers="Content-Type: application/json, x-api-key: mysecurekey123" \
--method=POST --dbs
```

### 🧠 Analysis

The application does not use any database queries. Instead, it performs direct comparison:
```bash
if (username === "admin" && password === "1234")
```
This eliminates the possibility of SQL Injection.

### 🛡️ Additional Observations
- 403 Forbidden responses due to API key protection
- 429 Too Many Requests due to rate limiting
These mechanisms successfully blocked automated attack attempts.

### 🔁 3. CSRF Testing
⚙️ Tool Used
- Burp Suite

## 🧪 Testing Process
- Intercepted login request using Burp Proxy
- Sent the request to Repeater
- Modified and replayed the request to test unauthorized execution

## 📊 Results
- No CSRF vulnerability was identified
- Requests required a valid API key in headers
- Unauthorized or modified requests were rejected

🧠 Analysis
Since the application requires an API key for every request, it prevents unauthorized cross-site request execution. This reduces the risk of CSRF attacks.

.

### 🔒 4. Security Evaluation
The application demonstrates strong security practices:

✅ Implemented Protections
- API Key Authentication
- Rate Limiting
- Secure HTTP Headers (Helmet)
- CORS Protection

### Summary
In Week 5 (**[Week 5 Report](Week5_Internship.pdf)**), the ethical hacking assessment confirmed that the application is not vulnerable to SQL Injection or CSRF attacks in its current implementation. The absence of database interaction prevents SQL Injection, while API key authentication and rate limiting effectively mitigate automated attacks.
Overall, the application follows good security practices and demonstrates a secure design against the tested vulnerabilities.
