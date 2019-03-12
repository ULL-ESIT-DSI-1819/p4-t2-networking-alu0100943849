'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
	let stream = null;
	let client = null;

	beforeEach(() => {
		stream = new EventEmitter();
		client = new LDJClient(stream);
	});

	it('should emit a message event from a single data event', done => {
		client.on('message', message => {
			assert.deepEqual(message, {foo: 'bar'});
			done();
		});
		stream.emit('data', '{"foo":"bar"}\n');
	});
	
	//Add a unit test for a single message that is split over two or more data events from the stream
	it('should emit a message event from split data events', done => {
		client.on('message', message => {
			assert.deepEqual(message, {foo: 'bar'});
				done();
		});
		stream.emit('data', '{"foo":');
		process.nextTick(() => stream.emit('data', '"bar"}\n'));
	});
	//Add a unit test that passes in null to the LDJClient constructor, and asserts that an error is thrown
	it('Si se le pasa un parametro null al constructor dara un error', done => {
    		assert.throws(() => {
      			new LDJClient(null);
    		});
    		done();
  	});

	//Write a test case that sends a data event that is not JSON. What do you think on how to manage this case?
	it('Si el mensaje no es un JSON se mostrará una excepcion', done => {
		assert.throws(() => {
			stream.emit('data', '{"foo:\n');
		});
		done();
	});

});
