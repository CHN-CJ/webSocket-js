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
        // 接收前端发送过来的数据
        // 这里msg是个blob
        console.log(JSON.parse(msg));
        // server.clients -- 服务端连接到的所有客户端
        // 找到每个客户端，利用 c 将信息发送出去
        server.clients.forEach(function (c) {
            c.send(JSON.stringify(JSON.parse(msg)));
        })
    }

    init();

})(Ws)