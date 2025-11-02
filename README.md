# Playwright Level 1 - E-commerce Testing Project

This project contains automated tests for an e-commerce website using Playwright, developed as part of the Playwright Level 1 course instructed by Truong Pham.

## Project Overview

This test automation project covers essential e-commerce functionalities including:
- Shopping cart operations
- Product catalog sorting
- Checkout process validation
- Payment processing
- Order history tracking
- Product reviews submission

## Project Structure

```
playwright-lv1/
├── data/                   # Test data
├── fixtures/              
│   └── auth.fixture.ts     # Authentication fixture
├── pages/                  # Page Object Models
├── tests/
│   ├── cart/              # Shopping cart tests
│   ├── catalog/           # Product catalog tests
│   ├── checkout/          # Checkout process tests
│   ├── orders/           # Order management tests
│   └── reviews/          # Product review tests
└── utils/
    └── cookies.ts         # Cookie management utilities
```

## Features

- **Authentication Management**: Efficient session handling with cookie management
- **Page Object Model**: Structured test architecture
- **Data-Driven Testing**: Separate test data from test logic
- **Custom Fixtures**: Reusable test setup and teardown

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   USER_NAME=your_username
   PASSWORD=your_password
   ```

## Running Tests

```bash
npx playwright test
```

## Course Information

- **Course**: Playwright Level 1
- **Instructor**: Truong Pham
- **Reviewers**: 
  - Dong Tran
  - My Nguyen

## Acknowledgments

Special thanks to:
- Truong Pham for the comprehensive Playwright training
- Dong Tran and My Nguyen for their valuable review and feedback" 
