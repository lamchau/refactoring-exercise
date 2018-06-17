const parseCsvSync = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');


function parseFile(filename) {
  const filepath = fs.readFileSync(path.join(__dirname, '..', filename)).toString()
  return parseCsvSync(filepath);
}

class FundingRaised {
  static where(options = {}) {
    const rows = parseFile('startup_funding.csv');
    const headers = rows[0];
    let csv_data = rows.slice(1);

    const funding_data = [];

    if (options.company_name) {
      csv_data = csv_data.filter(row => options.company_name == row[1]);
    }

    if (options.city) {
      csv_data = csv_data.filter(row => options.city == row[4]);
    }

    if (options.state) {
      csv_data = csv_data.filter(row => options.state == row[5]);
    }

    if (options.round) {
      csv_data = csv_data.filter(row => options.round == row[9]);
    }

    csv_data.forEach((row) => {
      const mapped = {};
      mapped.permalink = row[0];
      mapped.company_name = row[1];
      mapped.number_employees = row[2];
      mapped.category = row[3];
      mapped.city = row[4];
      mapped.state = row[5];
      mapped.funded_date = row[6];
      mapped.raised_amount = row[7];
      mapped.raised_currency = row[8];
      mapped.round = row[9];
      funding_data.push(mapped);
    });

    return funding_data;
  }

  static findBy(options = {}) {
    const rows = parseFile('startup_funding.csv');
    const headers = rows[0];
    let csv_data = rows.slice(1);

    if (options.company_name) {
      csv_data = csv_data.filter(row => options.company_name == row[1]);
      const row = csv_data[0];
      const mapped = {};
      mapped.permalink = row[0];
      mapped.company_name = row[1];
      mapped.number_employees = row[2];
      mapped.category = row[3];
      mapped.city = row[4];
      mapped.state = row[5];
      mapped.funded_date = row[6];
      mapped.raised_amount = row[7];
      mapped.raised_currency = row[8];
      mapped.round = row[9];
      return mapped;
    }

    if (options.city) {
      csv_data = csv_data.filter(row => options.city == row[4]);
      const row = csv_data[0];
      const mapped = {};
      mapped.permalink = row[0];
      mapped.company_name = row[1];
      mapped.number_employees = row[2];
      mapped.category = row[3];
      mapped.city = row[4];
      mapped.state = row[5];
      mapped.funded_date = row[6];
      mapped.raised_amount = row[7];
      mapped.raised_currency = row[8];
      mapped.round = row[9];
      return mapped;
    }

    if (options.state) {
      csv_data = csv_data.filter(row => options.state == row[5]);
      const row = csv_data[0];
      const mapped = {};
      mapped.permalink = row[0];
      mapped.company_name = row[1];
      mapped.number_employees = row[2];
      mapped.category = row[3];
      mapped.city = row[4];
      mapped.state = row[5];
      mapped.funded_date = row[6];
      mapped.raised_amount = row[7];
      mapped.raised_currency = row[8];
      mapped.round = row[9];
      return mapped;
    }

    if (options.round) {
      csv_data = csv_data.filter(row => options.round == row[9]);
      const row = csv_data[0];
      const mapped = {};
      mapped.permalink = row[0];
      mapped.company_name = row[1];
      mapped.number_employees = row[2];
      mapped.category = row[3];
      mapped.city = row[4];
      mapped.state = row[5];
      mapped.funded_date = row[6];
      mapped.raised_amount = row[7];
      mapped.raised_currency = row[8];
      mapped.round = row[9];
      return mapped;
    }
  }
}

module.exports = FundingRaised;
