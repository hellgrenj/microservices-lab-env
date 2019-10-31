const path = require('path')
const sh = require('shelljs')

sh.cd(path.join(__dirname, '../patterns'))
if (sh.exec('npm install').code !== 0) {
    sh.echo('failed to setup ./patterns');
    sh.exit(1);
}

sh.cd(path.join(__dirname, '../scenarios'))
if (sh.exec('npm install').code !== 0) {
    sh.echo('failed to setup ./scenarios');
    sh.exit(1);
}

sh.cd(path.join(__dirname, '../user-interface'))
if (sh.exec('npm install').code !== 0) {
    sh.echo('failed to setup ./user-interfaces');
    sh.exit(1);
}

sh.cd(path.join(__dirname, '../user-interface/client'))
if (sh.exec('npm install').code !== 0) {
    sh.echo('failed to setup ./user-interfaces/client');
    sh.exit(1);
}

// kanske om man skickar med --dev flagga?
// alltid kolla om man har docker och docker-compose commandona installerade och i sin PATH?
// också dotnet build i dot net core och go build i go?? 
// med lite which koller i början om allt är installerat?