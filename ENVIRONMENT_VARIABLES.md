# Cobalt Environment Variables Documentation

## Production Deployment Guide

This document explains all environment variables available in Cobalt and how to configure them for production deployment.

### File Structure

- `.env.example` - Template with all available variables and descriptions
- `.env.production` - Production configuration (real values)
- `.env.development` - Development configuration
- `.env.local` - Local overrides (not committed)

## Required Variables

### API Configuration

**WEB_DEFAULT_API** (Required)
- Type: URL
- Default: `https://api.cobalt.tools`
- Description: The default API endpoint for downloading media
- Examples:
  - `https://api.cobalt.tools` - Official API
  - `https://your-instance.com` - Custom instance
  - `http://localhost:3000` - Local development

**WEB_HOST** (Recommended)
- Type: String
- Default: Not set
- Description: Your domain where Cobalt is hosted
- Examples:
  - `cobalt.tools`
  - `localhost:5173`
  - `your-domain.com`

## Optional Variables

### Analytics Configuration

**WEB_PLAUSIBLE_ENABLED**
- Type: Boolean (true/false, 1/0)
- Default: `false`
- Description: Enable Plausible Analytics tracking
- Production: Set to `true` to enable

**WEB_PLAUSIBLE_HOST**
- Type: String
- Default: Not set
- Description: Your Plausible Analytics domain
- Examples:
  - `analytics.your-domain.com`
  - `plausible.io`
- Required if: `WEB_PLAUSIBLE_ENABLED=true`

### Feature Flags

**WEB_ENABLE_WEBCODECS**
- Type: Boolean
- Default: `true`
- Description: Enable WebCodecs for better video encoding support
- Recommended: `true` for production

**WEB_ENABLE_DEPRECATED_YOUTUBE_HLS**
- Type: Boolean
- Default: `false`
- Description: Enable deprecated YouTube HLS support (not recommended)
- Recommended: `false` for production

### Build & Performance

**WEB_SOURCEMAP**
- Type: Boolean
- Default: `false` (production), `true` (development)
- Description: Enable source maps for easier debugging
- Security Note: Disable in production to prevent code exposure

**WEB_CACHE_MAX_AGE**
- Type: Number (seconds)
- Default: `31536000` (1 year)
- Description: HTTP cache max-age for static assets
- Examples:
  - `31536000` - 1 year (production)
  - `0` - No cache (development)
  - `3600` - 1 hour

### Security Headers

**WEB_ENABLE_HSTS**
- Type: Boolean
- Default: `true`
- Description: Enable HTTP Strict-Transport-Security header
- Recommended: `true` for production

**WEB_HSTS_MAX_AGE**
- Type: Number (seconds)
- Default: `31536000` (1 year)
- Description: HSTS max-age header value
- Recommended: `31536000` for production

## How to Deploy

### Step 1: Create Production Environment File

```bash
cp web/.env.example web/.env.production
```

### Step 2: Edit Configuration

```bash
vim web/.env.production
```

Fill in the required values:
```
WEB_DEFAULT_API=https://api.cobalt.tools
WEB_HOST=your-domain.com
WEB_PLAUSIBLE_ENABLED=true
WEB_PLAUSIBLE_HOST=analytics.your-domain.com
```

### Step 3: Build for Production

```bash
npm run build
```

The build system will automatically read from `.env.production` and inject the variables.

### Step 4: Deploy

```bash
npm run deploy
# or upload the 'build' directory to your hosting
```

## Variable Access in Code

Variables are accessible through the `env` import:

```typescript
import env from '$lib/env';

console.log(env.DEFAULT_API);
console.log(env.PLAUSIBLE_ENABLED);
```

All variables are type-safe and will be compiled into the production build.

## Security Best Practices

1. **Never commit `.env.local` or `.env.production` files** - Add to `.gitignore`
2. **Use secrets management** - Store sensitive values in your deployment platform (Vercel, etc.)
3. **Validate URLs** - Ensure API URLs are HTTPS in production
4. **Disable source maps** - Set `WEB_SOURCEMAP=false` in production
5. **Enable HSTS** - Set `WEB_ENABLE_HSTS=true` for better security

## Troubleshooting

**"Couldn't connect to processing instance" error**
- Check `WEB_DEFAULT_API` is set to a valid API URL
- Verify the API server is running and accessible
- Check network connectivity and firewall rules

**Analytics not working**
- Ensure `WEB_PLAUSIBLE_ENABLED=true`
- Verify `WEB_PLAUSIBLE_HOST` is correct
- Check browser console for CORS errors

**Static assets not caching**
- Verify `WEB_CACHE_MAX_AGE` is set correctly
- Check server headers are being sent
- Clear browser cache and test again
