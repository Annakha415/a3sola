frappe.query_reports["Manager Wise Commission Allocation"] = {
    filters: [
        {
            fieldname: "date",
            label: __("Date"),
            fieldtype: "DateRange",
            default: [frappe.datetime.add_months(frappe.datetime.now_date(), -1), frappe.datetime.now_date()],
            reqd: 1
        },
        {
            fieldname: "user_role",
            label: __("User Role"),
            fieldtype: "Select",  // Changed fieldtype to Select
            options: "",  // Options will be populated dynamically
            read_only: 1,
        }
    ],

    onload: function(report) {
        frappe.call({
            method: "frappe.client.get",
            args: {
                doctype: "User",
                name: frappe.session.user
            },
            callback: function(r) {
                if (r.message) {
                    const roles = r.message.roles.map(role => role.role);
                    const user_role = determine_user_role(roles);
                    populate_role_options(user_role);  // Populate options with user role
                    frappe.query_report.set_filter_value("user_role", user_role);  // Set filter value
                    apply_role_filters(report, roles);  // Apply role-specific filters
                }
            }
        });
    }
};

function determine_user_role(roles) {
    if (roles.includes("Administrator")) {
        return "Administrator";
    } else if (roles.includes("General Manager")) {
        return "General Manager";
    } else if (roles.includes("Zonal Manager")) {
        return "Zonal Manager";
    } else if (roles.includes("Area Manager")) {
        return "Area Manager";
    } else if (roles.includes("Marketing Manager")) {
        return "Marketing Manager";
    } else if (roles.includes("Telecaller")) {
        return "Telecaller";
    }
    return "Unknown Role";
}

function populate_role_options(user_role) {
    const filter_field = document.querySelector('[data-fieldname="user_role"]');
    if (filter_field) {
        filter_field.innerHTML = `<option value="${user_role}">${user_role}</option>`;
    }
}

function apply_role_filters(report, roles) {
    let fieldname = "";

    if (roles.includes("Administrator")) {
        // Administrator can see all data, no filters needed
        return;
    } else if (roles.includes("General Manager")) {
        fieldname = "divident_amount_for_general_manager";
    } else if (roles.includes("Zonal Manager")) {
        fieldname = "divident_amount_for_zonal_manager";
    } else if (roles.includes("Area Manager")) {
        fieldname = "divident_amount_for_area_manager";
    } else if (roles.includes("Marketing Manager")) {
        fieldname = "divident_amount_for_marketing_manager";
    } else if (roles.includes("Telecaller")) {
        fieldname = "divident_amount_for_telecaller";
    }

    if (fieldname) {
        report.clear_filters();
        report.set_filter_value(fieldname, ["!=", null]);
        report.refresh();
    }
}
