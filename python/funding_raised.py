import csv


class FundingRaised:
    @staticmethod
    def retrieve_startup_funding(options: dict = None) -> list:
        with open("../startup_funding.csv", "rt") as csvfile:
            dict_reader = csv.DictReader(csvfile)
            csv_data = list(dict_reader)
        if options is None:
            return csv_data
        result = []
        for data in csv_data:
            match = True
            for option, value in options.items():
                if option not in data or data[option] != value:
                    match = False
                    break
            if match:
                result.append(data)
        if len(result) == 0:
            raise RecordNotFound(f"No record where found with parameter {' '.join(options.keys())}")
        return result


class RecordNotFound(Exception):
    pass
