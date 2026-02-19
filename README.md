# Weather Application

A modern weather application built with React, TypeScript, and Vite, powered by Weatherstack API.

## Features

- Search for locations worldwide
- View current weather conditions
- Weather history view (requires premium API plan)
- Responsive design for all devices
- Real-time weather data from Weatherstack API

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your Weatherstack API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Build

To build for production:

```bash
npm run build
```

## Deploy to Vercel

This app is configured for easy deployment to Vercel. Make sure to add your `VITE_WEATHER_API_KEY` environment variable in your Vercel project settings.

## API Key

Get your free API key from [Weatherstack](https://weatherstack.com/).
