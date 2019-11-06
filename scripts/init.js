const path = require('path')
const chalk = require('chalk')
const sh = require('shelljs')

if (!sh.which('docker')) {
    sh.echo(
        chalk.red(
            'you need to install docker!'
        )
    )
    sh.exit(1)
}

if (!sh.which('docker-compose')) {
    sh.echo(
        chalk.red(
            'you need to install docker-compose!'
        )
    )
    sh.exit(1)
}

sh.cd(path.join(__dirname, '../scenarios'))
if (sh.exec('npm install').code !== 0) {
    sh.echo('failed to setup ./scenarios');
    sh.exit(1);
}

// install puppeter with chromium .. se min check for devices repo
