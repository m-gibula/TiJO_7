'use strict';

var chai = require('chai');
var expect = chai.expect;

var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var app = require('../app/app');

describe('assignToCourse', function ()
{
    it('should assign adult person to adult group', function ()
    {
        expect(app.assignToCourse('Jack', '10/10/1995')).to.eql({name: 'Jack', age: 21, course: 'adults'});
        expect(app.assignToCourse('Maria', '11/10/1998')).to.eql({name: 'Maria', age: 18, course: 'adults'});
    });
    it('should assign person between 12 - 17 to teens group', function ()
    {
        expect(app.assignToCourse('John', '07/10/2001')).to.eql({name: 'John', age: 15, course: 'teens'});
        expect(app.assignToCourse('Bella', '06/04/2002')).to.eql({name: 'Bella', age: 14, course: 'teens'});
    });
    it('should assign person below 12 to kids group', function ()
    {
        expect(app.assignToCourse('Zack', '10/06/2010')).to.eql({name: 'Zack', age: 6, course: 'kids'});
        expect(app.assignToCourse('Jacob', '10/08/2011')).to.eql({name: 'Jacob', age: 5, course: 'kids'});
    });
    it('should thrown error when age is incorrect', function ()
    {
        expect(function ()
        {
            app.assignToCourse('Jacob')
        }).to.throw('Wrong data or too young!');
    });
});

describe('how spies and stubs works', function ()
{
    describe('spy', function ()
    {
        var calculateAgeSpy;

        before(function ()
        {
            calculateAgeSpy = sinon.spy(app, 'calculateAge');
            app.calculateAge('20/05/2000');
            app.assignToCourse('Jack', '10/10/1991');
        });
        after(function ()
        {
            calculateAgeSpy.restore();
        });

        describe('callCount', function ()
        {
            it('should call calculateAge function twice', function ()
            {
                expect(calculateAgeSpy).callCount(2);
            });
        });
        describe('calledWith', function ()
        {
            it('should call calculateAge with \'20/05/2000\' first time', function ()
            {
                expect(calculateAgeSpy.getCall(0)).calledWith('20/05/2000');
            });
            it('should call calculateAge with \'10/10/1991\' second time', function ()
            {
                expect(calculateAgeSpy.getCall(1)).calledWith('10/10/1991');
            });
        });
    });

    describe('stub', function ()
    {
        describe('returns', function ()
        {
            var calculateAgeStub;
            before(function ()
            {
                calculateAgeStub = sinon.stub(app, 'calculateAge').returns(10);
            });
            after(function ()
            {
                calculateAgeStub.restore();
            });
            it('should always return age equal 10', function ()
            {
                expect(app.assignToCourse('Jack', '10/10/1991')).to.eql({'age': 10, 'course': 'kids', 'name': 'Jack'});
                expect(app.assignToCourse('Joanna', '11/10/1800')).to.eql({'age': 10, 'course': 'kids', 'name': 'Joanna'});
                expect(app.assignToCourse('Matthew', '11/10/2016')).to.eql({'age': 10, 'course': 'kids', 'name': 'Matthew'});
            });
        });

        describe('withArgs', function ()
        {
            var calculateAgeStub;

            before(function ()
            {
                calculateAgeStub = sinon.stub(app, 'calculateAge');
                calculateAgeStub.withArgs('10/10/1991').returns(5);
                calculateAgeStub.withArgs('11/10/1800').returns(15);
                calculateAgeStub.withArgs('11/10/2016').returns(20);
            });
            after(function ()
            {
                calculateAgeStub.restore();
            });
            it('should return age equal 5', function ()
            {
                expect(app.assignToCourse('Jack', '10/10/1991')).to.eql({'age': 5, 'course': 'kids', 'name': 'Jack'});
            });
            it('should return age equal 15', function ()
            {
                expect(app.assignToCourse('Joanna', '11/10/1800')).to.eql({'age': 15, 'course': 'teens', 'name': 'Joanna'});
            });
            it('should return age equal 20', function ()
            {
                expect(app.assignToCourse('Matthew', '11/10/2016')).to.eql({'age': 20, 'course': 'adults', 'name': 'Matthew'});
            });
        });

        describe('callsFake', function ()
        {
            var fakeCalculateAge;

            before(function ()
            {
                fakeCalculateAge = sinon.stub(app, 'calculateAge').callsFake(function (date)
                {
                    var birthDate = new Date(date);
                    return birthDate.getYear();
                });
            });
            after(function ()
            {
                fakeCalculateAge.restore();
            });

            it('should use fake function', function ()
            {
                expect(app.assignToCourse('Jack', '10/10/1991')).to.eql({'age': 91, 'course': 'adults', 'name': 'Jack'});
            });
        });
    });
});


