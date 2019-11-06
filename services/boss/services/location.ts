const locations = ["in the kitchen", "in his room", "right behind you!!", "at home", "in the conference room"];

export function getLocationSync() {
    return getRandomLocationSync();
}
function getRandomLocationSync() {
    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
}
