'use strict';

var expect = require('chai').expect;
var app = require('../app/app');

describe('Car', function ()
{
    var car;
    beforeEach(function ()
    {
        car = new app.Car('Audi', 1998);
    });
    afterEach(function ()
    {
        car = {};
    });
    describe('properties names', function ()
    {
        it('should defined brand property', function ()
        {
            expect(car).to.haveOwnProperty('brand');
        });
        it('should defined year property', function ()
        {
            expect(car).to.haveOwnProperty('year');
        });
    });

    describe('properties values', function ()
    {
        it('should set brand to \'Audi\'', function ()
        {
            expect(car.brand).to.eql('Audi');
        });
        it('should set year to 1998', function ()
        {
            expect(car.year).to.eql(1998);
        });
    });
});

describe('CarPortal', function ()
{
    var carPortal = new app.CarPortal();

    describe('login', function ()
    {
        afterEach(function ()
        {
            carPortal.logout();
        });
        it('should sign in \'john\'', function ()
        {
            carPortal.login('john', 1234);
            expect(carPortal.getCredentials()).to.eql({username: 'john', password: 1234});
        });

        it('should sign in \'jane\'', function ()
        {
            carPortal.login('jane', 4321);
            expect(carPortal.getCredentials()).to.eql({username: 'jane', password: 4321});
        });
    });
});



