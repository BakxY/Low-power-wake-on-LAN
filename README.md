# Low power wake on LAN

The goal for this project is to create a device the doesn't consume much power in the target network. This will be achieved with a very small hardware that can be plugged into any standard USB A plug on a PC or by attaching a external 5V power supply to the device. The hardware will also need to be connected to the LAN using a standard RJ45 cable.

The hardware will periodicity request data from the API that is also a part of this project and will send a WOL packet to the device that should be woken up. To manage the devices a website will be created using nextjs. This website and API will have to be online all the time so the system can work properly. 

More infos are to come in the future.
