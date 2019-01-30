import io from 'socket.io-client';

let socket;

export function initSocket(token) {
	return new Promise((resolve, reject) => {
		socket = io('http://localhost:7000', {
			"path": "/socket/",
			"reconnectionAttempts":"20",
			"reconnectionDelay":"5000",
		})
		socket.on('connect', function() {
			socket.emit('register', token, function(response){
				if (response === "okbro") resolve()
				else reject();
			})
		})
		socket.on('disconnect', function () {
		    console.log('disconnected from server');
		});
	});
}

export function commitQueue(q) {
	return new Promise((resolve, reject) => {
		socket.emit('qfeed-commit-queue', q, function(response) {
			resolve(response);
		})
		setTimeout(function() {
			reject("something went wrong");
		}, 5000);
	});
}
