# Reading List

The library is where all media and resources are stored. 

Library items are stored in firestore `/readingList/{item id}`.

## List Item

A reading list item is a single item in the reading list.

### Properties

| Property      | Type        | Description 
| ---           | ---         | --- 
| dateCreated   | timestamp   | The timestamp of when the library item was created.
| thumbnail     | string      | A [storage](./storage.md) path to the thumbnail of the library item.
| title         | string      | The name of the library item. 
| subtitle      | string      | 
| url           | string      | (optional) The url of the library item.