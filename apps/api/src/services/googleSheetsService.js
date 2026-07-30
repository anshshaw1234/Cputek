import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "./google-service-account.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

const SPREADSHEET_ID = "1-P4pV6ScZJrpFYWAukqT8rvEqefwzuN7aaThmk6_ymM";

export const addToGoogleSheet = async (formData) => {
  const { name, email, phone, subject, message } = formData;

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          name,
          email,
          phone,
          subject,
          message,
          new Date().toLocaleString(),
        ],
      ],
    },
  });
};