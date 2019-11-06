const path = require('path')
const sh = require('shelljs')
const chalk = require('chalk')
const webhookListener = require('./webhook/listener')
const puppeteer = require('puppeteer')
const figlet = require('figlet')
const clearScreen = require('clear');

clearScreen();
;(async () => {
    
    sh.echo(chalk.green.bold('loading scenario:'))
    sh.echo(chalk.green.bold(figlet.textSync('apigateway')))

    sh.echo(chalk.blue('starting webhook listener..'))
    await webhookListener.init()
    
    sh.echo(chalk.blue('prepping .env files for this scenario..'))

    sh.echo(chalk.blue('stopping already running apigateway scenario containers..'))
    sh.cd(path.join(__dirname, '../patterns'))
    if (sh.exec('docker-compose -f apigateway-pattern.yml stop').code !== 0) {
        sh.echo('failed to stop already running apigateway scenario');
        sh.exit(1);
    }

    sh.echo(chalk.blue('starting containers..'))
    sh.exec('docker-compose -f apigateway-pattern.yml up --build', {async:true})

    await systemup()
    console.log(chalk.yellow('SYSTEM IS UP'))
    
    sh.echo(chalk.blue('starting up a browser instance...'))
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    page.goto('http:localhost:4000')

})()

async function systemup() {
    return new Promise(resolve => {
        webhookListener.events.on('system-up', (e) => {
            resolve('system-up');
        });
    })
}

process.on('SIGINT', () => { // when ctrl + c (clean up)
    sh.echo(chalk.blue('stopping running containers for this scenario..'))
    sh.cd(path.join(__dirname, '../patterns'))
    if (sh.exec('docker-compose -f apigateway-pattern.yml stop').code !== 0) {
        sh.echo('failed to stop running containers');
        sh.exit(1);
    }
    sh.echo(chalk.bold.green('Thanks for playing!'))
    process.exit()
})
