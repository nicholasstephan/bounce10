# Users

User data is stored in firestore `/users/{user id}`. User ids are synced with firebase authentication user ids. 


| Field       | Description
| ---         | ---
| name
| email
| phone
| permissions


## Permissions

| Permission       | Description
| ---              | ---
| manageChildren   | Allows users's to maintain child profiles.
| adminUsers       | Allows user to manage other user accounts.