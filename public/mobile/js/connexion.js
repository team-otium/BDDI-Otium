var socket = io.connect("http://"+ config.ip +":" + config.port.toString(), {transports: ['websocket'], upgrade: false})

let rooms = []

socket.on("getRoom", (data) => {
        rooms = data.computers
        console.log(rooms)
})

socket.on("computerDisconnected", () => {
    intro.connexion.comeBackTo("desktop")
})

socket.on("mobileConnected", () => {
    intro.connexion.transitionTo("mobile", questions.q1)
})