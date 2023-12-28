# Storage

All stored files have a corresponding document in `/storage/{file id}`. 

| Property         | Description
| ---              | ---
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

### url()

Param

| Param           | Type     | Description
| ---             | ---      | ---
| id              | string   | The id of the storage item to get the url for.
| options         | object   | (optional) Options for the url.
| options.width   | number   | (optional) The width of the image to get the url for.
| options.height  | number   | (optional) The height of the image to get the url for.