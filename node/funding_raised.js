const parseCsvSync = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');

class FundingRaised {
  static _parseFile(filename) {
    const filepath = fs.readFileSync(path.join(__dirname, '..', filename)).toString()
    const rows = parseCsvSync(filepath);
    const headers = rows[0];

    FundingRaised.HEADERS = {
      toName(index) {
        return headers[index];
      }
    };
    return rows.slice(1);
  }

  static _getRowAsObject(row) {
    return row.reduce((object, value, index) => {
      const headerName = FundingRaised.HEADERS.toName(index);
      object[headerName] = value;
      return object;
    }, {});
  }

  static where(options = {}) {
    let rows = FundingRaised._parseFile('startup_funding.csv');

    if (options.company_name) {
      rows = rows.filter(row => options.company_name == row[1]);
    }

    if (options.city) {
      rows = rows.filter(row => options.city == row[4]);
    }

    if (options.state) {
      rows = rows.filter(row => options.state == row[5]);
    }

    if (options.round) {
      rows = rows.filter(row => options.round == row[9]);
    }

    return rows.map(row => FundingRaised._getRowAsObject(row));
  }

  static findBy(options = {}) {
    let rows = FundingRaised._parseFile('startup_funding.csv');

    if (options.company_name) {
      rows = rows.filter(row => options.company_name == row[1]);
      return FundingRaised._getRowAsObject(rows[0]);
    }

    if (options.city) {
      rows = rows.filter(row => options.city == row[4]);
     return FundingRaised._getRowAsObject(rows[0]);
    }

    if (options.state) {
      rows = rows.filter(row => options.state == row[5]);
     return FundingRaised._getRowAsObject(rows[0]);
    }

    if (options.round) {
      rows = rows.filter(row => options.round == row[9]);
     return FundingRaised._getRowAsObject(rows[0]);
    }
  }
}

module.exports = FundingRaised;
