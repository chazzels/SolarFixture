/*
*	module for connecting to a websocket server.
*	TODO: remove as many references to that as possible.
*	TODO: add message relay functionality for other.
*	TODO: add unique id (this.deviceId) which is tied to installation or pre-assigned. created unless found.
*/

class WebSocketNodeClient {
	
	/* websocket variables */
	private WebSocket: any = require("ws");
	private ws: any;
	private connectionActive: boolean = false;
	private messageCallback: any = null;
	
	/* module variables */
	private fs: any = require('fs');
	private clientId: string = "1234-5678-90AB";
	private deviceId: string = "1234-5678-90AB";
	private test: string;
	/* option variables */
	private SERVER_ADDRESS: string = "ws://127.0.0.1:80/";
	
	/* status variables */
	private connected: boolean = false;
	private attempting: boolean = false;
	private timerActive: boolean = false;
	
	/* constant variables */
	private readonly RECONNECT_WAIT: number = 2500;
	
	constructor(targetAddress: string) {
		
		let that = this;
		
		console.log("SOCKET_CLIENT::STARTING");
		
		// set target address passed into the constructor.
		if(targetAddress !== undefined && targetAddress !== null) {
			
			that.SERVER_ADDRESS = targetAddress;
			
		}
		
		this.deviceId = this.fs.readFileSync('/var/lib/dbus/machine-id', 'utf8').trim();
		
		that.attemptConnection(that);
		
	}
	
	registerMessageListener(callback: any) {
		
		if(typeof callback === 'function') {
			
			this.messageCallback = callback;
			
		} else {
			
			console.log("SOCKET_CLIENT::MESSAGE_LISTENER: object passed is not a function.")
			
		}
		
	}
	
	/* start the connection monitor */
	private startMonitor(that: any) {
		
		if(that.timerActive === false) { 
			
			console.log("SOCKET_CLIENT::MONITOR_STARTING");
			
			that.connectionMonitorTimer(that);
			
			that.timerActive = true;
			
		} else {
			
			console.log("SOCKET_CLIENT::MONITOR_RUNNING");
			
		}
		
	}
	
	/** repeated timeout to continually monitor connection status. */
	private connectionMonitorTimer(that: any) {
		
		setTimeout(function monitorTick() {
			
			that.connectionMonitor(that);
			
			that.connectionMonitorTimer(that);
			
		}, 5000, that);
		
	}
	
	/* loop that checks connection status and attempts to reconnect. */
	/* checks the connection connected and attempting flag. */
	private connectionMonitor(that: any) {
		
		if(that.connected === false && that.attempting === false) {
			
			that.attemptConnection(that);
			
		}
		
	}
	
	/* attempt to establish a connection to a websocket server. */
	private attemptConnection(that: any) {
		
		let address = that.SERVER_ADDRESS.toString();
		
		// set attempting flag.
		that.attempting = true;
		
		if(that.connected === false) {
			
			console.log("SOCKET_CLIENT::CONNECTING", address,
				new Date().toTimeString());
			
			that.ws = new that.WebSocket(address);
			
			that.wsOpen(that.ws, that);
			
			that.wsMessage(that.ws, that);
			
			that.wsClose(that.ws, that);
			
			that.wsError(that.ws, that);
		
		} else {
			
			console.log("SOCKET_CLIENT::CONNECTION_ACTIVE:", "nothing changed");
			
		}
		
	}
	
	/* connection opened event handler for the websocket. */
	private wsOpen(ws: any, that: any) {
		
		ws.on('open', function socketOpen() {
				
				// set status flags.
				that.attempting = false;
				
				that.connected = true;
				
				// start monitor if not already active.
				if(this.timerActive === false) {
					
					that.startMonitor(that);
					
				}
				
				console.log("SOCKET_CLIENT::CONNECTED", new Date().toTimeString());
				
			});
			
	}
	
	/* message event handler for the websocket. */
	private wsMessage(ws: any, that: any) {
		
		ws.on('message', function socketMessage(data) {
			
			if(that.connectionActive) {
			// if the connnection is validated by the server 
				
				if(that.messageCallback !== null) {
				// call back must be set.
					
					that.messageCallback(data);
					
				}
				
			} else {
			// if the connection has not been validated by the server. 
				
				that.clientId = data;
				
				ws.send(that.deviceId+","+"RGBW");
				
				console.log("SOCKET_CLIENT::DEVICE_ID:", that.deviceId);
				
				console.log("SOCKET_CLIENT::CLIENT_ID:", that.clientId);
				
			}
			
		});
		
	}
	
	/* close event handler for the websocket. */
	private wsClose(ws: any, that: any) {
		
		ws.on("close", function socketClose(code: any, reason: any) {
				
				// set status flags.
				that.attempting = false;
				
				that.connected = false;
				
				// start monitor if not already active.
				if(that.timerActive === false) {
					
					that.startMonitor(that);
					
				}
				
			});
			
	}
	
	/* Error event handler for the websocket. */
	private wsError(ws: any, that: any) {
		
		ws.on("error", function socketError(error: any) {
			
			// set human readable error message.
			let message = "default";
			
			if(error.code === "ECONNREFUSED") {
				
				message = "connection refused!";
				
			} else {
				
				message = error.code;
				
			}
			
			// set status flags.
			that.attempting = false;
			
			that.connected = false;
			
			// start monitor if not already active.
			if(that.timerActive === false) {
				
				that.startMonitor(that);
				
			}
			
			// log the error recieved.
			console.log("SOCKET_CLIENT::CONNECTION_ERROR:", message, 
				new Date().toTimeString());
			
		});
		
	}
	
}

export = WebSocketNodeClient;