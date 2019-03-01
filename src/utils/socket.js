import io from 'socket.io-client';

let socket;
let socketToken = '';

// basic connectivity funcs
let onConnectFunc = () => {};
let onConnectErrorFunc = () => {};
let onReconnectAttemptFunc = () => {};
let onDisconnectFunc = () => {};

// custom event funcs
let onNewOrderFunc = () => {};
let onQueueUpdateFunc = () => {};

export function setToken(token) {
	socketToken = token;
}

export function initSocket() {
	// if no socket, errors
	if (socketToken === '') {
		console.log('token is blank');
		onDisconnectFunc('connect_error');
	}

	socket = io(process.env.REACT_APP_BACKEND_URL, {
		"path": "/socket/",
		"reconnectionAttempts":"20",
		"reconnectionDelay":"5000",
	})

	socket.on('connect', function() {
		socket.emit('register', socketToken, function(response){
			if (response === "okbro")
				onConnectFunc('connected');
			else {
				console.log('invalid response from server');
				onConnectErrorFunc('server_error');
				socket.close();
			}
		})
	})

	socket.on('connect_error', function(error) {
		console.log('error connecting to socket:',error);
		onConnectErrorFunc('connect_error');
	})
	socket.on('connect_timeout', function(timeout) {
		console.log('timed out when connecting to socket:',timeout);
		onConnectErrorFunc('connect_timeout');
	})
	socket.on('reconnect_attempt', function(number) {
		console.log('attempting to connect #', number);
		onReconnectAttemptFunc('reconnecting');
	})
	socket.on('disconnect', function (reason) {
		console.log('disconnected from server with reason', reason);
		onDisconnectFunc('disconnected');
	});

	socket.on('qfeed-new-order', order => onNewOrderFunc(order));
	socket.on('qfeed-update-queue', orders => onQueueUpdateFunc(orders));
}

export function commitQueue(q) {
	socket.emit('qfeed-commit-queue', q, function(response) {
		if (response === 'okbro') {
			console.log('okbro received')
			return
		} else {
			console.log('no okbro?');
			onConnectErrorFunc('error');
			setTimeout(() => {socket.open()},2000);
		}
	});
}

export function commitPrep(q) {
	socket.emit('qfeed-commit-prep', q, function(response) {
		if (response === 'okbro') {
			console.log('okbro received')
			return
		} else {
			console.log('no okbro?');
			onConnectErrorFunc('error');
			setTimeout(() => {socket.open()},2000);
		}
	});
}

export function commitShip(q) {
	socket.emit('qfeed-commit-ship', q, function(response) {
		if (response === 'okbro') {
			console.log('okbro received')
			return
		} else {
			console.log('no okbro?');
			onConnectErrorFunc('error');
			setTimeout(() => {socket.open()},2000);
		}
	});
}

export function commitApproach(q) {
	socket.emit('qfeed-commit-approach', q, function(response) {
		if (response === 'okbro') {
			console.log('okbro received')
			return
		} else {
			console.log('no okbro?');
			onConnectErrorFunc('error');
			setTimeout(() => {socket.open()},2000);
		}
	});
}

// listeners for basic connectivity states
export function onConnect(cb) {
	onConnectFunc = cb;
}

export function onConnectError(cb) {
	onConnectErrorFunc = cb;
}

export function onReconnectAttempt(cb) {
	onReconnectAttemptFunc = cb;
}

export function onDisconnect(cb) {
	onDisconnectFunc = cb;
}

// listeners for custom events
export function onNewOrder(cb) {
	onNewOrderFunc = cb;

}

export function onQueueUpdate(cb) {
	onQueueUpdateFunc = cb;

}
