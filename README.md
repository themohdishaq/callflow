# CallFlow AI - Customer Intake

> **Build with Fastn Hackathon Project**  
> A customer intake automation that validates inbound leads, sends confirmation and internal notification emails through Gmail, and records the complete lead and delivery audit trail in Google Sheets.

## Overview

CallFlow AI - Customer Intake automates the processing of new customer inquiries captured through a contact or intake form.

When a prospective customer submits the form, the workflow:

1. Receives the submission through a Fastn webhook.
2. Validates required fields and email format.
3. Sends a personalized confirmation email to the customer through Gmail.
4. Sends an internal lead alert to the configured administrator through Gmail.
5. Appends the lead and email delivery statuses to Google Sheets.
6. Returns a structured execution summary.

The result is a simple end-to-end intake pipeline that removes manual copying, confirmation emails, and lead logging.

## Workflow Architecture

```text
Customer / Intake Form
          |
          v
Fastn Webhook Trigger
          |
          v
Validate Required Fields + Email
      /                     \
 Invalid                    Valid
   |                          |
   v                          v
Return Validation       Gmail: Customer
Error                   Confirmation
                            |
                            v
                       Gmail: Admin
                       Lead Alert
                            |
                            v
                       Google Sheets
                       Append Lead Row
                            |
                            v
                       Execution Summary
```

The implementation uses Fastn as the orchestration layer between the CallFlow AI frontend, Gmail, and Google Sheets.

## Sequence

```text
CallFlow AI          Fastn Workflow             Gmail             Google Sheets
    |                      |                       |                    |
    |--- Form payload ---->|                       |                    |
    |                      |-- Validate fields     |                    |
    |                      |---------------------->| Customer receipt   |
    |                      |<----------------------| Receipt sent       |
    |                      |---------------------->| Admin lead alert   |
    |                      |<----------------------| Alert sent         |
    |                      |------------------------------------------->|
    |                      |                     Append lead row        |
    |                      |<-------------------------------------------|
    |                      |                     Row added              |
    |<-- Result summary ---|                       |                    |
```

## What This Integration Does

This workflow automates the ingestion and processing of new customer inquiries and lead submissions captured via CallFlow AI.

When a prospective customer submits a contact or intake form, the integration validates the incoming information, logs the lead into a central Google Sheets spreadsheet, and immediately dispatches email notifications via Gmail.

It sends:

- A confirmation message to the customer acknowledging receipt of the request.
- An internal notification containing the complete submission details for prompt follow-up.
- A structured lead record to Google Sheets, including email-delivery audit statuses.

## Connected Apps

| App | Role | What it does |
| --- | --- | --- |
| **Fastn** | Orchestration | Receives the webhook, validates data, coordinates connector actions, and compiles the execution result. |
| **Gmail** | Destination | Sends the customer confirmation email and internal team/admin lead alert. |
| **Google Sheets** | Destination | Appends the inquiry and delivery audit information to the `CallFlow AI Leads` worksheet. |

## Before You Start

- Connect a **Gmail** account with permission to send outgoing emails.
- Connect a **Google Sheets** account with edit access to the target spreadsheet.
- Ensure the spreadsheet contains a worksheet named exactly **`CallFlow AI Leads`**.
- Create the expected column headers described below.
- Verify the default admin notification address or pass a preferred admin recipient in the intake payload.
- Ensure the frontend submits the required fields: **`name`**, **`email`**, **`phone`**, and **`callPurpose`**.

## Input Payload

A typical intake request can contain:

```json
{
  "name": "David Chen",
  "email": "david@example.com",
  "phone": "+1-555-0244",
  "company": "Example Company",
  "callPurpose": "Annual Plan Renewal",
  "message": "I need help with my renewal pricing.",
  "adminEmail": "admin@example.com"
}
```

### Required Fields

| Field | Required | Description |
| --- | --- | --- |
| `name` | Yes | Full name of the prospective customer. |
| `email` | Yes | Customer email address; validated before processing. |
| `phone` | Yes | Customer phone number. |
| `callPurpose` | Yes | Purpose/topic of the inquiry. |
| `company` | No | Customer company or organization. |
| `message` | No | Additional inquiry details. |
| `adminEmail` | No | Optional internal recipient override. |

## How It Works

### 1. Receive Form Submission

The **CallFlow AI Form Submission & Customer Intake Webhook** receives customer contact details, inquiry purpose, and optional message/company information.

### 2. Validate Input

The workflow checks that:

- `name` is present.
- `email` is present and follows a reasonable email format.
- `phone` is present.
- `callPurpose` is present.

Invalid submissions follow the validation-error path and do not continue through the normal notification/storage sequence.

### 3. Send Customer Confirmation

For a valid submission, Gmail sends a personalized receipt to the submitted customer email address.

The confirmation acknowledges that CallFlow AI received the request and can include the submitted name, email, phone, company, purpose, and message.

### 4. Send Internal Lead Alert

Gmail sends a second email to the configured administrator/team address with the complete lead details so that the team can follow up.

### 5. Format Data

The workflow generates the submission timestamp and normalizes values for spreadsheet storage. International phone numbers beginning with `+` can be escaped as text to prevent spreadsheet formula interpretation.

### 6. Append to Google Sheets

A new row is appended to the **`CallFlow AI Leads`** worksheet with customer details, lead status, and email-delivery audit statuses.

### 7. Compile Execution Summary

The workflow evaluates the result of validation, Gmail dispatches, and Google Sheets storage and produces a structured execution result for the caller/dashboard.

## Google Sheets Structure

Create a worksheet named:

```text
CallFlow AI Leads
```

Recommended columns:

| Column | Header | Purpose |
| --- | --- | --- |
| A | Timestamp | Auto-generated submission timestamp. |
| B | Name | Customer/lead name. |
| C | Email | Validated customer email. |
| D | Phone | Customer phone number. |
| E | Company | Company name, if supplied. |
| F | Call Purpose | Inquiry or call purpose. |
| G | Message | Optional customer message. |
| H | Status | Initial lead state, normally `New`. |
| I | Customer Email Status | Customer confirmation delivery result. |
| J | Admin Email Status | Internal notification delivery result. |

## Field Mapping

| Source | Destination | Notes |
| --- | --- | --- |
| Auto-generated timestamp | Sheets: `Timestamp` | Stored as a timestamp/ISO-style value. |
| `name` | Sheets: `Name` | Full lead name. |
| `email` | Sheets: `Email` | Validated before normal processing. |
| `phone` | Sheets: `Phone` | Can be escaped as text for international `+` numbers. |
| `company` | Sheets: `Company` | Empty when omitted. |
| `callPurpose` | Sheets: `Call Purpose` | Inquiry topic/purpose. |
| `message` | Sheets: `Message` | Empty when omitted. |
| Constant `New` | Sheets: `Status` | Initial lead status. |
| Customer email result | Sheets: `Customer Email Status` | Tracks send/audit result. |
| Admin email result | Sheets: `Admin Email Status` | Tracks send/audit result. |
| Lead details | Gmail: Customer Confirmation | Personalized receipt sent to the customer. |
| Full lead payload | Gmail: Admin Alert | Internal notification for follow-up. |

## Smart Features

### Strict Validation

The workflow stops invalid submissions before the normal processing path when mandatory information or an acceptable email address is missing.

### Spreadsheet Format Safety

Phone numbers can be normalized/escaped so international dialing prefixes are preserved rather than interpreted as spreadsheet formulas.

### Independent Error Isolation

The design tracks connector results separately so an email-dispatch problem does not need to erase an otherwise valid lead record.

### Audit Trail

Customer and admin email results are stored alongside the lead record, providing an operational record of what happened during processing.

### Configurable Routing

The design can support configurable spreadsheet targets and administrator destinations on a per-request or environment basis.

## Web Flow

The web flow for this project follows the intake and outcome automation path used by the dashboard and API routes:

```text
Customer opens web app
        |
        v
Dashboard / form UI
        |
        v
POST /api/leads
        |
        v
Fastn intake webhook
        |
        +--> Validate lead data
        |
        +--> Send customer confirmation email
        |
        +--> Send admin notification email
        |
        +--> Append lead record to Sheets
        |
        v
Lead accepted and tracked
```

The dashboard also supports the post-call workflow:

```text
Customer selected in dashboard
        |
        v
Call lifecycle starts
        |
        v
POST /api/calls or /api/call-outcome
        |
        v
Fastn call outcome webhook
        |
        +--> Save call result
        |
        +--> Mark sentiment and follow-up status
        |
        +--> Update dashboard history
        |
        v
Call recorded and visible in UI
```

This keeps the user-facing web experience and the automation backend aligned: the frontend collects user input, the API routes validate and forward it, and the workflow infrastructure handles notification and persistence.

## Fastn Runtime Design

The Fastn AI builder exposes workflow runtime data and services through `ctx` and `fastn`.

### `ctx.input`

Contains data supplied by the caller:

```js
const {
  name,
  email,
  phone,
  company,
  callPurpose,
  message,
  adminEmail
} = ctx.input;
```

### `ctx.headers`

Contains sanitized request headers. Authentication headers, JWT headers, and cookies are stripped.

```js
const lang = ctx.headers["accept-language"] ?? "en";
```

### `ctx.connectors`

A read-only manifest describing the workflow's connector bindings at execution start.

It is **not** used to invoke connector actions.

```js
const gmailBinding = ctx.connectors.googleGmail;
const sheetsBinding = ctx.connectors.googleSheets;
```

Connector actions are called through `fastn.connector`.

### `fastn.connector`

Executes connector actions by connector slug:

```js
const profile = await fastn.connector.gmail.getProfile({});
```

In the generated CallFlow workflow, the concrete action names depend on the Gmail and Google Sheets connector definitions selected in Fastn.

### `fastn.envConfig`

Stores non-secret environment-specific configuration, such as an administrator email or spreadsheet identifier.

```js
const adminEmail = await fastn.envConfig.get("adminEmail");
const spreadsheetId = await fastn.envConfig.get("spreadsheetId");
```

The same key can contain different values in test and live environments.

### `fastn.secrets`

Use the encrypted vault for credentials or other sensitive values. Credentials should never be hardcoded in workflow code.

```js
const apiKey = await fastn.secrets.get("SERVICE_API_KEY");
```

### `fastn.state`

Provides durable key-value state for counters, caches, or workflow metadata.

```js
const count = ((await fastn.state.get("intakeRuns")) ?? 0) + 1;
await fastn.state.set("intakeRuns", count);
```

### `fastn.db`

Provides tenant-scoped SQL storage when persistent internal application data is needed.

```js
const [row] = await fastn.db.query(
  "INSERT INTO events (name) VALUES ($1) RETURNING *",
  [ctx.input.name]
);
```

Parameterized queries should be used instead of interpolating values directly.

### `fastn.unified`

Provides canonical entities across supported connected providers. It is useful when the same workflow needs to operate across interchangeable CRM or other provider categories.

This intake workflow currently uses direct Gmail and Google Sheets connector actions rather than requiring a unified entity.

## Multi-Tenant Support

When a connector is configured as `MULTI_TENANT`, the caller identifies the customer/tenant using one of Fastn's supported request headers.

Example:

```http
x-end-org-id: <customer-uuid>
```

Optional advanced routing headers include:

```http
x-installation-id: <installation-id>
x-fastn-connections: {"slack":"conn_..."}
x-fastn-installation-config: {"threshold":10}
```

For a SaaS-only workflow, these headers are not required.

## Trigger

- **Trigger type:** Webhook
- **Name:** `CallFlow AI Form Submission & Customer Intake Webhook`
- **Invocation:** HTTP POST from the CallFlow AI frontend/server when a customer submits the intake form.
- **Manual testing:** Send a JSON payload matching the workflow's expected input schema.

## Expected Successful Result

A successful execution can return a structured result similar to:

```json
{
  "success": true,
  "formValidated": true,
  "sheetSaved": true,
  "customerEmailSent": true,
  "adminEmailSent": true,
  "status": "New",
  "message": "Submission processed successfully"
}
```

The exact response shape should match the currently published Fastn workflow version.

## Frontend Integration Pattern

For production-style integration, the browser should submit to a server-side route rather than exposing sensitive credentials directly in client code.

```text
Browser Form
     |
     v
Next.js Server Route
     |
     v
Fastn Webhook / Workflow
     |
     +------> Gmail
     |
     +------> Google Sheets
     |
     v
Structured Result
     |
     v
CallFlow Dashboard
```

## Error Handling

The workflow should distinguish among:

- Validation failure
- Customer confirmation email failure
- Admin notification email failure
- Google Sheets append failure
- Complete success

Where possible, connector errors are isolated so a failure in one destination can be reported without hiding the status of other completed actions.

## Troubleshooting

| What you see | Likely cause | What to check |
| --- | --- | --- |
| Submission rejected | Required field missing or malformed email | Verify `name`, `email`, `phone`, and `callPurpose`; verify email format. |
| Lead does not appear in Sheets | Missing worksheet, wrong spreadsheet target, or insufficient permission | Confirm the `CallFlow AI Leads` tab exists and the connected Google account has edit access. |
| Customer/admin email is not received | Gmail connection expired, permission issue, or provider limitation | Check the Gmail connector authorization and Fastn execution details. |
| Phone appears as a formula/error | Leading `+` interpreted by Sheets | Store/escape the phone number as text. |
| One integration succeeds while another fails | Connector-specific execution error | Inspect each action's result rather than treating the entire run as one undifferentiated status. |

## Security Notes

- Never hardcode Gmail credentials, OAuth secrets, API keys, or other sensitive values in workflow code.
- Use `fastn.secrets` for secrets.
- Use `fastn.envConfig` for non-sensitive test/live configuration.
- Keep privileged workflow/API credentials on the server side.
- Validate all untrusted form input before using it.
- Use parameterized SQL if `fastn.db` is introduced.
- For multi-tenant connectors, ensure the correct tenant identity is supplied on each request.

## Demo Flow

For the hackathon demonstration:

1. Show the Fastn workflow and connected Gmail/Google Sheets services.
2. Submit a customer inquiry through the CallFlow AI frontend.
3. Show the Fastn workflow execution.
4. Open Gmail and show the customer confirmation.
5. Show the internal/admin lead notification.
6. Open Google Sheets and show the newly appended lead row.
7. Return to the CallFlow AI dashboard and show the resulting activity/status.

This demonstrates real data moving end-to-end through Fastn rather than only a frontend mockup.

## Repository / Documentation Assets

Recommended repository structure:

```text
callflow-ai/
├── app/
│   ├── api/
│   └── ...
├── public/
│   └── ...
├── docs/
│   ├── workflow.png
│   └── sequence.png
├── README.md
└── ...
```

The two supplied workflow screenshots can be saved under `docs/` and embedded in this README with:

```md
![CallFlow AI workflow](docs/workflow.png)

![CallFlow AI sequence](docs/sequence.png)
```

## Related Resources

Add the actual project-specific links before submission:

- Fastn project/workflow
- CallFlow AI live application
- Source repository
- Demo video
- Google Sheets destination (only if appropriate to share)
- Fastn connector/setup documentation

## Hackathon Summary

**CallFlow AI - Customer Intake** demonstrates how a single customer submission can become a complete automated business process.

Instead of manually reading a form, copying the lead into a spreadsheet, sending a confirmation, and notifying the team, Fastn orchestrates the complete sequence across Gmail and Google Sheets while preserving validation and audit information.

**Form -> Fastn -> Gmail + Google Sheets -> Dashboard**

---

## 👥 Team Members

This project was developed for the **Build with Fastn Hackathon** by:

- **Muhammad Ishaq**
- **Muhammad Hammad Sarwar**

### Project
**CallFlow AI — Customer Intake & Automation**

Built with **Fastn**, **Gmail**, **Google Sheets**, and **Next.js**.

---

**CallFlow AI** — Automating customer interactions, lead management, and business workflows with Fastn.