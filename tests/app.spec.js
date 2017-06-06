'use strict';
var expect = require('chai').expect;
var app = require('../app/app');
var chai = require('chai');
var sinon  = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);


describe('generateMessage() tests', function ()
{
    it('should generate message when word is palindrome',function(){
        expect(app.generateMessage('ala')).to.eql({vowel:2, palindrome: true, message: 'ala is palindrome and has 2 vovels'})
        expect(app.generateMessage('lll')).to.eql({vowel:0, palindrome: true, message: 'lll is palindrome and has no vovels'})
    })

    it('should generate message when word is not palindrome',function(){
        expect(app.generateMessage('kot')).to.eql({vowel:1, palindrome: false, message: 'kot is not palindrome and has 1 vovels'})
        expect(app.generateMessage('lsg')).to.eql({vowel:0, palindrome: false, message: 'lsg is not palindrome and has no vovels'})
    })

    it('should throw expception when arguments are wrong', function(){
        expect(function(){app.generateMessage('')}).to.throw('Empty String!');
        expect(function () {app.generateMessage('123').to.throw('Not valid!');
        })
    })

});