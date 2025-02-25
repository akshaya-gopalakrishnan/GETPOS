from . import __version__ as app_version

app_name = "getpos"
app_title = "GETPOS"
app_publisher = "Nestorbird"
app_description = "GETPOS"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "info@nestorbird.com"
app_license = "MIT"

# Includes in <head>
# ------------------

fixtures = [
	{
		"doctype": "Custom Field",
		"filters": {
			"name": (
				"in",
				(
                    "Cost Center-custom_attach_image",
                    "Cost Center-custom_address",
                    "Cost Center-custom_location"
				)
			)
		}
	},
		{
		"doctype": "Print Format",
		"filters": {
			"name": (
				"in",
				(
					"POS Print",
					"GET POS Invoice"
				)
			)
		}
	},
  
   {
        "dt": "Web Page",
        "filters": {
            "name": [
                "in",
                [
                    "payment-process" 
                ]
            ]
        }
    }
]
# include js, css files in header of desk.html
# app_include_css = "/assets/getpos/css/nbpos.css"
app_include_js = [
    "/assets/getpos/js/nbpos.js",  
   
]

# include js, css files in header of web template
# web_include_css = "/assets/nbpos/css/nbpos.css"
# web_include_js = "/assets/nbpos/js/nbpos.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "nbpos/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
doctype_js = {
	"Sales Order" : "public/js/doctype_js/sales_order.js",
	"Warehouse": "public/js/doctype_js/warehouse.js",
	"Account": "public/js/doctype_js/account.js",
	"Customer": "public/js/doctype_js/customer.js",
    "Cost Center": "public/js/doctype_js/cost_center.js",
	"Item": "public/js/doctype_js/item.js",
    "Pricing Rule" : "public/js/doctype_js/pricing_rule.js",
    "Email Template" : "public/js/doctype_js/email_template.js",


}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------


# application home page (will override Website Settings)
# home_page = "/app/point-of-sale"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "nbpos.install.before_install"
# after_install = "nbpos.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "nbpos.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }
override_doctype_class = {
	"Sales Invoice": "getpos.overrides.sales_invoice.Custom"
}


# Document Events
# ---------------
# Hook on document methods and events
doc_events = {	
	"Sales Order":{		
		"validate": "getpos.getpos.hooks.sales_order.validate"
	},	
	"Item Price":{
		"validate": "getpos.getpos.hooks.item_price.validate_item_price"
	},
    "Version":{
        "after_insert": "getpos.getpos.hooks.version.after_insert"
	},   
	"Item Group" : {
		"before_insert" : "getpos.getpos.hooks.item_group.item_group_length"
	},
	"Global Defaults" : {
		"on_update" : "getpos.getpos.hooks.global_defaults.update_theme_settings"
	},
    "Item" : {
		"validate" : "getpos.getpos.hooks.item.validate_item"
	},
	
}


after_request = "getpos.getpos.api.after_request"
# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

scheduler_events = {
# 	"all": [
# 		"nbpos.tasks.all"
# 	],
	"daily": [
			"getpos.getpos.schedulers.expired_gift_card_settlement.create_gift_card_journal_entries",
            "getpos.getpos.schedulers.opencart_integration.order_integration"
		]
# 	"hourly": [
# 		"nbpos.tasks.hourly"
# 	],
# 	"weekly": [
# 		"nbpos.tasks.weekly"
# 	]
# 	"monthly": [
# 		"nbpos.tasks.monthly"
# 	]
}

# Testing
# -------

# before_tests = "nbpos.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	# "frappe.desk.doctype.event.event.get_events": "nbpos.event.get_events"
# 	"frappe.auth.LoginManager.logout":"getpos.customizations.custom_login_manager.CustomLoginManager.logout"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "nbpos.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


# User Data Protection
# --------------------

user_data_fields = [
	{
		"doctype": "{doctype_1}",
		"filter_by": "{filter_by}",
		"redact_fields": ["{field_1}", "{field_2}"],
		"partial": 1,
	},
	{
		"doctype": "{doctype_2}",
		"filter_by": "{filter_by}",
		"partial": 1,
	},
	{
		"doctype": "{doctype_3}",
		"strict": False,
	},
	{
		"doctype": "{doctype_4}"
	}
]
after_migrate = "getpos.getpos.after_migrate.main"
# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"nbpos.auth.validate"
# ]

# no_csrf=["getpos.getpos.api.login"]

on_session_creation = "getpos.Customization.custom_header.set_user_active"
on_logout = "getpos.Customization.custom_header.set_user_inactive"


# website_route_rules = [{'from_route': '/getpos-web/<path:app_path>', 'to_route': 'getpos-web'}, {'from_route': '/getpos-web/<path:app_path>', 'to_route': 'getpos-web'}, {'from_route': '/GetPOS/<path:app_path>', 'to_route': 'GetPOS'},]
after_request = "getpos.Customization.custom_header.after_request"
website_route_rules = [{'from_route': '/getpos-react/<path:app_path>', 'to_route': 'getpos-react'},]