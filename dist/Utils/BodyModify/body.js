"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function modifyBody(inputString) {
    const imgRegex = /<img\b[^>]*>/g;
    const replacedString = inputString.replace(imgRegex, (match) => {
        // Extract the src attribute value from the <img> tag
        const srcMatch = /src="([^"]+)"/.exec(match);
        if (srcMatch) {
            const src = srcMatch[1];
            return `<img src="${src}"  style="max-width: 100%; height: auto;"/>`;
        }
        return match; // If src attribute is not found, keep the original <img> tag
    });
    return replacedString;
}
// Replace all <img> tags with <CardMedia> and store the result
exports.default = modifyBody;
