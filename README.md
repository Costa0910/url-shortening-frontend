# URLify - URL Shortening Service

A modern URL shortening service built with a Next.js frontend and a separate backend API. Create short, memorable links and track their performance with detailed analytics.

## Features

- 🔗 Create short URLs with optional expiration dates
- 📊 Detailed analytics for each shortened URL including:
  - Total visits and unique visitors
  - Browser and device statistics
  - Geographic location data
  - Referrer tracking
- 👤 User authentication and management
- 🌓 Light/Dark mode support
- 📱 Responsive design for all devices

## Tech Stack

### Frontend
- [Next.js 15](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Recharts](https://recharts.org/) - Data visualization
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

### Backend
The backend API is maintained in a separate repository and built with:
- .NET 8
- Entity Framework Core

The backend repository can be found [here](https://github.com/Costa0910/URLShortening).

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Costa0910/url-shortening-frontend
```

## Prerequisites

- Node.js 16.x or higher
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env.local` file and add your environment variables.

## Usage

1. Run the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.