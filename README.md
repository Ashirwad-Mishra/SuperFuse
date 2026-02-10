# **🚀 SuperFuse — Modular Super App Platform**

> **Status:** Actively building • Microservices • Spring Boot • PostgreSQL • React

> **Note:** More architecture diagrams will be added over time as the system evolves.

---

## 🌟 What is SuperFuse?

**SuperFuse** is a **microservices-based super app platform** designed to scale from a learning project into a production-ready system. It is built around independent, domain-focused services that communicate via REST APIs and share a common data philosophy.

The platform currently focuses on two core domains:

1. **User Domain** → Identity, Profile, Preferences, Devices
2. **Shopping Domain** → Products, Cart, Orders, Payments, Shipment, Reviews

> **Important:** *Device logging is **not implemented yet** and is intentionally out of scope for now.*

---

## 🎯 Goals of the Project

SuperFuse is being built to:

* Demonstrate **real-world system design skills**
* Practice **microservices architecture**
* Use **Spring Boot + JPA + PostgreSQL** in a clean way
* Model **real relationships between services and data**
* Gradually evolve toward:

  * API Gateway
  * Service discovery
  * Event-driven messaging
  * AI-based recommendations

---

# 🏗️ High-Level System Architecture

```
┌─────────────────────────────────────────────┐
│                Frontend (Planned)          │
│        React + Vite + TypeScript + UI      │
└───────────────────────────┬───────────────┘
                            │
                    (Future) API Gateway
                            │
 ┌──────────────────────────┼──────────────────────────┐
 │                          │                          │
 │     Profile Service     │      Auth Service       │
 │ (User data & settings)  │ (Login, JWT, Accounts)  │
 │                          │                          │
 └───────────────┬─────────┼───────────────┬─────────┘
                 │         │               │
                 │         │               │
           PostgreSQL (per-service DB)   Shopping Services
                                          (Product, Cart, Order,
                                           Payment, Shipment, Review)
```

Each service owns **its own database schema**, avoiding tight coupling.

---

# 👤 **Profile Service (Your Current Work)**

This service manages everything about the user **except authentication credentials.**

### ✅ Entities

#### **UserProfile**

Stores personal identity:

* profile_id (PK)
* user_id (FK → Auth.User)
* first_name
* last_name
* date_of_birth
* gender
* profile_picture_url
* bio
* language
* timezone

#### **Address**

Users can have multiple addresses:

* address_id (PK)
* user_id (FK)
* address_type (home/work)
* street, city, state, country, postal_code

#### **Preferences**

User customization:

* preference_id (PK)
* user_id (FK)
* theme
* notification_enabled
* email_notifications
* sms_notifications

#### **Device (Tracking Only)**

Tracks active devices (NO LOGS YET):

* device_id (PK)
* user_id (FK)
* device_type
* device_os
* device_token
* last_login_at

> 🚫 **Device logs are NOT being implemented right now.**

---

## 🗺️ Profile Service Relationship Map (Conceptual)

```
User (Auth Service)
        |
        | has
        |
┌───────────────┐
│ UserProfile   │
└───────┬───────┘
        | has
   ┌────┴─────┐
   │ Address  │  (multiple)
   └────┬─────┘
        | has
   ┌────┴────────┐
   │ Preferences │
   └────┬────────┘
        | logs in from
   ┌────┴─────┐
   │ Device   │
   └──────────┘
```

---

# 🛒 **Shopping System Architecture**

This is a separate domain but part of SuperFuse.

### Core Entities

* **Product**

  * id
  * name
  * price
  * inventory_count

* **ProductImage**

  * id
  * product_id
  * url

* **Cart**

  * id
  * user_id

* **CartItem**

  * cart_id
  * product_id
  * price_snapshot
  * quantity

* **Order**

  * id
  * user_id
  * address_id
  * status
  * created_at

* **Payment**

  * order_id
  * transaction_id
  * payment_status

* **Shipment**

  * order_id
  * courier_info
  * tracking_number
  * delivery_timestamp

* **Review**

  * product_id
  * user_id
  * rating
  * feedback

---

## 🛍️ Shopping Flow Diagram (Conceptual)

```
User → Cart → CartItem → Order
                          |
             ┌────────────┼────────────┐
             │            │            │
          Payment      Shipment      Review
```

---

# 🧠 Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* PostgreSQL
* Lombok
* Maven

### Frontend (Planned)

* React + Vite
* TypeScript
* Tailwind CSS
* ShadCN UI

### Infrastructure (Planned)

* Docker
* AWS / Vercel / Heroku
* API Gateway
* Kafka (future)

---

# ▶️ How to Run (Profile Service)

### Prerequisites

* Java 17
* PostgreSQL
* Maven

### Run locally

```bash
git clone https://github.com/yourusername/superfuse.git
cd backend/profile-service
mvn spring-boot:run
```

Example `application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/profile_db
    username: postgres
    password: root
  jpa:
    hibernate:
      ddl-auto: update
```

---

# 🔮 What’s Coming Next

Future improvements include:

* API Gateway
* Service discovery
* Event-driven communication
* Real-time notifications
* AI-based recommendations
* Analytics dashboard
* Chatbot assistant
* Better observability

> 📌 **More architecture diagrams will be added as the project grows.**

---

# 🤝 Contributing

Feel free to:

* Suggest features
* Improve design
* Add services
* Refactor architecture
* Build frontend modules

---

# 📜 License

MIT License — open for learning and experimentation.

---

# 👨‍💻 Created By

**Ashirwad Mishra**
B.Tech CSE | DSA + System Design | Spring Boot | React
Building **SuperFuse** as a real-world distributed system 🚀
