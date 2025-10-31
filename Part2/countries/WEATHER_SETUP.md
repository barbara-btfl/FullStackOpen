# Weather API Setup Instructions

## How to get a free OpenWeatherMap API key:

1. Go to https://openweathermap.org/api
2. Click "Sign Up" to create a free account
3. Verify your email address
4. Go to https://home.openweathermap.org/api_keys
5. Copy your API key

## How to add the API key to your project:

### Option 1: Direct replacement (for development only)

Replace the `demo_key` in `/src/services/weather.js` with your actual API key:

```javascript
const API_KEY = "your_actual_api_key_here";
```

### Option 2: Environment variable (recommended)

1. Create a file called `.env` in your project root
2. Add this line to the .env file:

```
VITE_WEATHER_API_KEY=your_actual_api_key_here
```

3. The weather.js file is already configured to use the environment variable:

```javascript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "demo_key";
```

## Important Notes:

- The free tier allows 1000 API calls per day
- API keys may take a few hours to activate
- Never commit API keys to public repositories
- Always use environment variables in production
