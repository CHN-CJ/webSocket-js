; ((doc) => {
    const oList = doc.querySelector('#list');
    const oMsg = doc.querySelector('#message');
    const oSendBtn = doc.querySelector('#send');

    const ws = new WebSocket('ws:localhost:8000');

    const init = () => {
        bindEvent();
    }

    function bindEvent() {
        oSendBtn.addEventListener('click', handleSendBtnClick, false);
        ws.addEventListener('open', handleOpen, false);
        ws.addEventListener('close', handleClose, false);
        ws.addEventListener('error', handleError, false);
        ws.addEventListener('message', handleMessage, false);
    }

    function handleSendBtnClick() {

    }

    function handleOpen(e) {
        console.log('webSocket open:', e)
    }

    function handleClose(e) {
        console.log('webSocket close:', e)

    }

    function handleError(e) {
        console.log('webSocket err:', e)
    }

    function handleMessage(e) {
        //e 接受到广播回来的数据
        console.log('webSocket message')
    }

    init();

})(document)