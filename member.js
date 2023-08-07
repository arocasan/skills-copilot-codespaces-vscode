function skillsMember() {
    var skills = document.getElementById("skills").value;
    var skillsError = document.getElementById("skillsError");
    var skillsRegex = /^[a-zA-Z0-9]{2,}$/;
    if (skillsRegex.test(skills) == false) {
        skillsError.innerHTML = "Skills must be at least 2 characters long and contain only letters and numbers";
        return false;
    } else {
        skillsError.innerHTML = "";
        return true;
    }
}