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
      const mapped = FundingRaised._getRowAsObject(row);
      funding_data.push(mapped);
    });

    return funding_data;
  }

  static asyncWhere() {
    return Promise.resolve(FundingRaised.where(...arguments));
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

  static findBy(options = {}) {
    const [headers, ...rows] = parseCsv('startup_funding.csv');
    let csv_data = rows;

    if (options.company_name) {
      csv_data = csv_data.filter(row => options.company_name == row[1]);
      const row = csv_data[0];
      const mapped = FundingRaised._getRowAsObject(row);
      return mapped;
    }

    if (options.city) {
      csv_data = csv_data.filter(row => options.city == row[4]);
      const row = csv_data[0];
      const mapped = FundingRaised._getRowAsObject(row);
      return mapped;
    }

    if (options.state) {
      csv_data = csv_data.filter(row => options.state == row[5]);
      const row = csv_data[0];
      const mapped = FundingRaised._getRowAsObject(row);
      return mapped;
    }

    if (options.round) {
      csv_data = csv_data.filter(row => options.round == row[9]);
      const row = csv_data[0];
      const mapped = FundingRaised._getRowAsObject(row);
      return mapped;
    }
  }
}

module.exports = FundingRaised;
