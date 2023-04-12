String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function format(origin, replacement) {
    return /[A-Z]/.test(origin) ? replacement.capitalize() : replacement;
}

var map = new Map();
map.set("cailloux", "objectifs");
map.set("caillous", "objectifs");
map.set("caillou", "objectif");

var keys = Array.from(map.keys())
var re = new RegExp(keys.join("|"), "gi");

function replacePattern(node) {
    if(node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = node.nodeValue.replace(re, function(str) {
            return format(str, map.get(str.toLowerCase()));
        });
    } else if(node.nodeType === Node.ELEMENT_NODE) {
        for(var i = 0, num = node.childNodes.length; i < num; ++i) {
            replacePattern(node.childNodes[i]);
        }
    }
}

replacePattern(document.body);
