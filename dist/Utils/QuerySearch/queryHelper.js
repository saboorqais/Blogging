"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMatch = void 0;
function getValue(obj, key) {
    const { [key]: value } = obj;
    return typeof value === 'object' ? value : value;
}
function checkMatch(obj, querys, query) {
    if (typeof obj === 'object' && obj !== null && !obj.hasOwnProperty(query)) {
        const condition = Object.keys(obj).map((item) => {
            const value = getValue(obj, item);
            return checkMatch(value, querys, query);
        });
        return condition.some((item) => item === true);
    }
    else {
        const valueToSearchFrom = getValue(obj, query);
        const valueToFind = querys[query];
        return typeof valueToSearchFrom === "string"
            ? valueToSearchFrom.includes(valueToFind)
            : false;
    }
}
function findMatch(obj, querys) {
    if (typeof querys === 'object' && querys !== null) {
        const booleanArray = Object.keys(querys).map((item) => {
            return checkMatch(obj, querys, item);
        });
        return booleanArray.some((item) => item === true);
    }
    return false;
}
exports.findMatch = findMatch;
