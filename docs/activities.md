# Activities

Activities are stored in firestore `/activities`.

Activities can have specific and unique properties. The only required properties required are:

| Property      | Description
| ---           | ---
| owner         | Array of [user](./users.md) or [child](./children.md) ids of who the activity applies to.
| type          | The type of activity. (e.g. "moneyscore", "fish", "valuemapping")
| name          |
| date          | The ISO Date the activity was added to their activity.
| dateCompleted | The ISO Date the activity was completed. (optional)
| progress      | A number between 0 and 1 indicating progress towards completion. (optional)
| status        | One of "ACTIVE", "CANCELED", "COMPLETED"


