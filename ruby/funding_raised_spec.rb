require_relative 'funding_raised'

RSpec.configure do |config|
  config.color = true
end

RSpec.describe FundingRaised do
  describe '.where' do
    describe 'company_name is Facebook' do
      let(:rows) { FundingRaised.where(company_name: 'Facebook') }
      let(:row) { rows[0] }

      it 'returns the fund raising events for a given company' do
        expect(rows.size).to eq(7)
      end

      it 'returns the correct key' do
        expect(row['permalink']).to eq('facebook')
      end

      it 'returns the correct key' do
        expect(row['company_name']).to eq('Facebook')
      end

      it 'returns the correct key' do
        expect(row['number_employees']).to eq('450')
      end

      it 'returns the correct key' do
        expect(row['category']).to eq('web')
      end

      it 'returns the correct key' do
        expect(row['city']).to eq('Palo Alto')
      end

      it 'returns the correct key' do
        expect(row['state']).to eq('CA')
      end

      it 'returns the correct key' do
        expect(row['funded_date']).to eq('1-Sep-04')
      end

      it 'returns the correct key' do
        expect(row['raised_amount']).to eq('500000')
      end

      it 'returns the correct key' do
        expect(row['raised_currency']).to eq('USD')
      end

      it 'returns the correct key' do
        expect(row['round']).to eq('angel')
      end
    end

    describe 'city is Tempe' do
      it 'returns the fund raising events for Tempe' do
        expect(FundingRaised.where(city: 'Tempe').size).to eq(3)
      end
    end

    describe 'state is CA' do
      it 'returns the fund raising events for CA' do
        expect(FundingRaised.where(state: 'CA').size).to eq(873)
      end
    end

    describe 'company_name is Facebook and Round is A' do
      it 'returns the fund raising events for a given company' do
        expect(FundingRaised.where(company_name: 'Facebook', round: 'a').size).to eq(1)
      end
    end

    describe 'Round is A' do
      it 'returns the fund raising events for a given type' do
        expect(FundingRaised.where(round: 'a').size).to eq(582)
      end
    end

    describe 'company_name does not exist' do
      it 'returns an empty array' do
        expect(FundingRaised.where(company_name: 'NotFacebook').size).to eq(0)
      end
    end

    describe 'extra credit' do
      pending 'allows chaining of where methods' do
        expect(FundingRaised.where(company_name: 'Facebook').where(round: 'a').size).to eq(1)
      end
    end
  end

  describe '.find_by' do
    describe 'company_name is Facebook' do
      let(:row) { FundingRaised.find_by(company_name: 'Facebook') }

      it 'returns the first fund raising event for a given company name' do
        expect(row['permalink']).to eq('facebook')
      end

      it 'returns the first fund raising event for a given company name' do
        expect(row['company_name']).to eq('Facebook')
      end

      it 'returns the first fund raising event for a given company name' do
        expect(row['number_employees']).to eq('450')
      end

      it 'returns the first fund raising event for a given company name' do
        expect(row['category']).to eq('web')
      end

      it 'returns the first fund raising event for a given company name' do
        expect(row['city']).to eq('Palo Alto')
      end

      it 'returns the first fund raising event for a given company name' do
        expect(row['state']).to eq('CA')
      end

      it 'returns the first fund raising event for a given company name' do
        expect(row['funded_date']).to eq('1-Sep-04')
      end

      it 'returns the first fund raising event for a given company name' do
        expect(row['raised_amount']).to eq('500000')
      end

      it 'returns the first fund raising event for a given company name' do
        expect(row['raised_currency']).to eq('USD')
      end

      it 'returns the first fund raising event for a given company name' do
        expect(row['round']).to eq('angel')
      end
    end

    describe 'state passed in is CA' do
      let(:row) { FundingRaised.find_by(state: 'CA') }

      it 'returns the first fund raising event' do
        expect(row['permalink']).to eq('digg')
      end

      it 'returns the first fund raising event' do
        expect(row['company_name']).to eq('Digg')
      end

      it 'returns the first fund raising event' do
        expect(row['number_employees']).to eq('60')
      end

      it 'returns the first fund raising event' do
        expect(row['category']).to eq('web')
      end

      it 'returns the first fund raising event' do
        expect(row['city']).to eq('San Francisco')
      end

      it 'returns the first fund raising event' do
        expect(row['state']).to eq('CA')
      end

      it 'returns the first fund raising event' do
        expect(row['funded_date']).to eq('1-Dec-06')
      end

      it 'returns the first fund raising event' do
        expect(row['raised_amount']).to eq('8500000')
      end

      it 'returns the first fund raising event' do
        expect(row['raised_currency']).to eq('USD')
      end

      it 'returns the first fund raising event' do
        expect(row['round']).to eq('b')
      end
    end
  end
end
