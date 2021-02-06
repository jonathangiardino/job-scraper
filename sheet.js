const { GoogleSpreadsheet } = require("google-spreadsheet");
const dotenv = require("dotenv");

dotenv.config();

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(
      "1VfvKm0eIGcOmWFu0TKjmauN_cnNN7Qabko_etBMnu1E"
    );
  }

  async load() {
    await this.doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    await this.doc.loadInfo();
  }

  async addRows(rows, index) {
    const sheet = this.doc.sheetsByIndex[index];
    await sheet.addRows(rows);
  }
};
