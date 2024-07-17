package com.acme.interviews;

import java.util.*;

import com.opencsv.CSVReader;

import java.io.FileReader;
import java.io.IOException;

public class FundingRaised {
    public static List<Map<String, String>> where(Map<String, String> options) throws IOException {
        List<String[]> csvData = readCSVFile("startup_funding.csv");

        for (Columns c : Columns.values()) {
            if (options.containsKey(c.getColumnName())) {
                csvData = fındOptions(c, options.get(c.getColumnName()), csvData);
            }
        }
        return constructResultMap(csvData);
    }

    public static Map<String, String> findBy(Map<String, String> options) throws IOException, NoSuchEntryException {
        List<String[]> csvData = readCSVFile("startup_funding.csv");

        Map<String, String> mapped = new HashMap<String, String>();
        for (int i = 0; i < csvData.size(); i++) {
            mapped = foundData(options, csvData.get(i));
            if (mapped.isEmpty()) {
                continue;
            }
            return mapped;
        }
        throw new NoSuchEntryException();
    }

    public static void main(String[] args) {
        try {
            Map<String, String> options = new HashMap<String, String>();
            options.put("company_name", "Facebook");
            options.put("round", "a");
            System.out.print(FundingRaised.where(options).size());
        } catch (IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    private static List<String[]> readCSVFile(String fileName) throws IOException {
        CSVReader reader = new CSVReader(new FileReader(fileName));
        String[] row = reader.readNext();
        List<String[]> csvData = new ArrayList<String[]>();

        while (row != null) {
            csvData.add(row);
            row = reader.readNext();
        }
        reader.close();
        if (csvData.size() > 0) {
            csvData.remove(0);
        }
        return csvData;
    }

    private static List<String[]> fındOptions(Columns column, String value, List<String[]> csvData) {
        List<String[]> results = new ArrayList<>();
        for (int i = 0; i < csvData.size(); i++) {
            if (csvData.get(i)[column.getOrder()].equals(value)) {
                results.add(csvData.get(i));
            }
        }
        return results;
    }

    private static List<Map<String, String>> constructResultMap(List<String[]> csvData) {
        List<Map<String, String>> output = new ArrayList<>();
        for (int i = 0; i < csvData.size(); i++) {
            output.add(putColumns(csvData.get(i)));
        }
        return output;
    }

    private static Map<String, String> putColumns(String[] csvData) {
        Map<String, String> mapped = new HashMap<>();
        for (Columns c : Columns.values()) {
            mapped.put(c.getColumnName(), csvData[c.getOrder()]);
        }
        return mapped;
    }

    private static Map<String, String> foundData(Map<String, String> options, String[] csvData) {
        Map<String, String> mapped = new HashMap<>();
        int foundTimes = 0;
        for (Columns c : Columns.values()) {
            if(options.containsKey(c.getColumnName())){
                if(csvData[c.getOrder()].equals(options.get(c.getColumnName()))){
                    mapped = putColumns(csvData);
                    foundTimes++;
                } else {
                    break;
                }
            }
        }

        return foundTimes == options.size() ? mapped : new HashMap<>();
    }
}

class NoSuchEntryException extends Exception {
}
