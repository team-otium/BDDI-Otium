var socket = io.connect("https://"+ config.ip +":" + config.port.toString(), {transports: ['websocket'], upgrade: false})

let rooms = []

socket.on("getRoom", (data) => {
        rooms = data.computers
        console.log(rooms)
})

socket.on("computerDisconnected", () => {
    intro.connexion.comeBackTo("mobile")
})

socket.on("mobileConnected", () => {
    intro.connexion.transitionTo("mobile", intro.button_valider)
})