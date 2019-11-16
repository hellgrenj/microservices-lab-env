"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const locations = ["in the kitchen", "in his room", "right behind you!!", "at home", "in the conference room"];
function getLocationSync() {
    return getRandomLocationSync();
}
exports.getLocationSync = getLocationSync;
function getRandomLocationSync() {
    const randomIndex = Math.floor(Math.random() * locations.length);
    const message = `The boss is  ${locations[randomIndex]}`;
    return message;
}
//# sourceMappingURL=location.js.map