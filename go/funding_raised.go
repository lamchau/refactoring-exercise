package fundingraised

import (
	"bufio"
	"encoding/csv"
	"errors"
	"io"
	"os"
)

func Where(options map[string]string) []map[string]string {
	f, _ := os.Open("../startup_funding.csv")
	reader := csv.NewReader(bufio.NewReader(f))
	csv_data := [][]string{}

	for {
		row, err := reader.Read()

		if err == io.EOF {
			break
		}

		csv_data = append(csv_data, row)
	}

	_, ok := options["company_name"]
	if ok == true {
		results := [][]string{}
		for i := 0; i < len(csv_data); i++ {
			if csv_data[i][1] == options["company_name"] {
				results = append(results, csv_data[i])
			}
		}
		csv_data = results
	}

	_, ok = options["city"]
	if ok == true {
		results := [][]string{}
		for i := 0; i < len(csv_data); i++ {
			if csv_data[i][4] == options["city"] {
				results = append(results, csv_data[i])
			}
		}
		csv_data = results
	}

	_, ok = options["state"]
	if ok == true {
		results := [][]string{}
		for i := 0; i < len(csv_data); i++ {
			if csv_data[i][5] == options["state"] {
				results = append(results, csv_data[i])
			}
		}
		csv_data = results
	}

	_, ok = options["round"]
	if ok == true {
		results := [][]string{}
		for i := 0; i < len(csv_data); i++ {
			if csv_data[i][9] == options["round"] {
				results = append(results, csv_data[i])
			}
		}
		csv_data = results
	}

	output := []map[string]string{}
	for i := 0; i < len(csv_data); i++ {
		mapped := make(map[string]string)
		mapped["permalink"] = csv_data[i][0]
		mapped["company_name"] = csv_data[i][1]
		mapped["number_employees"] = csv_data[i][2]
		mapped["category"] = csv_data[i][3]
		mapped["city"] = csv_data[i][4]
		mapped["state"] = csv_data[i][5]
		mapped["funded_date"] = csv_data[i][6]
		mapped["raised_amount"] = csv_data[i][7]
		mapped["raised_currency"] = csv_data[i][8]
		mapped["round"] = csv_data[i][9]
		output = append(output, mapped)
	}

	return output
}

func FindBy(options map[string]string) (map[string]string, error) {
	f, _ := os.Open("../startup_funding.csv")
	reader := csv.NewReader(bufio.NewReader(f))
	csv_data := [][]string{}

	for {
		row, err := reader.Read()

		if err == io.EOF {
			break
		}

		csv_data = append(csv_data, row)
	}

	for i := 0; i < len(csv_data); i++ {
		var ok bool
		mapped := make(map[string]string)

		_, ok = options["company_name"]
		if ok == true {
			if csv_data[i][1] == options["company_name"] {
				mapped["permalink"] = csv_data[i][0]
				mapped["company_name"] = csv_data[i][1]
				mapped["number_employees"] = csv_data[i][2]
				mapped["category"] = csv_data[i][3]
				mapped["city"] = csv_data[i][4]
				mapped["state"] = csv_data[i][5]
				mapped["funded_date"] = csv_data[i][6]
				mapped["raised_amount"] = csv_data[i][7]
				mapped["raised_currency"] = csv_data[i][8]
				mapped["round"] = csv_data[i][9]
			} else {
				continue
			}
		}

		_, ok = options["city"]
		if ok == true {
			if csv_data[i][4] == options["city"] {
				mapped["permalink"] = csv_data[i][0]
				mapped["company_name"] = csv_data[i][1]
				mapped["number_employees"] = csv_data[i][2]
				mapped["category"] = csv_data[i][3]
				mapped["city"] = csv_data[i][4]
				mapped["state"] = csv_data[i][5]
				mapped["funded_date"] = csv_data[i][6]
				mapped["raised_amount"] = csv_data[i][7]
				mapped["raised_currency"] = csv_data[i][8]
				mapped["round"] = csv_data[i][9]
			} else {
				continue
			}
		}

		_, ok = options["state"]
		if ok == true {
			if csv_data[i][5] == options["state"] {
				mapped["permalink"] = csv_data[i][0]
				mapped["company_name"] = csv_data[i][1]
				mapped["number_employees"] = csv_data[i][2]
				mapped["category"] = csv_data[i][3]
				mapped["city"] = csv_data[i][4]
				mapped["state"] = csv_data[i][5]
				mapped["funded_date"] = csv_data[i][6]
				mapped["raised_amount"] = csv_data[i][7]
				mapped["raised_currency"] = csv_data[i][8]
				mapped["round"] = csv_data[i][9]
			} else {
				continue
			}
		}

		_, ok = options["round"]
		if ok == true {
			if csv_data[i][9] == options["round"] {
				mapped["permalink"] = csv_data[i][0]
				mapped["company_name"] = csv_data[i][1]
				mapped["number_employees"] = csv_data[i][2]
				mapped["category"] = csv_data[i][3]
				mapped["city"] = csv_data[i][4]
				mapped["state"] = csv_data[i][5]
				mapped["funded_date"] = csv_data[i][6]
				mapped["raised_amount"] = csv_data[i][7]
				mapped["raised_currency"] = csv_data[i][8]
				mapped["round"] = csv_data[i][9]
			} else {
				continue
			}
		}

		return mapped, nil
	}

	return make(map[string]string), errors.New("Record Not Found")
}
