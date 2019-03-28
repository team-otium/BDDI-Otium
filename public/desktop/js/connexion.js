var socket = io.connect("http://"+ config.ip +":" + config.port.toString())


function createConnexionId () {
    let id = randomInt(100000,999999)
    
    /** TO DO : Check if id is unique */
    
    document.getElementById("id").innerHTML = id
    
    // Emit id to server when computer is connected
    socket.emit('computerConnexion', {id})

    // Start the experience when a mobile is connected to the desktop
    socket.on("mobileConnected", () => {
        intro.connexion.transitionTo("desktop", questions.q1)
    })

    // Cancel the the experience if the mobile is disconnected
    socket.on("mobileDisconnected", () => {
        intro.connexion.comeBackTo("desktop")
    })
}
