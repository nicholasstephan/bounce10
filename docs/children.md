# Children

Child profiles are only accessible by their parent [users](./users.md). Children are stored in firestore `/children/{child id}`.

| Property  | Description
| ---       | ---
| name      | 
| dob       | 
| grade     | 
| avatar    | 
| likes     | Array of strings.
| parents   | Array of [user](./users.md) ids.
| status    | One of "ACTIVE", "CANCELED"

