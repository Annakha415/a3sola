# Copyright (c) 2023, Misma and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class TrackIncentiveOrCommision(Document):
	def validate(doc):
		
		#update status based on field paid.
		if doc.allowed_incentive==doc.paid:
			doc.status="Fully Paid"
		elif int(doc.paid)==0:
			doc.status="Unpaid"
		else:
			doc.status="Partially Paid"

