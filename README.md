# Shofy E-commerce Platform

A modern e-commerce platform built with Next.js frontend and Express.js backend, now integrated with MagicHour AI for enhanced product marketing capabilities.

## Features

- **E-commerce Platform**: Complete online store with product management, cart, checkout, and order processing
- **MagicHour AI Integration**: AI-powered product image generation and marketing copy creation
- **Admin Dashboard**: Comprehensive admin panel for store management
- **User Authentication**: Secure user registration and login system
- **Payment Integration**: Stripe payment processing
- **Cloud Storage**: Cloudinary integration for image management

## MagicHour AI Integration

This project now includes MagicHour AI integration for:

### 🎨 AI Image Generation
- Generate product images from text descriptions
- Multiple style options (product photography, lifestyle, minimalist, luxury, modern)
- Customizable number of images (1-8)
- High-quality output optimized for e-commerce

### ✍️ Marketing Copy Generation
- Create compelling product descriptions
- Generate marketing headlines and benefits
- Customizable based on product category and features
- Professional copy optimized for conversions

### 📊 Account Management
- View API usage and credits
- Monitor generation statistics
- Account status and plan information

## Quick Start

### Prerequisites
- Node.js (>=16)
- MongoDB
- MagicHour AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd doan_mkt
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   
   # Install admin dependencies
   cd ../Admin/admin-web
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` files in the server directory:
   ```env
   PORT=9999
   MONGO_URI=mongodb://localhost:27017/test
   MAGICHOUR_API_KEY=mhk_live_UXjQIBrGAIByfM8HEhS80FLkdb4aVhFgfK1mx0t7IaiA45hVHxWZ7q38U7G90mRECPHrmFjVAJJjLgKX
   # ... other environment variables
   ```

4. **Start the application**
   ```bash
   # Start server (from server directory)
   npm run start-dev
   
   # Start client (from client directory)
   npm run dev
   
   # Start admin (from Admin/admin-web directory)
   npm run dev
   ```
### Example Usage

```javascript

## Project Structure

```
doan_mkt/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── MagicHour/  # MagicHour AI components
│   │   ├── lib/
│   │   │   └── magichour.js # MagicHour service
│   │   └── pages/
│   │       └── magichour.jsx # MagicHour page
├── server/                 # Express.js backend
│   ├── services/
│   │   └── magichour.service.js # MagicHour service
│   ├── controllers/
│   │   └── magichour.controller.js # MagicHour controller
│   ├── routes/
│   │   └── magichour.routes.js # MagicHour routes
│   └── .env               # Environment variables
└── Admin/                 # Admin dashboard
    └── admin-web/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.