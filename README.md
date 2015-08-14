# wifi-scan
Perform WiFi network scanning from node via system tools.

Uses `airport`, with support for falling back to absolute-path `airport`, and
other utilities on other OSs coming in future.

## Installation

```bash
$ npm install wifi-scan
```

## Usage

#### Vanilla JS
```js
var scan = require('wifi-scan');

scan.performScan()
.then(function (info) {})
.catch(function (err) {});
```

#### ES6
```js
import * as scan from 'wifi-scan';

// ...
```

## Notes
At present, the tool will only work on Mac, because it uses the `airport -s`
command to retrieve raw information. However, the plan is to allow it to detect
OS and attempt different approaches.

The scan will first try `airport`, followed by the expected absolute location
`/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport`.
Currently, if neither of these works, it will fail.

## API reference

#### performScan() -> Promise(information)
Promise to return an object containing information on found access points.

Return object is of the form:

```js
{
  "accessPoints": [                   // List of access points found by the scan
    {
      "id": 0,                        // Incremental numerical ID for the AP
      "security": {                   // Description of the securit in use by AP - can be null
        "protocol": "WPA2",           // Protocol
        "auth": "PSK",                // Auth encryption scheme
        "unicast": "AES",             // Unicast encryption scheme
        "group": "AES",               // Group (multicast) encryption scheme
        "raw": "WPA2(PSK/AES/AES)"    // Raw output formatted as by airport -s
      },
      "cc": "GB",                     // Country code reported - can be null
      "ht": true,                     // Is high-throughput mode enabled?
      "channel": "2",                 // Channel (as string because sometimes '+1' etc)
      "rssi": -82,                    // RSSI (https://wikipedia.org/wiki/Received_signal_strength_indication)
      "bssid": "12:34:56:78:90:ab",   // BSSID (MAC address) for the AP
      "ssid": "Jack's Wifi"           // SSID reported
    },
    {
      "id": 1,
      "security": null,
      "cc": null,
      "ht": false,
      "channel": "60,+1",
      "rssi": -83,
      "bssid": "12:34:56:78:90:ab",
      "ssid": "Jack's Open Wifi"
    },
    // ...
  ],
  "commands": [                       // Reports the commands run to retrieve the raw data
    "airport -s"                      // On a Mac, tries this
  ]
}
```
