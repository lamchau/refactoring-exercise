const parseCsvSync = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');

class FundingRaised {
  static _parseFile(filename, options) {
    const filepath = fs.readFileSync(path.join(__dirname, '..', filename)).toString()
    const rows = parseCsvSync(filepath);
    const headers = rows[0];

    return Object.freeze({
      filters: FundingRaised._createFilters(headers, options),
      headers,
      rows: rows.slice(1)
    });
  }

  static _createFilters(headers, options = {}) {
    const filter = [];
    for (const name in options) {
      filter.push({
        value: options[name],
        index: headers.indexOf(name)
      })
    }
    return filter;
  }

  static _getRowAsObject(headers, row) {
    return row.reduce((object, value, index) => {
      const headerName = headers[index];
      object[headerName] = value;
      return object;
    }, {});
  }

  static where(options = {}) {
    const {
      headers,
      rows,
      filters
    } = FundingRaised._parseFile('startup_funding.csv', options);

    return rows
      .filter(row => {
        return filters.reduce((match, filter) => {
          const { value, index } = filter;
          return match && row[index] == value;
        }, true);
      })
      .map(row => FundingRaised._getRowAsObject(headers, row));
  }

  static findBy(options = {}) {
    const {
      headers,
      rows,
      filters
    } = FundingRaised._parseFile('startup_funding.csv', options);

    for (const row of rows) {
      const match = filters.reduce((accumulator, filter) => {
        const { value, index } = filter;
        return accumulator && row[index] == value;
      }, true);
      if (match) {
        return FundingRaised._getRowAsObject(headers, row);
      }
    }
    return null;
  }
}

module.exports = FundingRaised;
