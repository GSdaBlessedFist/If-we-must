

function validate(entry) {
    if (typeof entry === "number" && !isNaN(entry)) {
        console.log("%cTax Amount: %o", "color:lightblue", entry);
    } else {
        return
    }
}

module.exports = validate;