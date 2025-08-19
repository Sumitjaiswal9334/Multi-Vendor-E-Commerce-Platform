# Multi-Vendor Shopping Platform

A modern, full-featured e-commerce platform built with React that supports multiple vendors, comprehensive user management, and a complete shopping experience.

![Multi-Vendor Shopping Platform](https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg)

## 🚀 Features

### For Customers
- **Product Discovery**: Browse products from multiple vendors with advanced filtering and search
- **Shopping Cart**: Add products to cart with quantity management
- **Order Management**: Track orders with detailed status updates
- **User Authentication**: Secure login and registration system
- **Product Reviews**: Read and write product reviews with ratings
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### For Vendors
- **Vendor Dashboard**: Comprehensive dashboard to manage business operations
- **Product Management**: Add, edit, and delete products with inventory tracking
- **Order Processing**: View and manage customer orders
- **Sales Analytics**: Track revenue, orders, and product performance
- **Business Profile**: Manage vendor information and business details

### For Administrators
- **Platform Management**: Oversee the entire marketplace
- **Vendor Approval**: Review and approve new vendor applications
- **Content Moderation**: Monitor and moderate products and reviews
- **Analytics Dashboard**: Platform-wide statistics and insights
- **User Management**: Manage customer and vendor accounts

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API
- **Authentication**: Custom authentication system with role-based access
- **Development**: ESLint for code quality

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/multi-vendor-shopping-platform.git
   cd multi-vendor-shopping-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🎯 Demo Accounts

The application comes with pre-configured demo accounts for testing different user roles:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| Customer | `customer@demo.com` | `password123` | Regular shopping account |
| Vendor | `vendor@demo.com` | `password123` | Business account for selling |
| Admin | `admin@demo.com` | `password123` | Platform administration |

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LoginModal.jsx   # Authentication modal
│   ├── Navbar.jsx       # Navigation component
│   ├── ProductCard.jsx  # Product display card
│   └── ReviewSection.jsx # Product reviews
├── context/             # React Context providers
│   ├── AuthContext.jsx  # Authentication state
│   └── CartContext.jsx  # Shopping cart state
├── data/                # Mock data and constants
│   └── mockData.js      # Sample products data
├── pages/               # Main application pages
│   ├── AdminDashboard.jsx    # Admin management interface
│   ├── CartPage.jsx          # Shopping cart page
│   ├── HomePage.jsx          # Product listing page
│   ├── OrdersPage.jsx        # Order history page
│   ├── ProductPage.jsx       # Product details page
│   └── VendorDashboard.jsx   # Vendor management interface
├── App.jsx              # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Features Breakdown

### Authentication System
- Role-based access control (Customer, Vendor, Admin)
- Secure login/registration with form validation
- Persistent sessions with localStorage
- Demo role switching for testing

### Shopping Experience
- Advanced product filtering by category, price, and rating
- Real-time search functionality
- Shopping cart with quantity management
- Order tracking with status updates
- Product reviews and ratings system

### Vendor Management
- Complete vendor dashboard with analytics
- Product inventory management
- Order processing and fulfillment
- Sales performance tracking

### Admin Controls
- Platform-wide statistics and monitoring
- Vendor approval and management
- Content moderation tools
- System health monitoring

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to Netlify
3. Configure redirects for SPA routing

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with default settings

## 🔮 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] AI-powered product recommendations
- [ ] Inventory management system
- [ ] Shipping integration
- [ ] Advanced search with filters
- [ ] Wishlist functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Pexels](https://pexels.com) for providing high-quality stock images
- [Lucide](https://lucide.dev) for the beautiful icon set
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Vite](https://vitejs.dev) for the fast build tool

## 📞 Support

If you have any questions or need help with the project, please:

1. Check the [Issues](https://github.com/yourusername/multi-vendor-shopping-platform/issues) page
2. Create a new issue if your question isn't already addressed
3. Reach out via email: your.email@example.com

---

⭐ **Star this repository if you found it helpful!**
