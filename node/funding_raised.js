const parseCsvSync = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');

const parseCsv = filename => {
  const content = fs.readFileSync(path.join(__dirname, '..', filename)).toString();
  return parseCsvSync(content);
};

class FundingRaised {
  static where(options = {}) {
    const [headers, ...rows] = parseCsv('startup_funding.csv');
    let csv_data = rows;

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
    return csv_data.map(FundingRaised._getRowAsObject);
  }

  static asyncWhere() {
    return Promise.resolve(FundingRaised.where(...arguments));
  }

  static findBy(options = {}) {
    const [headers, ...rows] = parseCsv('startup_funding.csv');
    let csv_data = rows;

    const filters = FundingRaised._createFilter(headers, options);
    for (const row of rows) {
      const match = FundingRaised._applyFilter(filters, row);
      if (match) {
        return FundingRaised._getRowAsObject(row);
      }
    }
    return null;
  }

  static _applyFilter(filters, row) {
    for (const { field, index } of filters) {
      if (row[index] !== field) {
        return false;
      }
    }
    return true;
  }

  static _createFilter(headers, options) {
    const filters = [];
    for (const opt in options) {
      const field = options[opt];
      const index = headers.indexOf(opt);
      if (index < 0) {
        continue;
      }
      filters.push({ field, index });
    }
    return filters;
  }

  static _getRowAsObject(row) {
    return {
      permalink: row[0],
      company_name: row[1],
      number_employees: row[2],
      category: row[3],
      city: row[4],
      state: row[5],
      funded_date: row[6],
      raised_amount: row[7],
      raised_currency: row[8],
      round: row[9]
    };
  }
}

module.exports = FundingRaised;
