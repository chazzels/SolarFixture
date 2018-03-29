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
		
		if(targetAddress !== undefined && targetAddress !== null) {
			
			this.serverAddress = targetAddress;
			
		}
		
		this.attemptConnection();
		
	}
	
	private startMonitor(that) {
		
		if(that.timerActive === false) { 
			
			console.log("SOCKET_CLIENT::MONITOR_STARTING");
			
			this.statusMonitorTimer(that);
			
		} else {
			
			console.log("SOCKET_CLIENT::MONITOR_RUNNING");
			
		}
		
	}
	
	private statusMonitorTimer(that) {
		
		setTimeout(function monitorTick() {
			
			that.statusMonitorLoop(that);
			
			that.statusMonitorTimer(that);
			
		}, 5000, that);
		
	}
	
	private statusMonitorLoop(that) {
		
		if(this.connected === false && this.attempting === false) {
			
			that.attemptConnection(that.serverAddress);
			
		} else if(this.connected === true && this.attempting === false) {
			
			//console.log("SOCKET_CLIENT::MONITOR_CHECK: PASS");
			
		}
		
	}
	
	private attemptConnection() {
		
		let that = this;
		
		that.attempting = true;
		
		if(that.connected === false) {
			
			console.log("SOCKET_CLIENT::CONNECTING", that.serverAddress.toString());
			
			this.ws = new that.WebSocket(that.serverAddress.toString());
			
			this.ws.on('open', function socketOpen() {
				
				that.attempting = false;
				
				that.connected = true;
				
				that.startMonitor(that);
				
			});
			
			this.ws.on('error', function socketError(error: any) {
				
				console.log("SOCKET_SERver::CONNECTION_ERROR:" + error.code);
				
				console.error(error);
				
				that.attempting = false;
				
				that.connected = false;
				
				that.startMonitor(that);
				
			});
		
		}
		
	}
	
}

export = WebSocketClient;