// Copyright (c) 2024, Misma and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Regional Manager and Area Manager Mapping', {
//     refresh: function(frm) {
//         // Fetch Area Managers based on role and set as options
//         frappe.client.call({
//             method: 'a3sola_solar_management.regional_manager_and_area_manager_mapping.get_managers',
//             args: {
//                 role_type: 'Area Manager'  // Specify the role type you're fetching
//             },
//             callback: function(r) {
//                 if (r.message) {
//                     frm.set_df_property('area_manager', 'options', r.message);
//                 }
//             }
//         });

//         // Fetch Regional Managers based on role and set as options
//         frappe.client.call({
//             method: 'a3sola_solar_management.regional_manager_and_area_manager_mapping.get_managers',
//             args: {
//                 role_type: 'Regional Manager'  // Specify the role type you're fetching
//             },
//             callback: function(r) {
//                 if (r.message) {
//                     frm.set_df_property('regional_manager', 'options', r.message);
//                 }
//             }
//         });
//     }
// });
