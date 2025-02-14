import frappe
def after_request(response):
    """
    Disable caching for HTML files only by modifying response headers.
    """
    if response.mimetype == "text/html":
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
    return response


def set_user_active():
	# Set the user's session ID in the cache
	frappe.cache().set_value({frappe.session.csrf_token}, frappe.session.csrf_token)


def set_user_inactive():
	# Remove the user's session ID from the cache
	frappe.cache().delete_key({frappe.session.csrf_token})
