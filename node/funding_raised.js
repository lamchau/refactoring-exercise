const parseCsvSync = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');

class FundingRaised {
  static _parseFile(filename) {
    const filepath = fs.readFileSync(path.join(__dirname, '..', filename)).toString()
    const rows = parseCsvSync(filepath);
    const headers = rows[0];

    FundingRaised.HEADERS = Object.freeze({
      toIndex(headerName) {
        return headers.indexOf(headerName);
      },
      toName(index) {
        return headers[index];
      }
    });
    return rows.slice(1);
  }

  static createFilters(options = {}) {
    const filter = [];
    for (const name in options) {
      filter.push({
        value: options[name],
        index: FundingRaised.HEADERS.toIndex(name)
      })
    }
    return filter;
  }

  static _getRowAsObject(row) {
    return row.reduce((object, value, index) => {
      const headerName = FundingRaised.HEADERS.toName(index);
      object[headerName] = value;
      return object;
    }, {});
  }

  static where(options = {}) {
    const rows = FundingRaised._parseFile('startup_funding.csv');
    const filters = FundingRaised.createFilters(options);

    return rows
      .filter(row => {
        return filters.reduce((match, filter) => {
          const { value, index } = filter;
          return match && row[index] == value;
        }, true);
      })
      .map(FundingRaised._getRowAsObject);
  }

  static findBy(options = {}) {
    const rows = FundingRaised.where(options);
    return rows.length === 0 ? rows : rows[0];
  }
}

module.exports = FundingRaised;
