# Library

The library is where all media and resources are stored. 

Library items are stored in firestore `/library/{item id}`.

## Library Item

A library item is a single item in the library. It can be a video, audio, image, or document.

### Properties

| Property      | Type        | Description 
| ---           | ---         | --- 
| title         | string      | The name of the library item. 
| subtitle      | string      | 
| type          | string      | One of "VIMEO", "YOUTUBE", "IMAGE", "PDF", "LINK"
| thumbnail     | string      | A [storage](./storage.md) path to the thumbnail of the library item.
| url           | string      | (optional) The url of the library item.
| file          | string      | (optional) A [storage](./storage.md) path to the file of the library item.
| dateCreated   | timestamp   | The timestamp of when the library item was created.