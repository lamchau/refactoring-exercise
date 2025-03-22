package com.checkr.interviews;
import java.util.*;
import java.io.IOException;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * Unit test for simple App.
 */
public class FundingRaisedTest
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public FundingRaisedTest ( String testName )
    {
        super( testName );
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( FundingRaisedTest.class );
    }

    /**
     * Rigourous Test :-)
     */
    public void testWhereGivenCompany() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("company_name", "Facebook");
            assertEquals(FundingRaised.where(options).size(), 7);
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    public void testWhereGivenCity() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("city", "Tempe");
            assertEquals(FundingRaised.where(options).size(), 3);
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    public void testWhereGivenState() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("state", "CA");
            assertEquals(FundingRaised.where(options).size(), 873);
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    public void testWhereGivenRound() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("round", "a");
            assertEquals(FundingRaised.where(options).size(), 582);
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    public void testMultipleOptions() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("round", "a");
            options.put("company_name", "Facebook");
            assertEquals(FundingRaised.where(options).size(), 1);
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    public void testWhereNotExists() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("company_name", "NotFacebook");
            assertEquals(FundingRaised.where(options).size(), 0);
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    public void testWhereCorrectKeys() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("company_name", "Facebook");
            Map<String, String> row = FundingRaised.where(options).get(0);

            assertEquals(row.get("permalink"), "facebook");
            assertEquals(row.get("company_name"), "Facebook");
            assertEquals(row.get("number_employees"), "450");
            assertEquals(row.get("category"), "web");
            assertEquals(row.get("city"), "Palo Alto");
            assertEquals(row.get("state"), "CA");
            assertEquals(row.get("funded_date"), "1-Sep-04");
            assertEquals(row.get("raised_amount"), "500000");
            assertEquals(row.get("round"), "angel");
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    public void testFindByGivenCompanyName() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("company_name", "Facebook");
            Map<String, String> row = FundingRaised.findBy(options);

            assertEquals(row.get("permalink"), "facebook");
            assertEquals(row.get("company_name"), "Facebook");
            assertEquals(row.get("number_employees"), "450");
            assertEquals(row.get("category"), "web");
            assertEquals(row.get("city"), "Palo Alto");
            assertEquals(row.get("state"), "CA");
            assertEquals(row.get("funded_date"), "1-Sep-04");
            assertEquals(row.get("raised_amount"), "500000");
            assertEquals(row.get("round"), "angel");
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        } catch(NoSuchEntryException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    public void testFindByGivenState() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("state", "CA");
            Map<String, String> row = FundingRaised.findBy(options);

            assertEquals(row.get("permalink"), "digg");
            assertEquals(row.get("company_name"), "Digg");
            assertEquals(row.get("number_employees"), "60");
            assertEquals(row.get("category"), "web");
            assertEquals(row.get("city"), "San Francisco");
            assertEquals(row.get("state"), "CA");
            assertEquals(row.get("funded_date"), "1-Dec-06");
            assertEquals(row.get("raised_amount"), "8500000");
            assertEquals(row.get("round"), "b");
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        } catch(NoSuchEntryException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    public void testFindByMultipleOptions() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("company_name", "Facebook");
            options.put("round", "c");
            Map<String, String> row = FundingRaised.findBy(options);

            assertEquals(row.get("permalink"), "facebook");
            assertEquals(row.get("company_name"), "Facebook");
            assertEquals(row.get("number_employees"), "450");
            assertEquals(row.get("category"), "web");
            assertEquals(row.get("city"), "Palo Alto");
            assertEquals(row.get("state"), "CA");
            assertEquals(row.get("funded_date"), "1-Oct-07");
            assertEquals(row.get("raised_amount"), "300000000");
            assertEquals(row.get("round"), "c");
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        } catch(NoSuchEntryException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        }
    }

    public void testFindByNotExists() {
        try {
            Map<String, String> options = new HashMap<String, String> ();
            options.put("company_name", "NotFacebook");
            options.put("round", "c");
            Map<String, String> row = FundingRaised.findBy(options);
            fail("findBy should throw exception");
        } catch(IOException e) {
            System.out.print(e.getMessage());
            System.out.print("error");
        } catch(NoSuchEntryException e) {
        }
    }
}
