function calculateAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function assignToCourse(name, birthDate) {
    var course;
    var age = this.calculateAge(birthDate);
    if (age >= 3 && age <= 12) {
        course = {name: name, age: age, course: 'kids'};
    }
    else if (age > 12 && age < 18) {
        course = {name: name, age: age, course: 'teens'};
    }
    else if (age >= 18) {
        course = {name: name, age: age, course: 'adults'};
    }
    else {
        throw new Error('Wrong data or too young!');
    }
    return course;
}

module.exports = {
    assignToCourse: assignToCourse,
    calculateAge: calculateAge
};

