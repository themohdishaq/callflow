# CallFlow AI Dashboard

A Next.js dashboard for tracking customer calls, lead intake, and post-call outcomes. The app is designed to surface a sales/operations workflow where customer calls can be monitored, outcomes logged, and follow-up actions managed from a single interface.

## Overview

This project includes:

- A customer overview dashboard with key operational stats
- A lead capture flow for inbound customer requests
- A call history view that reads stored call records
- API routes for sending call outcomes and dashboard data to Fastn webhooks
- Local in-memory fallback storage for development and testing when external webhooks are unavailable

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

## Project Structure

```bash
app/
  api/
    call-outcome/
    calls/
    client/
    dashboard/
    history/
    leads/
  page.tsx
components/
lib/
  call-store.ts
public/
```

## Features

### Customer and call workflow
- Customer list and call activity view
- Call lifecycle states for calling, connected, conversation, processing, and completed
- Outcome tracking with sentiment and follow-up flags

### Lead intake
- Validates incoming lead data on the server
- Submits lead payloads to Fastn for processing
- Supports optional admin email forwarding

### Dashboard data
- Reads recent call history from the in-memory store
- Falls back to local data when Fastn webhook configuration is missing or fails
- Exposes summary metrics such as total calls, completed calls, escalated calls, and follow-ups

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Environment Variables

The app can work in local fallback mode without configuration, but external webhook integrations use environment variables such as:

```bash
FASTN_WEBHOOK_URL=
FASTN_HISTORY_WEBHOOK_URL=
FASTN_CALL_OUTCOME_WEBHOOK=
```

If these are not provided, the app will continue to operate with local in-memory data for development/testing.

## API Routes

### POST /api/leads
Accepts customer lead data and submits it to the configured Fastn intake webhook.

### POST /api/calls
Stores and forwards call outcome data to a configured Fastn webhook.

### GET /api/dashboard
Returns recent call history and summary stats from Fastn or the local fallback store.

## Notes

This project currently uses an in-memory store for call records, which is useful for local development but not suitable for production persistence. For a production-grade deployment, you would typically replace this with a database-backed store or a durable workflow system.

## License

This project is currently unlicensed unless otherwise specified by the repository owner.
