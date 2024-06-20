"use strict";
const generateRandomUsername = (name) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
    const username = name.replace(/\s+/g, '').toLowerCase(); // Removes spaces and converts to lowercase
    return `${username}${randomSuffix}`;
};
