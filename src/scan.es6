import _ from 'lodash';
import childProcess from 'child_process';

function parseAirportScan(scanOutput) {
  // Get lines and discard header
  const lines = _.reject(scanOutput.split('\n').slice(1), line => line.length === 0);
  // Parse
  const accessPoints = lines.map((rawLine, i) => {
    const line = rawLine.replace(/^\s*/, '').replace(/\s*$/, '');
    const split = _.reject(line.split(/\s/), part => part.length === 0);
    let security = split.slice(-1)[0];
    security = security === 'NONE'? null: security;
    if (security !== null) {
      const protocol = security.substr(0, security.indexOf('('));
      const split = security.slice(security.indexOf('(') + 1, -1).split('/');
      const auth = split[0];
      const unicast = split[1];
      const group = split[2];
      security = {protocol, auth, unicast, group, raw: security};
    }
    let cc = split.slice(-2)[0];
    cc = cc === '--'? null: cc;
    const ht = split.slice(-3)[0] === 'Y';
    const channel = split.slice(-4)[0];
    const rssi = parseInt(split.slice(-5)[0], 10);
    const bssid = split.slice(-6)[0];
    const ssid = line.substr(0, line.indexOf(bssid) - 1);
    const id = i;
    return {id, security, cc, ht, channel, rssi, bssid, ssid};
  });
  return {accessPoints};
}

export function performScan() {
  return new Promise((resolve, reject) => {
    const airportCmd = 'airport -s';
    childProcess.exec(airportCmd, (err, stdout, stderr) => {
      if (!!err) {return reject(err);}
      if (stderr.length > 0) {return reject(new Error(stderr));}
      if (stdout.length === 0) {return reject(new Error('Empty response from airport'));}
      const parsed = parseAirportScan(stdout);
      parsed.commands = [airportCmd];
      return resolve(parsed);
    });
  });
}
