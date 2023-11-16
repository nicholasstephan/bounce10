# Storage

All stored files have a corresponding document in `/storage/{file id}`. 

| Property | Description
| ---      | ---
| dateCreated
| folder
| name
| type
| size
| uploadProgress
| createdByUserId
| useCount


## File usage

Each file document has a `useCount` number. This is set to "1" when a file is uploaded with the `upload` utility. 

If the file is used in subsequent places, use the `use` utility to increment that count. 

If the file is removed with the `remove` utility, that count is decremented. If the count hits 0, the file and all derrived resources are removed from storage. 

## Utility

Interact with file storage through `storage.js` utility.

