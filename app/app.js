function Car(brand, year)
{
    this.brand = brand;
    this.year = year;
}

function CarPortal() {
    var credentials = {};

    this.login = function (username, password) {
        if(!credentials.username && !credentials.password){
            credentials.username = username;
            credentials.password = password;
        }
    };
    this.getCredentials = function () {
        return credentials;
    };
    this.logout = function () {
        credentials = {};
    };
}


module.exports = {
    Car: Car,
    CarPortal: CarPortal
};
