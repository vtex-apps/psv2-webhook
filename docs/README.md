# Profile System V2 Webhook Application (psv2-webhook)

The `psv2-webhook` application is designed to facilitate the transmission of events related to profiles, addresses, contacts, and purchase information from the Profile System V2 (PSv2) to an external endpoint defined by the user.

### Key Features

* **Event Listening**: Listens for events from PSv2 for four entities: profiles, addresses, contacts, and purchaseInfo.
* **Data Retrieval**: Fetches the corresponding document from PSv2.
* **Data Transmission**: Sends the document to an external endpoint specified by the user in the application settings.
* **Retry Mechanism**: Attempts to deliver the data three times with a 2-second timeout each. If all attempts fail, an exponential backoff retry policy is employed.

### Setting Up the Webhook URL

To define the webhook URL and configure security settings, follow these steps:

1. Go to the **My Apps** section in your admin panel.
2. Search for the **Profile System v2 Webhook** app.
3. Click on **Settings**.
4. Set the webhook URL that will receive the data from PSv2.
5. (Optional) Set the `X-PS2WEBHOOK-API-AppKey` and `X-PS2WEBHOOK-API-AppToken` headers for security. These will be sent with each request to the external URL.

<img width="904" alt="image" src="https://github.com/vtex-apps/psv2-webhook/assets/67066494/9bfe491b-8900-43cd-b4cb-cb9207ba78e0">

### Request Body to External API

The request body sent to the external API will have the following structure:

#### Insert and Update Operations

```json
{
    "payload": {
        "id": "f8f669d4-f969-4242-92a9-28d78395ef8b",
        "document": {
            "firstName": "Storage",
            "lastName": "Team",
            "email": "storage_team@vtex.com.br",
            "document": "59007455389",
            "documentType": "CPF"
        },
        "meta": {
            "version": "59f0365a-a983-4218-acbf-85e59719030e",
            "author": "40d2bfa7-80ed-4eb1-bbee-f28ce69f810a",
            "creationDate": "2024-06-04T14:26:45.7359627+00:00",
            "lastUpdateDate": "2024-06-04T14:26:45.7359627+00:00",
            "expirationDate": "2024-06-05T14:26:45.1463721+00:00"
        }
    },
    "profileId": "f8f669d4-f969-4242-92a9-28d78395ef8b",
    "operation": "insert",
    "subject": "profile"
}
```

#### Delete Operation

```json
{
    "payload": {
        "id": "f8f669d4-f969-4242-92a9-28d78395ef8b"
    },
    "profileId": "f8f669d4-f969-4242-92a9-28d78395ef8b",
    "operation": "delete",
    "subject": "profile"
}
```

### Example Requests Body for Insert / Update operations

#### Profile

```json
{
  "payload": {
    "id": "1d6d892e-60cd-4e96-b194-9cc2aa4cd010",
    "document": {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@example.com",
      "corporateName": null,
      "fancyName": null,
      "document": "123456789",
      "businessDocument": null,
      "documentType": "SSN",
      "homePhone": "+1234567890",
      "cellPhone": "+1234567890",
      "businessPhone": null,
      "gender": "male",
      "birthdate": "1990-01-01",
      "priceTable": "standard",
      "tags": ["tag1", "tag2"],
      "customerCode": "C123456"
    },
    "meta": {
      "version": "12984a18-c08b-4a07-8354-03b1a841d7c9",
      "author": "ee3744ab-b543-438d-aeed-273e22805668",
      "creationDate": "2024-06-28T17:21:45.0539732+00:00",
      "lastUpdateDate": "2024-06-28T20:28:16.0496466+00:00",
      "expirationDate": null
    }
  },
  "profileId": "1d6d892e-60cd-4e96-b194-9cc2aa4cd010",
  "operation": "update",
  "subject": "profile"
}
```

#### Address

```json
{
  "payload": {
    "id": "e62587d0-2279-493b-86f9-66a4e3579512",
    "document": {
      "profileId": "fc5b9217-5819-4f97-9a1d-13540a8e0461",
      "name": "Home Address",
      "complement": "Apt 101",
      "reference": "Near the park",
      "receiverName": "John Doe",
      "postalCode": "W23K4K8",
      "countryCode": "IRL",
      "administrativeAreaLevel1": "Co. Kildare",
      "locality": "Maynooth",
      "localityAreaLevel1": "",
      "route": "Manor Mills Shopping Centre",
      "streetNumber": "214",
      "extend": "",
      "nearly": "",
      "geoCoordinates": [-6.59411, 53.38205],
      "contactId": "e62587d0-2279-493b-86f9-66a4e3579512"
    },
    "meta": {
      "version": "e9afe891-1a73-41a5-98cd-505d83302af0",
      "author": "7f4f1a89-5974-4841-a045-c417f2a584a6",
      "creationDate": "2024-06-28T20:24:38.4571872+00:00",
      "lastUpdateDate": "2024-06-28T20:24:38.4571872+00:00",
      "expirationDate": null
    }
  },
  "profileId": "fc5b9217-5819-4f97-9a1d-13540a8e0461",
  "operation": "insert",
  "subject": "address"
}
```

#### Contacts

```json
{
    "payload": {
         "id": "8958c837-25c8-435b-ad8c-9fe12da2b109",
        "document": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "document": "123456789",
        "documentType": "SSN",
        "contactId": "40d2bfa7-80ed-4eb1-bbee-f28ce69f810a",
        "profileId": "f8f669d4-f969-4242-92a9-28d78395ef8b"
    },
    "meta": {
      "version": "8345451f-48ec-4725-9a34-42563dcfebb2",
      "author": "7f4f1a89-5974-4841-a045-c417f2a584a6",
      "creationDate": "2024-06-28T20:24:39.1332368+00:00",
      "lastUpdateDate": "2024-06-28T20:24:39.1332368+00:00",
      "expirationDate": null
    } 
    },
    "profileId": "f8f669d4-f969-4242-92a9-28d78395ef8b",
    "operation": "update",
    "subject": "contact"
}
```

#### Purchase Info

```json
{
  "payload": [
    {
      "id": "87e85f7d-6c1f-4fc4-a50d-8f8020e61aaf",
      "document": {
        "paymentData": {
          "availableAccounts": [],
          "availableTokens": [],
          "transactions": null,
          "giftCards": [],
          "giftCardMessages": [],
          "numberOfPaymentErrors": 0,
          "numberOfDeniedTransactions": 0,
          "lastDeniedTransaction": null
        },
        "clientPreferences": {
          "userId": "87e85f7d-6c1f-4fc4-a50d-8f8020e61aaf",
          "localeDefault": "en-GB"
        },
        "isToSavePersonalData": true,
        "lastUserPurchases": [
          {
            "creationDate": "2024-06-05T05:47:30.6772458Z",
            "orderId": "50501403-01",
            "orderGroup": "50501403",
            "value": 14000
          },
          {
            "creationDate": "2024-06-05T11:11:58.1687313Z",
            "orderId": "50501531-01",
            "orderGroup": "50501531",
            "value": 25
          }
        ],
        "lastPurchasesAddressId": "718a64518f3448868bba7c4ee16d9cfa"
      },
      "meta": {
        "version": "a13cb86c-b443-42da-bcd1-9459419bca26",
        "author": "d6d8269f-e7cc-4e4b-8b89-3b46a1407937",
        "creationDate": "2024-06-03T07:14:49.8821795+00:00",
        "lastUpdateDate": "2024-06-28T12:14:52.1244556+00:00",
        "expirationDate": null
      }
    }
  ],
  "profileId": "87e85f7d-6c1f-4fc4-a50d-8f8020e61aaf",
  "operation": "update",
  "subject": "purchaseInfo"
}
```

### Request Body Fields

* **Payload**: Contains the document retrieved from PSv2's get unmasked document API. It includes the main data structure that represents the entity being transmitted.
* **Meta**: Provides metadata associated with the document, such as versioning details, author information, creation and last update timestamps, and expiration date if applicable.
* **Profile Id**: The ID of the profile related to the document.
* **Operation**: The type of operation (insert, update, or delete).
* **Subject**: The entity of the document (profile, address, contacts, or purchaseInfo).

### Security Headers

For security reasons, you can configure the application to send the following headers with each request to the external URL:

* `X-PS2WEBHOOK-API-AppToken`: The token for authenticating requests.
* `X-PS2WEBHOOK-API-AppKey`: The key for authenticating requests.

### Entities

The application works with four entities:
- Profile
- Address
- Contacts
- PurchaseInfo

### Retry Mechanism Details

To ensure that the external API receives the data, three attempts will be made to deliver the data with a timeout of 2 seconds each. If all attempts fail, the system employs an exponential backoff approach for additional attempts.
