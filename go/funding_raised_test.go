package fundingraised

import "testing"

func TestWhereGivenCompany(t *testing.T) {
	options := map[string]string{
		"company_name": "Facebook",
	}

	rows := len(Where(options))
	if rows != 7 {
		t.Error("Expected 7 rows. Got ", rows)
	}
}

func TestWhereCorrectKeys(t *testing.T) {
	options := map[string]string{
		"company_name": "Facebook",
	}

	rows := Where(options)
	row := rows[0]

	if row["permalink"] != "facebook" {
		t.Error("Expected permalink to be facebook. Got", row["permalink"])
	}

	if row["company_name"] != "Facebook" {
		t.Error("Expected company name to be Facebook. Got", row["company_name"])
	}

	if row["number_employees"] != "450" {
		t.Error("Expected number of employees to be 450. Got", row["number_employees"])
	}

	if row["category"] != "web" {
		t.Error("Expected category to be web. Got", row["category"])
	}

	if row["city"] != "Palo Alto" {
		t.Error("Expected city to be Palo Alto. Got", row["city"])
	}

	if row["state"] != "CA" {
		t.Error("Expected state to be CA. Got", row["state"])
	}

	if row["funded_date"] != "1-Sep-04" {
		t.Error("Expected funded date to be 1-Sep-04. Got", row["funded_date"])
	}

	if row["raised_amount"] != "500000" {
		t.Error("Expected raised amount to be 500000. Got", row["raised_amount"])
	}

	if row["round"] != "angel" {
		t.Error("Expected round to be angel. Got", row["round"])
	}
}

func TestWhereGivenCity(t *testing.T) {
	options := map[string]string{
		"city": "Tempe",
	}

	rows := len(Where(options))
	if rows != 3 {
		t.Error("Expected 3 rows having city == Tempe. Got", rows)
	}
}

func TestWhereGivenState(t *testing.T) {
	options := map[string]string{
		"state": "CA",
	}

	rows := len(Where(options))
	if rows != 873 {
		t.Error("Expected 873 rows having state == CA. Got", rows)
	}
}

func TestWhereGivenRound(t *testing.T) {
	options := map[string]string{
		"round": "a",
	}

	rows := len(Where(options))
	if rows != 582 {
		t.Error("Expected 582 rows having round == a. Got", rows)
	}
}

func TestWhereMultipleOptions(t *testing.T) {
	options := map[string]string{
		"company_name": "Facebook",
		"round":        "a",
	}

	rows := len(Where(options))
	if rows != 1 {
		t.Error("Expected 1 row having company name == Facebook and round == a. Got", rows)
	}
}

func TestWhereNonExistence(t *testing.T) {
	options := map[string]string{
		"company_name": "NotFacebook",
	}

	rows := len(Where(options))
	if rows != 0 {
		t.Error("Expected an empty list. Got", rows)
	}
}

func TestFindByGivenCompanyName(t *testing.T) {
	options := map[string]string{
		"company_name": "Facebook",
	}

	row, err := FindBy(options)

	if err != nil {
		t.Error("Expected FindBy to return no errors")
	}

	if row["permalink"] != "facebook" {
		t.Error("Expected permalink to be facebook. Got", row["permalink"])
	}

	if row["company_name"] != "Facebook" {
		t.Error("Expected company name to be Facebook. Got", row["company_name"])
	}

	if row["number_employees"] != "450" {
		t.Error("Expected number of employees to be 450. Got", row["number_employees"])
	}

	if row["category"] != "web" {
		t.Error("Expected category to be web. Got", row["category"])
	}

	if row["city"] != "Palo Alto" {
		t.Error("Expected city to be Palo Alto. Got", row["city"])
	}

	if row["state"] != "CA" {
		t.Error("Expected state to be CA. Got", row["state"])
	}

	if row["funded_date"] != "1-Sep-04" {
		t.Error("Expected funded date to be 1-Sep-04. Got", row["funded_date"])
	}

	if row["raised_amount"] != "500000" {
		t.Error("Expected raised amount to be 500000. Got", row["raised_amount"])
	}

	if row["raised_currency"] != "USD" {
		t.Error("Expected raised currency to be USD. Got", row["raised_currency"])
	}

	if row["round"] != "angel" {
		t.Error("Expected round to be angel. Got", row["round"])
	}
}

func TestFindByGivenState(t *testing.T) {
	options := map[string]string{
		"state": "CA",
	}

	row, err := FindBy(options)

	if err != nil {
		t.Error("Expected FindBy to return no errors")
	}

	if row["permalink"] != "digg" {
		t.Error("Expected permalink to be digg. Got", row["permalink"])
	}

	if row["company_name"] != "Digg" {
		t.Error("Expected company name to be Digg. Got", row["company_name"])
	}

	if row["number_employees"] != "60" {
		t.Error("Expected number of employees to be 60. Got", row["number_employees"])
	}

	if row["category"] != "web" {
		t.Error("Expected category to be web. Got", row["category"])
	}

	if row["city"] != "San Francisco" {
		t.Error("Expected city to be San Francisco. Got", row["city"])
	}

	if row["state"] != "CA" {
		t.Error("Expected state to be CA. Got", row["state"])
	}

	if row["funded_date"] != "1-Dec-06" {
		t.Error("Expected funded date to be 1-Dec-06. Got", row["funded_date"])
	}

	if row["raised_amount"] != "8500000" {
		t.Error("Expected raised amount to be 8500000. Got", row["raised_amount"])
	}

	if row["raised_currency"] != "USD" {
		t.Error("Expected raised currency to be USD. Got", row["raised_currency"])
	}

	if row["round"] != "b" {
		t.Error("Expected round to be b. Got", row["round"])
	}
}

func TestFindByMultipleOptions(t *testing.T) {
	options := map[string]string{
		"company_name": "Facebook",
		"round":        "c",
	}

	row, err := FindBy(options)

	if err != nil {
		t.Error("Expected FindBy to return no errors")
	}

	if row["permalink"] != "facebook" {
		t.Error("Expected permalink to be facebook. Got", row["permalink"])
	}

	if row["company_name"] != "Facebook" {
		t.Error("Expected company name to be Facebook. Got", row["company_name"])
	}

	if row["number_employees"] != "450" {
		t.Error("Expected number of employees to be 450. Got", row["number_employees"])
	}

	if row["category"] != "web" {
		t.Error("Expected category to be web. Got", row["category"])
	}

	if row["city"] != "Palo Alto" {
		t.Error("Expected city to be Palo Alto. Got", row["city"])
	}

	if row["state"] != "CA" {
		t.Error("Expected state to be CA. Got", row["state"])
	}

	if row["funded_date"] != "1-Oct-07" {
		t.Error("Expected funded date to be 1-Oct-07. Got", row["funded_date"])
	}

	if row["raised_amount"] != "300000000" {
		t.Error("Expected raised amount to be 300000000. Got", row["raised_amount"])
	}

	if row["raised_currency"] != "USD" {
		t.Error("Expected raised currency to be USD. Got", row["raised_currency"])
	}

	if row["round"] != "c" {
		t.Error("Expected round to be c. Got", row["round"])
	}
}

func TestFindByNonExistence(t *testing.T) {
	options := map[string]string{
		"company_name": "NotFacebook",
	}

	_, err := FindBy(options)

	if err == nil {
		t.Error("Expected FindBy to return an error")
	}
}
