require 'csv'
require 'rspec'
require 'rspec/expectations'
require 'pry'

class FundingRaised
  def self.where(options = {})
    csv_data = CSV.read("../startup_funding.csv")

    @funding = []
    if options[:company_name]
      csv_data.select! do |row|
        row[1] == options.fetch(:company_name)
      end
    end

    if options[:city]
      csv_data.select! do |row|
        row[4] == options.fetch(:city)
      end
    end

    if options[:state]
      csv_data.select! do |row|
        row[5] == options.fetch(:state)
      end
    end

    if options[:round]
      csv_data.select! do |row|
        row[9] == options.fetch(:round)
      end
    end

    @output = []
    csv_data.each do |row|
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
      @output << mapped
    end

    @output
  end

  def self.find_by(options)
    csv_data = CSV.read("../startup_funding.csv")

    if options[:company_name]
      csv_data.each do |row|
        if row[1] == options.fetch(:company_name)
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
        end
      end
    end

    if options[:city]
      csv_data.each do |row|
        if row[4] == options.fetch(:city)
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
        end
      end
    end

    if options[:state]
      csv_data.each do |row|
        if row[5] == options.fetch(:state)
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
        end
      end
    end

    if options[:round]
      csv_data.each do |row|
        if row[9] == options.fetch(:round)
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
        end
      end
    end

    raise RecordNotFound
  end
end

class RecordNotFound < StandardError
end
