const parseCsvSync = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');


function parseFile(filename) {
  const filepath = fs.readFileSync(path.join(__dirname, '..', filename)).toString()
  return parseCsvSync(filepath);
}

class FundingRaised {
  static getRowAsObject(headers, row) {
    return headers.reduce((accumulator, headerName, index) => {
      accumulator[headerName] = row[index];
      return accumulator;
    }, {});
  }

  static where(options = {}) {
    const rows = parseFile('startup_funding.csv');
    const headers = rows[0];
    let csv_data = rows.slice(1);

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

    return csv_data.map(row => FundingRaised.getRowAsObject(headers, row));
  }

  static findBy(options = {}) {
    const rows = parseFile('startup_funding.csv');
    const headers = rows[0];
    let csv_data = rows.slice(1);

    if (options.company_name) {
      csv_data = csv_data.filter(row => options.company_name == row[1]);
      return FundingRaised.getRowAsObject(headers, csv_data[0]);
    }

    if (options.city) {
      csv_data = csv_data.filter(row => options.city == row[4]);
     return FundingRaised.getRowAsObject(headers, csv_data[0]);
    }

    if (options.state) {
      csv_data = csv_data.filter(row => options.state == row[5]);
     return FundingRaised.getRowAsObject(headers, csv_data[0]);
    }

    if (options.round) {
      csv_data = csv_data.filter(row => options.round == row[9]);
     return FundingRaised.getRowAsObject(headers, csv_data[0]);
    }
  }
}

module.exports = FundingRaised;
