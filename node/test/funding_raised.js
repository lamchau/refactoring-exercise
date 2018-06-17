const assert = require('chai').assert;

const FundingRaised = require('../funding_raised');

describe('FundingRaised', () => {
  describe('#where', () => {
    describe('company_name is Facebook', () => {
      const rows = FundingRaised.where({company_name: 'Facebook'});
      const row = rows[0];

      it('returns 7 results', () => {
        assert.lengthOf(rows, 7);
      });

      it('returns the permalink key', () => {
        assert.equal(row.permalink, 'facebook');
      });

      it('returns the company_name key', () => {
        assert.equal(row.company_name, 'Facebook');
      });

      it('returns the number_employees key', () => {
        assert.equal(row.number_employees, '450');
      });

      it('returns the category key', () => {
        assert.equal(row.category, 'web');
      });

      it('returns the city key', () => {
        assert.equal(row.city, 'Palo Alto');
      });

      it('returns the state key', () => {
        assert.equal(row.state, 'CA');
      });

      it('returns the funded_date key', () => {
        assert.equal(row.funded_date, '1-Sep-04');
      });
    });

    describe('city is Tempe', () => {
      const rows = FundingRaised.where({city: 'Tempe'});

      it('returns 3 results', () => {
        assert.lengthOf(rows, 3);
      });
    });

    describe('state is CA', () => {
      const rows = FundingRaised.where({state: 'CA'});

      it('returns 873 results', () => {
        assert.lengthOf(rows, 873);
      });
    });

    describe('company_name is Facebook and round is a', () => {
      const rows = FundingRaised.where({company_name: 'Facebook', round: 'a'});

      it('returns 1 result', () => {
        assert.lengthOf(rows, 1);
      });
    });
  });

  describe('#findBy', () => {
    describe('company_name is Facebook', () => {
      const row = FundingRaised.findBy({company_name: 'Facebook'});

      it('returns the permalink key', () => {
        assert.equal(row.permalink, 'facebook');
      });
    });

    describe('state is CA', () => {
      const row = FundingRaised.findBy({state: 'CA'});

      it('returns the permalink key', () => {
        assert.equal(row.permalink, 'digg');
      });

      it('returns the number_employees key', () => {
        assert.equal(row.number_employees, 60);
      });

      it('returns the round key', () => {
        assert.equal(row.round, 'b');
      });
    });

    //
    // Pending tests that currently fail (change xit => it)
    //
    describe('company_name is YouTube and round is b', () => {
      const row = FundingRaised.findBy({company_name: 'YouTube', round: 'b'});

      xit('returns correct result', () => {
        assert.equal(row.round, 'b');
      });
    });

    describe('async', () => {
      xit('returns a promise instead of results', () => {
        return FundingRaised.asyncWhere({company_name: 'Facebook', round: 'a'})
          .then((rows) => {
            assert.lengthOf(rows, 1);
          })
      });
    });
  });
});
