export const socketMiddleware = (wsActions) => {
    return (store) => {
        let socket = null;

        return (next) => (action) => {
            const {dispatch} = store;
            const {type} = action;
            const {
                wsConnect,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;

            if (type === wsConnect.type) {
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting());
            }

            if (socket) {

                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = (event) => {
                    dispatch(onError('Error'));
                };

                socket.onmessage = (event) => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);

                    dispatch(onMessage(parsedData));
                };

                socket.onclose = (event) => {
                    console.log('OnClose закрытие сокета');
                    dispatch(onClose());
                };

                if (wsDisconnect.type === type) {
                    console.log('закрытие сокета');
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};
