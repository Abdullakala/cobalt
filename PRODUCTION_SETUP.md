# Cobalt Production Configuration - Complete Setup Guide

## What Was Done

### 1. Environment Variables System
✅ Created comprehensive environment configuration system with:
- **`.env.production`** - Real production variables
- **`.env.development`** - Development defaults  
- **`.env.example`** - Complete template with descriptions
- **`ENVIRONMENT_VARIABLES.md`** - Full documentation

### 2. Variables Added

| Variable | Type | Default | Purpose |
|----------|------|---------|---------|
| `WEB_DEFAULT_API` | URL | `https://api.cobalt.tools` | API endpoint for media downloading |
| `WEB_HOST` | String | Not set | Your hosting domain |
| `WEB_PLAUSIBLE_ENABLED` | Boolean | `false` | Analytics tracking enable/disable |
| `WEB_PLAUSIBLE_HOST` | String | Not set | Plausible Analytics domain |
| `WEB_ENABLE_WEBCODECS` | Boolean | `true` | WebCodecs video encoding support |
| `WEB_ENABLE_DEPRECATED_YOUTUBE_HLS` | Boolean | `false` | Deprecated YouTube HLS support |
| `WEB_SOURCEMAP` | Boolean | `false` (prod), `true` (dev) | Debug source maps |
| `WEB_CACHE_MAX_AGE` | Number | `31536000` | Static asset cache duration (seconds) |
| `WEB_ENABLE_HSTS` | Boolean | `true` | HTTP Strict-Transport-Security |
| `WEB_HSTS_MAX_AGE` | Number | `31536000` | HSTS header duration (seconds) |

### 3. Code Changes

#### Updated `env.ts`
- Added `getEnvNumber()` utility for numeric values
- Added all new variables with proper types
- Removed hardcoded dummy data
- All variables now configurable

#### Fixed `api-url.ts` 
- Added fallback to official API when `DEFAULT_API` not set
- Prevents "couldn't connect to processing instance" error

### 4. Removed Dummy Data
- ✅ No localhost defaults
- ✅ No hardcoded test values
- ✅ No mock analytics setup
- ✅ All values now configurable

## How to Use for Production

### 1. Configure Variables
```bash
# Edit production environment file
nano web/.env.production

# Set your real values:
WEB_DEFAULT_API=https://api.cobalt.tools
WEB_HOST=your-domain.com
WEB_PLAUSIBLE_ENABLED=true
WEB_PLAUSIBLE_HOST=analytics.your-domain.com
```

### 2. Build Application
```bash
npm run build
```
Variables are embedded at build time, not runtime.

### 3. Deploy
Upload the `build/` directory to your hosting provider.

## Security Checklist

- [ ] Set `WEB_DEFAULT_API` to production API URL
- [ ] Set `WEB_HOST` to your domain
- [ ] Enable `WEB_ENABLE_HSTS` for HTTPS
- [ ] Disable `WEB_SOURCEMAP` in production
- [ ] Set appropriate cache headers (`WEB_CACHE_MAX_AGE`)
- [ ] Configure analytics if needed
- [ ] Never commit `.env.local` or `.env.production`
- [ ] Add `.env.production` to `.gitignore`

## Files Changed

1. **New Files:**
   - `web/.env.production` - Production config
   - `web/.env.development` - Development config
   - `web/.env.example` - Template
   - `ENVIRONMENT_VARIABLES.md` - Complete documentation

2. **Modified Files:**
   - `web/src/lib/env.ts` - Added all variables
   - `web/src/lib/api/api-url.ts` - Added fallback logic

## Next Steps

1. Copy `.env.example` to your deployment platform secrets
2. Set real values for each variable
3. Build and test locally with `.env.development`
4. Deploy to production with `.env.production`
5. Monitor application logs for any configuration issues

## Support

For detailed variable descriptions and troubleshooting, see `ENVIRONMENT_VARIABLES.md`

---
**Generated:** $(date)
**Branch:** v0/abkdarrkk-0fc33722
**Status:** Ready for Production
