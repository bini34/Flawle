<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Flawle+E-Commerce+%26+ERP" alt="Project Banner">
  <h1>Flawle E-Commerce & ERP Platform</h1>
  <p><strong>Inspired by the Flawle Mobile App UX/UI Case Study</strong></p>
  <p>A modern, scalable full-stack application for e-commerce storefronts and enterprise resource planning (ERP). Drawing from the clean, intuitive design principles of the <a href="https://www.behance.net/gallery/186495309/Flawle-Mobile-App-UXUI-Case-Study-Product-Design">Flawle Mobile App</a> by Anton Furs, this platform delivers seamless mobile and web experiences for shoppers, sellers, and business managers. Payments powered by <a href="https://chapa.co/">Chapa</a> for secure, local Ethiopian transactions.</p>
  <p><em>Key Inspirations: Minimalist aesthetics, fluid navigation, effortless checkout flows, and personalized product discovery.</em></p>
</div>

### 🚀 Overview
Flawle E-Commerce & ERP is a comprehensive platform that combines a customer-facing e-commerce store with backend ERP tools for inventory, order management, and analytics. The design ethos is rooted in the Flawle case study's emphasis on mobile-first UX, featuring:
- **E-Commerce Features**: Product browsing, search, wishlist, cart, and secure checkout with Chapa integration.
- **ERP Features**: Dashboard for stock tracking, sales reporting, supplier management, and user role-based access.

This project leverages a microservices-inspired architecture to ensure modularity and scalability. Chapa handles payments via REST APIs, supporting ETB currency and local methods like telebirr, CBEBirr, eBirr, and M-Pesa.

### 🛠 Tech Stack
| Component | Technology | Purpose |
|-----------|------------|---------|
| **Mobile App** | Flutter (Dart) | Cross-platform (iOS/Android) frontend with responsive, native-like performance. |
| **Web Frontend** | Next.js (React) | Server-side rendered web app for desktop and mobile browsers, with SEO optimization. |
| **Backend** | Django (Python) | RESTful API for data handling, authentication, and business logic; integrated with PostgreSQL and Chapa. |
| **Database** | PostgreSQL | Relational DB for products, users, orders, and ERP data. |
| **Payment Gateway** | Chapa | Secure payment processing for Ethiopian markets (telebirr, CBEBirr, etc.); integrated via official/unoffical SDKs. |
| **Other Tools** | Docker, Redis (caching), JWT (auth) | Containerization, session management, and secure authentication. |

### ✨ Features
Inspired by Flawle's m-commerce focus on intuitive flows and visual appeal:

#### E-Commerce (Customer Side)
- **Product Catalog**: Grid/list views with filters (price, category, ratings), high-res images, and quick-add to cart.
- **Search & Discovery**: AI-powered search with autocomplete and personalized recommendations.
- **Shopping Cart & Checkout**: Persistent cart, one-tap checkout with Chapa integration (redirect to hosted checkout or native UI), multiple local payment options.
- **User Accounts**: Profile management, order history, wishlist, and review system.
- **Notifications**: Push notifications for order updates, deals, and abandoned carts.

#### ERP (Admin/Business Side)
- **Inventory Management**: Real-time stock tracking, low-stock alerts, and multi-warehouse support.
- **Order Fulfillment**: Automated workflows for processing, shipping, and returns; payment verification via Chapa webhooks.
- **Analytics Dashboard**: Sales reports, customer insights, and performance metrics with charts.
- **Supplier & CRM**: Vendor portals, customer relationship tools, and role-based access (admin, manager, staff).
- **Integrations**: API hooks for third-party logistics (e.g., Shippo) and accounting (e.g., QuickBooks); Chapa for payments.

#### Design Highlights (Flawle-Inspired)
- **Visual Style**: Clean sans-serif typography, soft gradients (blues/greens for trust and freshness), ample whitespace, and micro-animations for interactions.
- **User Flows**: Simplified onboarding, gesture-based navigation (swipe for cart), and accessibility-focused (WCAG compliant).
- **Responsive Design**: Adaptive layouts ensuring consistency across mobile, tablet, and desktop.

#### Chapa Payment Integration
- **Backend (Django)**: Initialize payments, verify transactions, and handle webhooks using `django-chapa` package.
- **Mobile (Flutter)**: Native checkout with `chapa_flutter` or `chapasdk` packages for in-app payments.
- **Web (Next.js)**: API routes for payment creation and verification, with redirect to Chapa's hosted checkout.
- Supports test/live modes; requires Chapa account for API keys (public/secret).

### 📱 Screenshots

| Mobile Home Screen (Flutter) | Web Dashboard (Next.js) | Checkout Flow with Chapa |
|------------------------------|--------------------------|-------------------------|
| ![Mobile Home](https://via.placeholder.com/300x600?text=Flawle+Home) | ![Dashboard](https://via.placeholder.com/800x400?text=ERP+Dashboard) | ![Checkout](https://via.placeholder.com/300x600?text=Chapa+Checkout) |

### 🏗 Getting Started

#### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Flutter SDK (v3.0+)
- PostgreSQL (v13+)
- Docker (optional, for containerized setup)
- Chapa Account: Sign up at [chapa.co](https://chapa.co) for test/live API keys (public and secret).

#### Installation
1. **Clone the Repo**:
   ```
   git clone https://github.com/bini34/flawle.git
   cd flawle
   ```

2. **Backend Setup (Django)**:
   ```
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
   - Add `django-chapa` to `INSTALLED_APPS` in `settings.py`.
   - Configure Chapa in `settings.py`:
     ```
     CHAPA_PUBLIC_KEY = 'your_chapa_public_key'
     CHAPA_SECRET_KEY = 'your_chapa_secret_key'
     CHAPA_ENV = 'test'  # or 'live'
     ```
   - Update `.env` with DB credentials and Chapa keys.
   ```
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```
   - Add webhook endpoint for Chapa (e.g., `/api/payment/webhook/`) to verify payments.

3. **Web Frontend Setup (Next.js)**:
   ```
   cd ../frontend/web
   npm install
   npm install axios uuid uuid-validate  # For Chapa API calls
   npm run dev
   ```
   - Env vars in `.env.local`: `NEXT_PUBLIC_CHAPA_PUBLIC_KEY=your_key`, `CHAPA_SECRET_KEY=your_secret`.
   - Create API route `/api/create-payment.js` for initializing Chapa payments (see [guide](https://medium.com/@aslandjc7/integrating-chapa-payment-gateway-into-a-next-js-project-8767c278d85f)).

4. **Mobile App Setup (Flutter)**:
   ```
   cd ../mobile
   flutter pub get
   flutter pub add chapa_flutter  # Or chapasdk for official SDK
   flutter run
   ```
   - Configure Chapa in `lib/config/payment.dart`:
     ```dart
     Chapa.getInstance.startPayment(
       publicKey: 'your_chapa_public_key',
       amount: '100',
       currency: 'ETB',
       // ... other params
     );
     ```
   - See [official Flutter SDK](https://pub.dev/packages/chapasdk) for full setup.

5. **Docker Setup (Optional)**:
   ```
   docker-compose up --build
   ```

#### API Endpoints
- Base URL: `http://localhost:8000/api/v1/`
- Payment: `POST /api/payment/initialize/` (Chapa init), `POST /api/payment/verify/` (verify tx_ref).
- Docs: Available at `/api/docs/` (Swagger integration).

### 🔄 Usage
- **Customer**: Register/login via app/web, browse products, add to cart, checkout with Chapa (redirects to secure payment page).
- **Admin**: Access `/admin` dashboard for ERP tools; view verified payments.
- Test with sample data: Run `python manage.py loaddata sample_data.json` in backend. Use Chapa test keys and mobile numbers from [docs](https://developer.chapa.co/testing/mobile-numbers).

### 🤝 Contributing
1. Fork the repo and create a feature branch (`git checkout -b feature/amazing-feature`).
2. Commit changes (`git commit -m 'Add some amazing feature'`).
3. Push to branch (`git push origin feature/amazing-feature`).
4. Open a Pull Request.

We welcome contributions for new features, bug fixes, or UI enhancements aligned with Flawle-inspired designs! For Chapa-related issues, reference [official docs](https://developer.chapa.co/).

### 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments
- Inspired by [Flawle Mobile App UX/UI Case Study](https://www.behance.net/gallery/186495309/Flawle-Mobile-App-UXUI-Case-Study-Product-Design) by Anton Furs.
- Chapa Integration: Thanks to [Chapa-Et](https://github.com/Chapa-Et) for SDKs and [community guides](https://medium.com/@eyuelhaile29/how-to-integrate-chapa-payment-gateway-to-your-reactjs-nextjs-app-81cfd6ac54a1).
- Thanks to the open-source communities of Flutter, Next.js, and Django.

---

*Built with ❤️ for seamless e-commerce and ERP experiences. Questions? Open an issue!*

<div align="center">
  <img src="https://via.placeholder.com/800x100?text=Star+This+Repo+If+You+Like+It!" alt="Footer">
</div>
