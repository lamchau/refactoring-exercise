const parseCsvSync = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');

class FundingRaised {
  static findBy(options = {}) {
    const {
      headers,
      rows,
      filters
    } = FundingRaised._parseFile('startup_funding.csv', options);

    for (const row of rows) {
      const match = FundingRaised._applyFilter(filters, row);
      if (match) {
        return FundingRaised._getRowAsObject(headers, row);
      }
    }
    return null;
  }

  static where(options = {}) {
    const {
      headers,
      rows,
      filters
    } = FundingRaised._parseFile('startup_funding.csv', options);

    return rows
      .filter(row => FundingRaised._applyFilter(filters, row))
      .map(row => FundingRaised._getRowAsObject(headers, row));
  }

  static _applyFilter(filters, row) {
    return filters.reduce((match, filter) => {
      const { value, index } = filter;
      return match && row[index] === value;
    }, true);
  }

  static _getRowAsObject(headers, row) {
    return row.reduce((object, value, index) => {
      const headerName = headers[index];
      object[headerName] = value;
      return object;
    }, {});
  }

  static _parseFile(filename, options) {
    const filepath = fs.readFileSync(path.join(__dirname, '..', filename)).toString()
    const rows = parseCsvSync(filepath);
    const headers = rows[0];

    return Object.freeze({
      headers,
      filters: FundingRaised._createFilters(headers, options),
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
}

module.exports = FundingRaised;
