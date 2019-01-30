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
			resolve()
		})
		socket.on('disconnect', function () {
		    console.log('disconnected from server');
		});
	});
}

export function commitQueue(q) {
	socket.emit('qfeed-commit-queue', q)
}

export function commitPrep(q) {
	socket.emit('qfeed-commit-prep', q)
}

export function commitShip(q) {
	socket.emit('qfeed-commit-ship', q)
}

export function onNewOrder(cb) {
	socket.on('qfeed-new-order', order => cb(order));
}

export function onQueueUpdate(cb) {
	socket.on('qfeed-update-queue', orders => cb(orders));
}
