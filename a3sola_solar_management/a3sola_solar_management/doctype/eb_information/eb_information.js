// Copyright (c) 2022, Acube Innovations and contributors
// For license information, please see license.txt

frappe.ui.form.on('EB Information', {
	// onload: function(frm) {
	// 	alert("Make sure there is no existing EB Information for this Opportunity.")

	// }
	onload: function (frm) {
		var prev_route = frappe.get_prev_route();
		
		
		
		if (prev_route[1] === 'Task') {
	
			let source_doc = frappe.model.get_doc('Task', prev_route[2]);
			frm.set_value("project_id",source_doc.project );
			frm.set_value("opportunity_id",source_doc.opportunity );
			frm.refresh_field('project_id');
			 

			
			
			frappe.call({
				// specify the server side method to be called. 
				//dotted path to a whitelisted backend method
				method: "a3sola_solar_management.a3sola_solar_management.doctype.eb_information.eb_information.test",
				//Passing variables as arguments with request
				args: {
					doc:frm.doc.name,
					pro:source_doc.project,	  
				},
				
				//Function passed as an argument to above function. 
				callback: function(r) {
				//To show message
				console.log(r.message)
				
				
				console.log(frm.customer)
				
				cur_frm.set_value("customer",r.message.customer);
				
				cur_frm.set_value("consumer_number",r.message.consno);
			
				frm.refresh_field('consumer_number');
				frm.refresh_field('customer');
				
				
					   },
					  
		
				});



			

			
		}
	}
});
