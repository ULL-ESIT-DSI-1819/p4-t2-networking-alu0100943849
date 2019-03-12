'use strict'
const EventEmitter = require('events').EventEmitter;
class LDJClient extends EventEmitter {
	constructor(stream) {
		if(stream == null) throw new Error("Stream vacio");
		super();
		let buffer = '';
		stream.on('data', data => {
			buffer += data;
			let boundary = buffer.indexOf('\n');
			while (boundary !== -1) {
				const input = buffer.substring(0, boundary);
				buffer = buffer.substring(boundary + 1);
				try {
					this.emit('message', JSON.parse(input));
				} catch(e){
					throw new Error("El mensaje enviado no es un JSON");
				}
				boundary = buffer.indexOf('\n');
			}
		});

		stream.on('close', () => {
			let boundary = buffer.indexOf('}');
			if(boundary !== -1){
				const input = buffer.substring(0, boundary);
				buffer = buffer.substring(boundary + 1);
				try {
					this.emit('message', JSON.parse(input));
				} catch(e) {
					throw new Error("El mensaje enviado no es un JSON");
				}
			} else {
				buffer = '';
			}
			this.emit('close');
		});
	}

	static connect(stream) {
		return new LDJClient(stream);
	}
}

module.exports = LDJClient;
