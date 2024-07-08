# Copyright (c) 2024, Misma and contributors
# For license information, please see license.txt

import frappe
from frappe import _

def execute(filters=None):
    columns, data = [], []
    columns = get_columns()
    data = get_data()
    return columns, data

def get_columns():
    return [
        {"label": _("Employee ID"), "fieldname": "emp_id", "fieldtype": "Data", "width": 200},
        {"label": _("Employee Name"), "fieldname": "employee_name", "fieldtype": "Data", "width": 200},
        {"label": _("Role"), "fieldname": "role", "fieldtype": "Select", "options": "\nGeneral Manager\nZonal Manager\nRegional Manager\nArea Manager\nTelecaller", "width": 150},
        {"label": _("Department"), "fieldname": "department", "fieldtype": "Data", "width": 200},
        {"label": _("Reports To"), "fieldname": "reports_to", "fieldtype": "Data", "width": 200},
        {"label": _("Active"), "fieldname": "active", "fieldtype": "Data", "width": 200},
    ]

def get_data():
    roles_hierarchy = ["General Manager", "Zonal Manager", "Regional Manager", "Area Manager", "Telecaller"]
    data = []

    for role in roles_hierarchy:
        employees = frappe.get_all("Employee Hierarchy", filters={"role": role}, fields=["emp_id", "employee_name", "role", "department", "reports_to", "active"])
        for emp in employees:
            data.append({
                "emp_id": emp.emp_id,
                "employee_name": emp.employee_name,
                "role": emp.role,
                "department": emp.department,
                "reports_to": emp.reports_to,
                "active": emp.active
            })
    
    return data

