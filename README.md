# wifi-scan
Perform WiFi network scanning from node via system tools.

Uses `airport`, with support for falling back to absolute-path `airport`, and
other utilities on other OSs coming in future.

## Installation

```bash
$ npm install wifi-scan
```

## Usage
```js
var scan = require('wifi-scan');

scan.performScan()
.then(function (results) {

  // results.commands -

}).catch(function (err) {

  console.error(err.stack);

});
```

## API reference

#### performScan() -> Promise([[AccessPoint](#accesspoint)])
Promise to return an array of access point information objects. You may well be
given multiple `AccessPoint`s per network, in which case the `ssid` properties
will match but `bssid` MAC addresses will be unique.

## `AccessPoint`

#### `channel` (string)
The channel on which the access point is operating. Given as a string since
often this includes non-numerical symbols (eg '116,+1').

Examples
* `'56'`
* `'116,+1'`

#### `security` (object/null)

##### `protocol` (string)
The security protocol in use.

Examples:
* `'WPA2'`

##### `auth` (string)
Encryption scheme used for auth.

Examples:
* `'PSK'`
* `'802.1x'`

##### `unicast` (string)
Encryption scheme used for unicast.

Examples:
* `'AES'`

##### `group` (string)
Encryption scheme used for group.

Examples:
* `'AES'`

#### `raw` (string)
Raw string representation of the security scheme as formatted by `airport`.
That is, `protocol(auth/unicast/group)`.

Examples:
* `'WPA2(PSK/AES/AES)'`

#### `ssid` (`string`)
The SSID of the network which this access point serves.

Examples
* `'My Home Wifi'`

#### `bssid` (string)
The BSSID (MAC address) of the access point.

Examples
* `'12:34:56:78:90:ab'`

#### `rssi` (number)
[Received singal strength indication](https://wikipedia.org/wiki/Received_signal_strength_indication)
for the access point.

Examples
* `-73`

#### `ht` (boolean)
Is high throughput (HT) mode in use?

#### `cc` (string/null)
Country code being used by the access point (see Cisco's list of accepted values
[here](http://www.cisco.com/c/en/us/td/docs/wireless/wcs/3-2/configuration/guide/wcscfg32/wcscod.html)).

Examples
* `'GB'`
* `'JP'`
