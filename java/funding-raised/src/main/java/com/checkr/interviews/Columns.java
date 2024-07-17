package com.acme.interviews;

public enum Columns {
    PERMALINK("permalink", 0),
    COMPANY_NAME("company_name", 1),
    NUMBER_EMPLOYEES("number_employees", 2),
    CATEGORY("category", 3),
    CITY("city", 4),
    STATE("state", 5),
    FUNDED_DATE("funded_date", 6),
    RAISED_AMOUNT("raised_amount", 7),
    RAISED_CURRENCY("raised_currency", 8),
    ROUND("round", 9);

    private String columnName;
    private int order;

    Columns(String columnName, int order) {
        this.columnName = columnName;
        this.order = order;
    }

    public String getColumnName() {
        return columnName;
    }

    public int getOrder() {
        return order;
    }
}