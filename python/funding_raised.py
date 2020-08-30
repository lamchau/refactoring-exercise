import csv

class FundingRaised:
  @staticmethod
  def where(options = {}):
    with open("../startup_funding.csv", "rt") as csvfile:
      data = csv.reader(csvfile, delimiter=',', quotechar='"')
      # skip header
      next(data)
      csv_data = []
      for row in data:
        csv_data.append(row)

    funding = []
    if 'company_name' in options:
      result = []
      for row in csv_data:
        if row[1] == options['company_name']:
          result.append(row)
      csv_data = result

    if 'city' in options:
      result = []
      for row in csv_data:
        if row[4] == options['city']:
          result.append(row)
      csv_data = result

    if 'state' in options:
      result = []
      for row in csv_data:
        if row[5] == options['state']:
          result.append(row)
      csv_data = result

    if 'round' in options:
      result = []
      for row in csv_data:
        if row[9] == options['round']:
          result.append(row)
      csv_data = result

    output = []
    for row in csv_data:
      mapped = {}
      mapped['permalink'] = row[0]
      mapped['company_name'] = row[1]
      mapped['number_employees'] = row[2]
      mapped['category'] = row[3]
      mapped['city'] = row[4]
      mapped['state'] = row[5]
      mapped['funded_date'] = row[6]
      mapped['raised_amount'] = row[7]
      mapped['raised_currency'] = row[8]
      mapped['round'] = row[9]
      output.append(mapped)

    return output

  @staticmethod
  def find_by(options):
    with open("../startup_funding.csv", "rt") as csvfile:
      data = csv.reader(csvfile, delimiter=',', quotechar='"')
      # skip header
      next(data)
      csv_data = []
      for row in data:
        csv_data.append(row)

    if 'company_name' in options:
      for row in csv_data:
        if row[1] == options['company_name']:
          mapped = {}
          mapped['permalink'] = row[0]
          mapped['company_name'] = row[1]
          mapped['number_employees'] = row[2]
          mapped['category'] = row[3]
          mapped['city'] = row[4]
          mapped['state'] = row[5]
          mapped['funded_date'] = row[6]
          mapped['raised_amount'] = row[7]
          mapped['raised_currency'] = row[8]
          mapped['round'] = row[9]
          return mapped

    if 'city' in options:
      for row in csv_data:
        if row[4] == options['city']:
          mapped = {}
          mapped['permalink'] = row[0]
          mapped['company_name'] = row[1]
          mapped['number_employees'] = row[2]
          mapped['category'] = row[3]
          mapped['city'] = row[4]
          mapped['state'] = row[5]
          mapped['funded_date'] = row[6]
          mapped['raised_amount'] = row[7]
          mapped['raised_currency'] = row[8]
          mapped['round'] = row[9]
          return mapped

    if 'state' in options:
      for row in csv_data:
        if row[5] == options['state']:
          mapped = {}
          mapped['permalink'] = row[0]
          mapped['company_name'] = row[1]
          mapped['number_employees'] = row[2]
          mapped['category'] = row[3]
          mapped['city'] = row[4]
          mapped['state'] = row[5]
          mapped['funded_date'] = row[6]
          mapped['raised_amount'] = row[7]
          mapped['raised_currency'] = row[8]
          mapped['round'] = row[9]
          return mapped

    if 'round' in options:
      for row in csv_data:
        if row[9] == options['round']:
          mapped = {}
          mapped['permalink'] = row[0]
          mapped['company_name'] = row[1]
          mapped['number_employees'] = row[2]
          mapped['category'] = row[3]
          mapped['city'] = row[4]
          mapped['state'] = row[5]
          mapped['funded_date'] = row[6]
          mapped['raised_amount'] = row[7]
          mapped['raised_currency'] = row[8]
          mapped['round'] = row[9]
          return mapped

    raise RecordNotFound

class RecordNotFound(Exception):
  pass
