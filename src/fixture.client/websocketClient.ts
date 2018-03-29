/*
*	module for connecting to a websocket server.
*	
*/

class WebSocketClient {
	
	private WebSocket: any = require("ws");
	private ws: any;
	private serverAddress: string = "ws://127.0.0.1:80/";
	private connected: boolean = false;
	private attempting: boolean = false;
	private timerActive: boolean = false;
	
	constructor(targetAddress: string) {
		
		let that = this;
		
		console.log("SOCKET_CLIENT::STARTING");
		
		/* set target address passed into the constructor. */
		if(targetAddress !== undefined && targetAddress !== null) {
			
			this.serverAddress = targetAddress;
			
		}
		
		this.attemptConnection();
		
	}
	
	/*  */
	private startMonitor(that) {
		
		if(that.timerActive === false) { 
			
			console.log("SOCKET_CLIENT::MONITOR_STARTING");
			
			this.statusMonitorTimer(that);
			
			that.timerActive = true;
			
		} else {
			
			console.log("SOCKET_CLIENT::MONITOR_RUNNING");
			
		}
		
	}
	
	/* repeated timeout to continually monitor connection status. */
	private statusMonitorTimer(that) {
		
		setTimeout(function monitorTick() {
			
			that.statusMonitor(that);
			
			that.statusMonitorTimer(that);
			
		}, 5000, that);
		
	}
	
	/* loop that checks connection status and attempts to reconnect.  */
	private statusMonitor(that) {
		
		if(this.connected === false && this.attempting === false) {
			
			this.attemptConnection();
			
		} else if(this.connected === true && this.attempting === false) {
			
			//console.log("SOCKET_CLIENT::MONITOR_CHECK: PASS");
			
		}
		
	}
	
	/* attempt to connect to a websocket server. */
	private attemptConnection() {
		
		// set variables
		let that = this;
		
		let address = that.serverAddress.toString();
		
		// set attempting flag.
		that.attempting = true;
		
		if(that.connected === false) {
			
			console.log("SOCKET_CLIENT::CONNECTING", address);
			
			this.ws = new that.WebSocket(address);
			
			this.ws.on('open', function socketOpen() {
				
				that.attempting = false;
				
				that.connected = true;
				
				if(that.timerActive === false) {
					
					that.startMonitor(that);
					
				}
				
				console.log("SOCKET_CLIENT::CONNECTED");
				
			});
			
			this.ws.on("close", function socketClose(code: any, reason: any) {
				
				console.log("SOCKET_CLIENT::CONNECTION_CLOSED:" + code, reason);
				
				that.attempting = false;
				
				that.connected = false;
				
				if(that.timerActive === false) {
					
					that.startMonitor(that);
					
				}
				
			});
			
			this.ws.on("error", function socketError(error: any) {
				
				// set human readable error message.
				let message = "default";
				
				if(error.code === "ECONNREFUSED") {
					
					message = "connection refused!";
					
				}
				
				// set flags and start monitor if not running.
				that.attempting = false;
				
				that.connected = false;
				
				if(that.timerActive === false) {
					
					that.startMonitor(that);
					
				}
				
				console.log("SOCKET_CLIENT::CONNECTION_ERROR:", message);
				
			});
		
		} else {
			
			console.log("SOCKET_CLIENT::CONNECTION_ACTIVE:", "nothing changed");
			
		}
		
	}
	
}

export = WebSocketClient;