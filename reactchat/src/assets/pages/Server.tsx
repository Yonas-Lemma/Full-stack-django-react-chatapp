import { useState } from 'react';
import useWebSocket from 'react-use-websocket';

const socketurl =  'ws://127.0.0.1:8000/ws/test/';



const Server = () =>{
    const [mesaage, setMesaage] = useState("");
    const {sendJsonMessage} = useWebSocket (socketurl,{
        onOpen: ()=>{
            console.log("connected");
        },
        onClose: ()=>{
            console.log("closed");
        },
        onError: ()=>{
            console.log("closed",event);
        },
        onMessage: (msg) =>{
            setMesaage(msg.data)
        }
    
    });

    const sendHello = ()=>{
        const message = { text: "hello"}
        sendJsonMessage(message)
    };

    return (<div>
        <button onClick={sendHello}> Send Hello</button>
        <div> Recivied Data: {mesaage}</div>

    </div>
    );
};
export default Server;