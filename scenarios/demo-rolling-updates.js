const path = require('path')
const sh = require('shelljs')
const prompts = require('prompts')
const replace = require('replace-in-file')
const chalk = require('chalk')
const request = require('superagent')

sh.cd(path.join(__dirname, '../deployment-strategies/local_cluster/rolling-deployment'))

// ensure redis is deployed and exposed to the cluster and that the boss-service is deployed
if (sh.exec('kubectl apply -f redis-service.yaml').code !== 0) {
    sh.echo('failed to apply redis-service');
    sh.exit(1);
}

if (sh.exec('kubectl apply -f redis-deployment.yaml').code !== 0) {
    sh.echo('failed to apply redis-deployment');
    sh.exit(1);
}

if (sh.exec('kubectl apply -f boss-service.yaml').code !== 0) {
    sh.echo('failed to apply boss-service');
    sh.exit(1);
}

const workingdir = 'temp-working-dir'
    ; (async () => {
        // creating temporary working directory
        if (!sh.test('-e', path.join(__dirname, workingdir))) {
            sh.mkdir(path.join(__dirname, workingdir))
        }
        // prompt for tag name
        const userResponse = await prompts({
            type: 'text',
            name: 'tagname',
            message: 'What tag do you want to build and deploy with?',
            validate: tagname =>
                tagname.length === 0 ? `You have to enter a tagname` : true
        })
        const tagname = userResponse.tagname

        // build the new image with the given tag
        const image = `boss_${tagname}`
        sh.echo(chalk.gray(`building ${image}`))
        sh.cd(path.join(__dirname, '../services/boss'))
        sh.exec(`docker build . -t ${image}`)
        sh.cd(path.join(__dirname))

        // copy the deployment yaml into to temp-working-dir
        const pathToWorkingDirDeployment = path.join(__dirname, `${workingdir}/deployment.yaml`)
        sh.cp(path.join(__dirname, '../deployment-strategies/local_cluster/rolling-deployment/boss-deployment.yaml'), pathToWorkingDirDeployment)

        // replace placeholder with given image tag
        const options = {
            files: pathToWorkingDirDeployment,
            from: /\$\(Build.BuildId\)/g,
            to: tagname
        }
        try {
            await replace(options)
        } catch (error) {
            sh.echo(`failed to replace placeholder with provided tag, error: ${error}`)
            sh.exit(1)
        }

        // start simulating users consuming the service
        consumeBossServiceContinuously();

        // kubectl apply -f with this temporary deployment file
        sh.echo(chalk.gray('deploying to kubernetes cluster'))
        sh.exec(`kubectl apply -f ${pathToWorkingDirDeployment}`)

        // rm -r temp-working-dir
        sh.echo(chalk.gray('cleaning up'))
        sh.rm('-r', path.join(__dirname, workingdir))

        sh.echo('ctrl + c to close')
        sh.exec('kubectl get pods -w', { async: true })
        sh.exec('kubectl rollout status deployment boss', {async: true})
    })()


function consumeBossServiceContinuously() {
    request
        .get('http://localhost:4000/location')
        .then(res => {
            sh.echo(chalk.green('request succeeded:', res.text));
        })
        .catch(err => {
            sh.echo(chalk.red('request failed:', err));
        })
        .finally(()=>{
            setTimeout(consumeBossServiceContinuously, 500);
        })

}