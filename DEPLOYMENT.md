# MFM IYC deployment guide

The recommended setup is Vercel for the React frontend and Render for the
Spring Boot API. Google Sheets remains private and is accessed only by a Google
Cloud service account.

## 1. Create the Google service account

1. Sign in to [Google Cloud Console](https://console.cloud.google.com/) with
   `mfmiycformreg@gmail.com`.
2. Create a project named `MFM IYC Member Form`.
3. Open **APIs & Services > Library** and enable **Google Sheets API**.
4. Open **IAM & Admin > Service Accounts** and create `mfmiyc-form-api`.
5. Open the service account, choose **Keys > Add key > Create new key > JSON**.
6. Keep the downloaded JSON private. Never add it to Git.
7. Copy the service account email from the JSON (`client_email`).
8. Open the registration spreadsheet and share it with that email as **Editor**.

Spreadsheet configuration:

```text
GOOGLE_SPREADSHEET_ID=17CmL_QBemTZeN1ZnOn1lJu9msH0Vv-xFtQj0U6woS7E
GOOGLE_SHEET_NAME=Sheet1
```

## 2. Push the repository to GitHub

Commit the project without `.env` or service-account JSON files and push it to
a private or public GitHub repository.

## 3. Deploy the backend to Render

1. In Render, choose **New > Blueprint** and connect the GitHub repository.
2. Render will read `render.yaml` and create `mfmiyc-api`.
3. Enter `GOOGLE_SERVICE_ACCOUNT_JSON` as the complete contents of the JSON
   key on one line.
4. Leave the spreadsheet variables supplied by `render.yaml` unchanged.
5. Initially set `FRONTEND_URL` to `http://localhost:5173`; replace it with the
   Vercel URL after step 4.
6. Deploy and verify `https://YOUR-RENDER-URL/api/members/health`.

## 4. Deploy the frontend to Vercel

1. Import the same GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Add this production environment variable:

```text
VITE_API_BASE_URL=https://YOUR-RENDER-URL
```

4. Deploy and copy the assigned Vercel URL.

## 5. Finish CORS configuration

Return to the Render service and set:

```text
FRONTEND_URL=https://YOUR-VERCEL-URL
```

Redeploy the backend, open the Vercel site, submit one test entry, and confirm
that it appears in row 2 of the Google spreadsheet.

## Secret-handling rules

- Never commit `.env`, a JSON key, or `GOOGLE_SERVICE_ACCOUNT_JSON`.
- Store the JSON only in Render's secret environment variable.
- Give spreadsheet access only to church administrators and the service account.
- If a JSON key is exposed, delete it immediately and create a replacement.
