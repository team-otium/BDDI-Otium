# BDDI Otium

## 🏃  Run the project
Be sure to have installed node.js before.

### Clone the repository :

    git clone https://github.com/RemiRuc/bddi_otium.git

### Know your private ip address :

To know your private ip address, run the following command on a termial :

#### Windows :

    ipconfig
    
#### Mac, Linux :

    ifconfig

Modify in public/dev/utils.js the value of config.ip with your private ip address :

    let config = {

		ip: "<your private ip address>",

		port: 1337

	}

### Launch the project

Run with the following command :

    node server.js
    
The web site run on http://localhost:1337

But to use it proprely, launch http://localhost:1337 on a desktop device and http://'your private ip address':1337/mobile on a mobile device.

## 👩‍🎨  Contributors

| <img src="https://avatars3.githubusercontent.com/u/36816385?s=400&v=4" width=100><br>[Nadia Essoubai](https://nadia-essoubai.fr/)<br><sub>💻 Developer</sub> | <img src="https://avatars1.githubusercontent.com/u/38033594?s=460&v=4" width=100><br>[Rémi Rucojevic](https://remiruc.com)<br><sub>💻 Developer</sub> | <img src="https://media.licdn.com/dms/image/C5603AQGkD-oozpO4GA/profile-displayphoto-shrink_800_800/0?e=1566432000&v=beta&t=iiaW2bN9mnPKAvVFXwzTENLE1ewvbODkqHhfM7ciZEc" width=100><br>[Julie Matring](https://www.linkedin.com/in/julie-marting-1b231b101/)<br><sub>🎨 Graphist</sub> | <img src="https://media.licdn.com/dms/image/C5603AQECAU1GVPktsQ/profile-displayphoto-shrink_800_800/0?e=1560988800&v=beta&t=wuvxVn77pePHC1hyB4-GebdiQjhjjJ4-ZGKIpS3FUP4" width=100><br>[Julien Warin](https://www.linkedin.com/in/jlnwrn/)<br><sub>🎨 Graphist</sub> |
|--|--|--|--|
