; ((doc) => {
    const oList = doc.querySelector('#list');
    const oMsg = doc.querySelector('#message');
    const oSendBtn = doc.querySelector('#send');
    let username = '';

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
        const msg = oMsg.value;

        if (!msg.trim().length) {
            return;
        }

        //发送
        ws.send(JSON.stringify({
            user: username,
            dateTime: new Date().getTime(),
            message: msg
        }))

        oMsg.value = '';
    }

    function handleOpen(e) {
        console.log('webSocket open:', e);
        username = localStorage.getItem('username');

        if (!username) {
            location.href = 'entry.html'
            return;
        }
    }

    function handleClose(e) {
        console.log('webSocket close:', e)

    }

    function handleError(e) {
        console.log('webSocket err:', e)
    }

    function handleMessage(e) {
        //e 接收到广播回来的数据
        //e.data -- 数据
        console.log('webSocket message', e);
        // console.log(e.data);
        const msgData = JSON.parse(e.data);
        oList.appendChild(createMsg(msgData));
    }

    function createMsg(data) {
        const { user, dateTime, message } = data;
        const oItem = doc.createElement('li');
        oItem.innerHTML = `
            <p>
                <span> ${user} </span>
                <i> ${new Date(dateTime)} </i>
            </p>
            <p>消息：${message}</p>
        `
        return oItem;
    }

    init();

})(document)