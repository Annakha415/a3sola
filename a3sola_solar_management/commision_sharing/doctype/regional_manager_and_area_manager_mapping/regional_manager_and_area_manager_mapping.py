# Copyright (c) 2024, Misma and contributors
# For license information, please see license.txt

# import frappe

# @frappe.whitelist()
# def get_managers(role_type):
#     # Query and return managers based on role type from User Hierarchy doctype
#     users = frappe.get_all('Employee Hierarchy', filters={'role': role_type}, fields=['user'])
#     return [user.user for user in users]