package com.checkr.interviews;

import java.util.*;
import com.opencsv.CSVReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

class NoSuchEntryException extends Exception {}

public class FundingRaised {
    private static final String[] headings = {"permalink", "company_name", "number_employees", "category", "city", "state", "funded_date", "raised_amount", "raised_currency", "round"};
    private static final String CSV_FILE_NAME = "startup_funding.csv";
    public static List<Map<String, String>> where(Map<String, String> options) throws IOException {
        List<String[]> csvData = getCSVDataWithoutHeading();
        csvData = where(getQueryOptions(getAvailableOptions() , options) , options , csvData);
        return getMappedOutput(csvData);
    }

    private static List<Map<String, String>> getMappedOutput(List<String[]> csvData) {
        return csvData.stream().map(FundingRaised::getCSVDataMap).collect(Collectors.toList());
    }

    private static Map<String, String> getCSVDataMap(String[] csvData) {
        Map<String, String> mapped = new HashMap<>();
        IntStream.range(0, headings.length)
                        .forEach(index -> mapped.put(headings[index], csvData[index]));
        return mapped;
    }

    private static void removeHeading(List<String[]> csvData) {
        csvData.remove(0);
    }

    private static Map<String, Integer> getQueryOptions(Map<String, Integer> availableOptions, Map<String, String> options) {
        return options.entrySet().stream()
                .filter(entry -> availableOptions.containsKey(entry.getKey())) // Avoid null values
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> availableOptions.get(entry.getKey()), // Get Integer value
                        (a, b) -> b, // Merge function (not needed unless duplicates exist)
                        TreeMap::new // Ensure sorting (if required)
                ));
    }

    private static Map<String , Integer> getAvailableOptions() {
        Map<String , Integer> optionIndexMap = new TreeMap<>();
        optionIndexMap.put("company_name" , 1);
        optionIndexMap.put("city" , 4);
        optionIndexMap.put("state" , 5);
        optionIndexMap.put("round" , 9);
        return optionIndexMap;
    }

    private static List<String[]> where(Map<String, Integer> queryOptions, Map<String, String> options, List<String[]> csvData) {
        return csvData.stream().filter(data -> ifAllMatch(data , queryOptions, options)).collect(Collectors.toList());
    }

    private static boolean ifAllMatch(String[] rowData, Map<String, Integer> queryOptions, Map<String, String> options) {
       return queryOptions.entrySet().stream().allMatch(entry -> rowData[entry.getValue()].equals(options.get(entry.getKey())));
    }

    private static boolean ifAnyMatch(String[] rowData, Map<String, Integer> queryOptions) {
        return queryOptions.entrySet().stream().anyMatch(entry -> rowData[entry.getValue()].equals(entry.getKey()));
    }

    private static List<String[]> readCSVFile() throws IOException {
        List<String[]> csvData = new ArrayList<>();
        CSVReader reader = new CSVReader(new FileReader(CSV_FILE_NAME));
        String[] row = null;
        while((row = reader.readNext()) != null) {
            csvData.add(row);
        }
        reader.close();
        return csvData;
    }

    public static Map<String, String> findBy(Map<String, String> options) throws IOException, NoSuchEntryException {
        List<String[]> csvData = getCSVDataWithoutHeading();
        Map<String, String> output = findBy(getQueryOptions(getAvailableOptions() , options) , csvData);
        if(output.isEmpty()) {
            throw new NoSuchEntryException();
        }
        return output;
    }

    private static List<String[]> getCSVDataWithoutHeading() throws IOException {
        List<String[]> csvData = readCSVFile();
        removeHeading(csvData);
        return csvData;
    }

    public static Map<String, String> findBy(Map<String, Integer> options, List<String[]> csvData) {
        Map<String, String> csvDataMap = new HashMap<>();
        csvData.stream().filter(data -> ifAnyMatch(data, options))
                .map(FundingRaised::getCSVDataMap)
                .forEach(csvDataMap::putAll);
        return csvDataMap;
    }

    public static void main(String[] args) {
        try {
            Map<String, String> options = new HashMap<> ();
            options.put("company_name", "Facebook");
            options.put("round", "a");
            System.out.print(FundingRaised.where(options).size());
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }
}


