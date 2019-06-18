# MongoDB Service (ID: mongo)



## Contents

- [Installation](#Installation)
  - [MESG Engine](#MESG-Core)
  - [Deploy the Service](#Service)
- [Definitions](#Definitions)
  - [Tasks](#Tasks)
    - [write](#write)
    - [aggregate](#aggregate)

## Installation

### MESG Engine

This service requires [MESG Engine](https://github.com/mesg-foundation/core) to be installed first.

You can install MESG Engine by running the following command or [follow the installation guide](https://docs.mesg.com/guide/start-here/installation.html).

```bash
bash <(curl -fsSL https://mesg.com/install)
```

### Deploy the Service

To deploy this service, go to [this service page](https://marketplace.mesg.com/services/mongo) on the [MESG Marketplace](https://marketplace.mesg.com) and click the button "get/buy this service".

## Definitions


### Tasks

#### write

Task key: `write`



##### Inputs

| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **collection** | `collection` | `String` | Collection name |
| **data** | `data` | `Any` | Data to insert. It can be document or array of documents |
| **uniqueFields** | `uniqueFields` | `String` | **`optional`** Fields to be considered unique as together |
  
##### Outputs

###### _ids

Output key: `_ids`

_ids of inserted documents

| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |

#### aggregate

Task key: `aggregate`



##### Inputs

| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **collection** | `collection` | `String` | Collection name |
| **lookups** | `lookups` | `Object` | **`optional`** Join collections |
| **match** | `match` | `Object` | **`optional`** Filtering query |
| **project** | `project` | `Object` | **`optional`** Document fields to select |
| **limit** | `limit` | `Number` | **`optional`** Limit for selecting documents |
| **offset** | `offset` | `Number` | **`optional`** Offset for selecting documents |
| **sort** | `sort` | `Object` | **`optional`** Sort documents |
| **search** | `search` | `String` | **`optional`** Text search |
| **noID** | `noID` | `Boolean` | **`optional`** Removes _id field from all documents |
| **one** | `one` | `Boolean` | **`optional`** Only pick first document |
  
##### Outputs

###### data

Output key: `data`

One document returned when &#x27;one&#x27; set to true otherwise array of documents

| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |


