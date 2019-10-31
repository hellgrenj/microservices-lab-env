const location = {}
const locations = ['in the kitchen', 'in his room', 'right behind you!!', 'at home', 'in the conference room']

location.get = async function () {
    return new Promise((resolve, reject) => {
        resolve(getRandomLocationSync())
    })
}
function getRandomLocationSync () {
    const  randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
}
module.exports = location