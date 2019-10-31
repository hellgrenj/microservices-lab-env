const path = require('path')
const sh = require('shelljs')

// First prep correct .env file for UI's and other scenario specific configuration

// Then spin up system in the specific pattern-configuration
sh.cd(path.join(__dirname, '../patterns'))
if (sh.exec('docker-compose -f apigateway-pattern.yml up --build').code !== 0) {
    sh.echo('failed to start the apigateway scenario');
    sh.exit(1);
}

// Navigate to the UI with puppeter .. show browser to user.. not headless