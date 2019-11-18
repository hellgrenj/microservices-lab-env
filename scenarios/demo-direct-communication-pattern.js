const path = require('path')
const sh = require('shelljs')
const chalk = require('chalk')
const webhookListener = require('./webhook/listener')
const puppeteer = require('puppeteer')
const figlet = require('figlet')
const clearScreen = require('clear');


clearScreen();
; (async () => {

    sh.echo(chalk.green.bold('loading scenario:'))
    sh.echo(chalk.green.bold(figlet.textSync('direct communication')))

    let build = false
    if (process.argv[2] === '--build') {
        build = true
        sh.echo(chalk.blue('<started with --build, will rebuild all containers>'))
    }
    
    sh.echo(chalk.blue('starting webhook listener..'))
    await webhookListener.init()

    sh.echo(chalk.blue('prepping .env files for this scenario..'))
    sh.cp(path.join(__dirname, './environmentfiles/direct-communication'), path.join(__dirname, '../user-interfaces/dashboard/client/.env'))

    sh.echo(chalk.blue('stopping already running direct communication scenario containers..'))
    sh.cd(path.join(__dirname, '../patterns'))
    if (sh.exec('docker-compose -f direct-communication.yml stop').code !== 0) {
        sh.echo('failed to stop already running direct communication scenario');
        sh.exit(1);
    }

    sh.echo(chalk.blue('starting containers..'))
    if (build) {
        sh.exec('docker-compose -f direct-communication.yml up --build', { async: true })
    } else {
        sh.exec('docker-compose -f direct-communication.yml up', { async: true })
    }


    await systemup()
    console.log(chalk.yellow('SYSTEM IS UP'))

    sh.echo(chalk.blue('starting up a browser instance...'))
    const browser = await puppeteer.launch({ headless: false, args: ['--start-fullscreen'] })
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
    if (sh.exec('docker-compose -f direct-communication.yml stop').code !== 0) {
        sh.echo('failed to stop running containers');
        sh.exit(1);
    }
    sh.echo(chalk.bold.green('Thanks for playing!'))
    process.exit()
})
