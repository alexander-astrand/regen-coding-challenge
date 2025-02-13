# Regen-coding-challenge

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

Regen Coding Challenge is a web application built using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/). It integrates with the Keplr Wallet to allow users to connect their blockchain wallet, view account details (including REGEN balance), and send tokens. The app is designed to be responsive and user-friendly.

## Features

- **Wallet Integration:** Connect and disconnect your wallet using the Keplr extension.
- **Account Details:** Display your account address and current REGEN balance.
- **Token Transfers:** Send tokens directly from your connected wallet.
- **Responsive Design:** Styled with Tailwind CSS for a modern, responsive interface.
- **Realtime Updates:** Automatically updates your wallet balance after transactions.

## Getting Started

### Prerequisites

- **Node.js:** Version 16 or higher.
- **Package Manager:** npm.
- **Keplr Wallet:** Installed in your browser for wallet interactions.
- **ChainInfo:** An updated and correct chainConfig.ts file to ensure connection to the correct blockchain network.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/alexander-astrand/regen-coding-challenge.git
   cd regen-coding-challenge
   ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Running Locally**

    1. Start the Development Server:
    Using npm:
    ```bash
    npm run dev
    ```

    2. Open Your Browser:
    Navigate to http://localhost:3000 to see the application in action.

4. **Building for Production**

    To create an optimized production build, use:
    ```bash
    npm run build
    npm start
    ```

