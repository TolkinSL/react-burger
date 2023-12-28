
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";

type TwsAction = {
    wsConnect: ActionCreatorWithPayload<string>;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;
    wsConnecting: ActionCreatorWithoutPayload;
    wsDisconnect: ActionCreatorWithoutPayload;
};

export const socketMiddleware = (wsActions: TwsAction): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;

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
                    // console.log('OnClose закрытие сокета');
                    dispatch(onClose());
                };

                if (wsDisconnect.type === type) {
                    // console.log('закрытие сокета');
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};
