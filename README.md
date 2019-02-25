# MongoDB Service



# Contents

- [Installation](#Installation)
- [Definitions](#Definitions)
  
  - [Tasks](#Tasks)
    - [aggregate](#aggregate)
    - [write](#write)

# Installation

## MESG Core

This service requires [MESG Core](https://github.com/mesg-foundation/core) to be installed first.

You can install MESG Core by running the following command or [follow the installation guide](https://docs.mesg.com/guide/start-here/installation.html).

```bash
bash <(curl -fsSL https://mesg.com/install)
```

## Service

Download the source code of this service, and then in the service's folder, run the following command:
```bash
mesg-core service deploy
```

# Definitions


# Tasks

## aggregate

Task key: `aggregate`



### Inputs

| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **collection** | `collection` | `String` | Collection name |
| **lookups** | `lookups` | `Object` | **`optional`** Join collections |
| **noID** | `noID` | `Boolean` | **`optional`** Removes _id field from all documents |
| **one** | `one` | `Boolean` | **`optional`** Only pick first document |
| **project** | `project` | `Object` | **`optional`** Document fields to select |

### Outputs

#### success

Output key: `success`



| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **data** | `data` | `Any` | One document returned when 'one' set to true otherwise array of documents |


## write

Task key: `write`



### Inputs

| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **collection** | `collection` | `String` | Collection name |
| **data** | `data` | `Any` | Data to insert. It can be document or array of documents |
| **uniqueFields** | `uniqueFields` | `String` | **`optional`** Fields to be considered unique as together |

### Outputs

#### failure

Output key: `failure`



| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **message** | `message` | `String` |  |

#### success

Output key: `success`



| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **_ids** | `_ids` | `String` | _ids of inserted documents |


