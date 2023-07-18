const Ws = require('ws');

; ((Ws) => {
    // ws:localhost:8000
    const server = new Ws.Server({ port: 8000 });

    const init = () => {
        bindEvent();
    };

    function bindEvent() {
        server.on('open', handleOpen);
        server.on('close', handleClose);
        server.on('error', handleError);
        server.on('connection', handleConnection);
    }

    function handleOpen() {
        console.log('webSocket open')
    }

    function handleClose() {
        console.log('webSocket close')

    }

    function handleError() {
        console.log('webSocket error')

    }

    function handleConnection(ws) {
        console.log('webSocket connection')

        ws.on('message', handleMessage);
    }

    function handleMessage(msg) {
        //前端发送过来的数据
        console.log(msg);
    }

    init();

})(Ws)