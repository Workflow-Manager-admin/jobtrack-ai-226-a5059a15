"""
Applications Route Blueprint

Provides CRUD endpoints for managing job applications in an in-memory store.
These endpoints will support the JobTrack AI dashboard's application tracking features:
- List all applications
- Create a new application
- Update an application by ID
- Delete an application by ID

This uses a simple in-memory list for storage (not persistent).
"""

from flask_smorest import Blueprint
from flask.views import MethodView
from flask import abort
from marshmallow import Schema, fields, validate


blp = Blueprint(
    "Applications",
    "applications",
    url_prefix="/applications",
    description="Job application CRUD endpoints",
)

# In-memory store: Each job application is a dict with 'id', 'company', 'position', 'status', etc.
applications_store = []
_next_id = 1


def _get_next_id():
    global _next_id
    nid = _next_id
    _next_id += 1
    return nid


# Marshmallow schemas for serialization & validation
class ApplicationSchema(Schema):

    id = fields.Int(dump_only=True, description="Application ID")
    company = fields.Str(required=True, description="Company name")
    position = fields.Str(required=True, description="Job position/title")
    status = fields.Str(
        required=True,
        validate=validate.OneOf(["applied", "interview", "offer", "rejected", "draft"]),
        description="Current status",
    )
    applied_date = fields.Str(description="Date of application (ISO)", required=False)
    notes = fields.Str(description="Notes/Comments", required=False)


class ApplicationUpdateSchema(Schema):
    # All fields are optional for updates
    company = fields.Str(description="Company name")
    position = fields.Str(description="Job position/title")
    status = fields.Str(
        validate=validate.OneOf(["applied", "interview", "offer", "rejected", "draft"]),
        description="Current status",
    )
    applied_date = fields.Str(description="Date of application (ISO)")
    notes = fields.Str(description="Notes/Comments")


@blp.route("/")
class ApplicationsListAPI(MethodView):
    # PUBLIC_INTERFACE
    @blp.response(200, ApplicationSchema(many=True))
    def get(self):
        """
        Get all job applications.

        Returns a JSON array with all job application records.
        """
        return applications_store

    # PUBLIC_INTERFACE
    @blp.arguments(ApplicationSchema(exclude=("id",)))
    @blp.response(201, ApplicationSchema)
    def post(self, new_data):
        """
        Create a new job application.

        Accepts company, position, status, etc. Returns the created object.
        """
        app_data = dict(new_data)
        app_data["id"] = _get_next_id()
        applications_store.append(app_data)
        return app_data


@blp.route("/<int:app_id>")
class ApplicationDetailAPI(MethodView):
    # PUBLIC_INTERFACE
    @blp.arguments(ApplicationUpdateSchema)
    @blp.response(200, ApplicationSchema)
    def put(self, update_data, app_id):
        """
        Update a job application.

        Updates specified fields of an application by its ID.
        """
        for app in applications_store:
            if app["id"] == app_id:
                app.update(update_data)
                return app
        abort(404, message="Application not found.")

    # PUBLIC_INTERFACE
    @blp.response(204)
    def delete(self, app_id):
        """
        Delete a job application.

        Removes the job application by its ID.
        """
        for i, app in enumerate(applications_store):
            if app["id"] == app_id:
                del applications_store[i]
                return "", 204
        abort(404, message="Application not found.")
