const fs = require('fs');

const buf = fs.readFileSync('/Users/tolyachaus/Documents/Tolyafilms_website/tolya-films/public/logo-transparent.png');

// Find IDAT chunk to see if we can decode... nevermind. Node has no built-in PNG decoder.
