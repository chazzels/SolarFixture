/*
*	module for connecting to a websocket server.
*	TODO: remove as many references to that as possible.
*/

class WebSocketClient {
	
	/* websocket variables */
	private WebSocket: any = require("ws");
	private ws: any;
	
	/* option variables */
	private serverAddress: string = "ws://127.0.0.1:80/";
	
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
			
			that.serverAddress = targetAddress;
			
		}
		
		that.attemptConnection(that);
		
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
		
		let address = that.serverAddress.toString();
		
		// set attempting flag.
		that.attempting = true;
		
		if(that.connected === false) {
			
			console.log("SOCKET_CLIENT::CONNECTING", address);
			
			that.ws = new that.WebSocket(address);
			
			that.wsOpen(that.ws, that);
			
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
				
				console.log("SOCKET_CLIENT::CONNECTED");
				
			});
			
	}
	
	/* Close event handler for the websocket. */
	private wsClose(ws: any, that: any) {
		
		ws.on("close", function socketClose(code: any, reason: any) {
				
				console.log("SOCKET_CLIENT::CONNECTION_CLOSED:" + code, reason);
				
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
			console.log("SOCKET_CLIENT::CONNECTION_ERROR:", message);
			
		});
		
	}
	
}

export = WebSocketClient;