import frappe
from frappe import _

def execute(filters=None):
    if not filters:
        filters = {}

    date_range = filters.get("date")
    user_role = filters.get("user_role")

    # Constructing the conditions
    conditions = []

    if date_range:
        start_date, end_date = date_range
        conditions.append("date BETWEEN '{}' AND '{}'".format(start_date, end_date))

    if user_role and user_role != "Administrator":
        if user_role == "General Manager":
            conditions.append("divident_amount_for_general_manager IS NOT NULL")
        elif user_role == "Zonal Manager":
            conditions.append("divident_amount_for_zonal_manager IS NOT NULL")
        elif user_role == "Area Manager":
            conditions.append("divident_amount_for_area_manager IS NOT NULL")
        elif user_role == "Marketing Manager":
            conditions.append("divident_amount_for_marketing_manager IS NOT NULL")
        elif user_role == "Telecaller":
            conditions.append("divident_amount_for_telecaller IS NOT NULL")

    where_clause = " AND ".join(conditions) if conditions else "1=1"

    if user_role and user_role == "Administrator":
        query = """
            SELECT 
                date,
                divident_amount_for_general_manager,
                divident_amount_for_zonal_manager,
                divident_amount_for_area_manager,
                divident_amount_for_marketing_manager,
                divident_amount_for_telecaller
            FROM 
                `tabDaily Sales`
            WHERE 
                {where_clause}
        """.format(where_clause=where_clause)
        data = frappe.db.sql(query, as_dict=True)


    else:
        query = """
        SELECT
            date,
            {fieldname}
        FROM
            tabDaily Sales
        WHERE 1 = 1 {conditions}
    """.format(fieldname=fieldname, conditions=conditions)

    data = frappe.db.sql(query, as_dict=True)
    
    # Define columns
    columns = [
        {"label": _("Date"), "fieldname": "date", "fieldtype": "Date", "width": 100},
        {"label": _("General Manager"), "fieldname": "divident_amount_for_general_manager", "fieldtype": "Currency", "width": 200},
        {"label": _("Zonal Manager"), "fieldname": "divident_amount_for_zonal_manager", "fieldtype": "Currency", "width": 200},
        {"label": _("Area Manager"), "fieldname": "divident_amount_for_area_manager", "fieldtype": "Currency", "width": 200},
        {"label": _("Marketing Manager"), "fieldname": "divident_amount_for_marketing_manager", "fieldtype": "Currency", "width": 200},
        {"label": _("Telecaller"), "fieldname": "divident_amount_for_telecaller", "fieldtype": "Currency", "width": 200}
    ]

    return columns, data
