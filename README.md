# YouCan Shop App Template - Nuxt.js

This template helps you build a Nuxt.js app embedded inside the YouCan seller area. It uses [Nuxt.js](https://nuxt.com/) for the framework, [Prisma](https://www.prisma.io/) for database management, and includes built-in authentication.

## Dependencies

- [youcan-shop/qantra](https://github.com/youcan-shop/qantra): allows your app to integrate within YouCan Seller Area.
- [youcan-shop/celeste](https://github.com/youcan-shop/celeste): YouCan’s design system and component library that helps you build consistent experiences for YouCan merchants.

## Prerequisites

- [Node.js](https://nodejs.org/en) and a Package Manager (rec. [pnpm](https://pnpm.io/)) installed ;
- [YouCan Partner Account](https://partners.youcan.shop/): create one [here](https://partners.youcan.shop) ;
- [Development Store](https://developer.youcan.shop/partners/development-store) to preview and test the app.

## Getting Started

### Recommended: Use [YouCan CLI](https://github.com/youcan-shop/cli)

1. Create a YouCan app using the YouCan CLI:

```bash
pnpm create @youcan/app@latest
```

2. Start the Development Server:

```bash
pnpm dev
```

3. Install App in Your Development Store for preview:

```bash
pnpm youcan app install
```

## App Structure

Your project directory will include several important files and folders:

- **app/**: Contains the main application code.
  - **layouts/**: Defines the structure of the app's UI.
  - **pages/**: Contains Vue components for different routes.
  - **composables/**: Reusable Vue composables.
  - **middleware/**: Nuxt route middleware.
  - **plugins/**: Nuxt plugins.
  - **app.vue**: The main Vue component.
- **server/**: Server-side logic, including API routes and middleware.
- **prisma/**: Manages database models and migrations.
- **shared/**: Shared utilities and types.
- **lib/**: Library code and helpers.
- **public/**: Static assets like images and fonts.
- **nuxt.config.ts**: Nuxt configuration file.
- **uno.config.ts**: UnoCSS configuration.
- **youcan.app.json** and **youcan.web.json**: App-specific settings.
- **.env**: Environment configuration (see `.env.example`).
