// Copyright (c) 2024, Misma and contributors
// For license information, please see license.txt
/* eslint-disable */

// frappe.query_reports["Employee Hierarchy"] = {
// 	"filters": [

// 	]
// };
frappe.query_reports["Employee Hierarchy"] = {
    "filters": [
        {
            "fieldname": "emp_id",
            "label": __("Employee ID"),
            "fieldtype": "Data",
        },
        {
            "fieldname": "employee_name",
            "label": __("Employee Name"),
            "fieldtype": "Data",
        },
        {
            "fieldname": "role",
            "label": __("Role"),
            "fieldtype": "Select",
            "options": "\nGeneral Manager\nZonal Manager\nRegional Manager\nArea Manager\nTelecaller"
        },
        {
            "fieldname": "department",
            "label": __("Department"),
            "fieldtype": "Data",
        },
        {
            "fieldname": "reports_to",
            "label": __("Reports To"),
            "fieldtype": "Data",
        },
        {
            "fieldname": "active",
            "label": __("Active"),
            "fieldtype": "Data",
        }
    ]
};
