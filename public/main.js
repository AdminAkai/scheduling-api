Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});


try {
    document.getElementById('datePicker').value = new Date().toDateInputValue()
    document.getElementById('datePicker').setAttribute("min", new Date().toDateInputValue())
    document.getElementById('datePicker').setAttribute("max", new Date().toDateInputValue())
}
catch(err) {
    console.log("edit field not generated yet")
}