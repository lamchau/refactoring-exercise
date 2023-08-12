from funding_raised import FundingRaised, RecordNotFound
import pytest


class TestRetrieveStartupFunding:

    def test_with_company_name_returns_list(self):
        """Ensure we retrieve list of companies by name"""
        assert len(FundingRaised.retrieve_startup_funding({'company_name': 'Facebook'})) == 7

    def test_with_company_name_and_keys_returns_one_company(self):
        """Ensure we retrieve the firs result with key 0"""
        row = FundingRaised.retrieve_startup_funding({'company_name': 'Facebook'})[0]
        keys = ['permalink', 'company_name', 'number_employees', 'category', 'city',
                'state', 'funded_date', 'raised_amount', 'raised_currency', 'round']
        values = ['facebook', 'Facebook', '450', 'web', 'Palo Alto', 'CA', '1-Sep-04',
                  '500000', 'USD', 'angel']
        for i in range(0, len(keys)):
            assert row[keys[i]] == values[i]

    def test_with_city_returns_list(self):
        """Ensure we retrieve list of companies by city"""
        assert len(FundingRaised.retrieve_startup_funding({'city': 'Tempe'})) == 3

    def test_with_state_returns_lit(self):
        """Ensure we retrieve list of companies by state"""
        assert len(FundingRaised.retrieve_startup_funding({'state': 'CA'})) == 873

    def test_with_round_returns_list(self):
        """Ensure we retrieve list of companies by round"""
        assert len(FundingRaised.retrieve_startup_funding({'round': 'a'})) == 582

    def test_with_2_parameters_returns_list(self):
        """Ensure we can pass several parameters"""
        assert len(FundingRaised.retrieve_startup_funding({'company_name': 'Facebook', 'round': 'a'})) == 1

    def test_with_company_name_not_found_raise_error(self):
        """Ensure we raie an error if no result found"""
        with pytest.raises(RecordNotFound) as e:
            assert len(FundingRaised.retrieve_startup_funding({'company_name': 'NotFacebook'})) == 0
        assert e.value.args[0] == "No record where found with parameter company_name"

    def test_with_bad_parameter_raise_error(self):
        """Ensure we raise an error if a bad parameter is sent"""
        with pytest.raises(RecordNotFound) as e:
            FundingRaised.retrieve_startup_funding({'name': 'Facebook'})
        assert e.value.args[0] == "No record where found with parameter name"
