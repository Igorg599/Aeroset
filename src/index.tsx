import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import "./internationalization/i18n"; // import i18n (needs to be bundled ;))
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter, Route} from 'react-router-dom';
import {GlobalStyle} from "./globalStyle";
import Theme from "./views/components/theme";
import App from "./views/components/app";
import {CssBaseline} from "@material-ui/core";
import IoC from "./environment/ioc/IoC";
import {EventBusService} from "./services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "./environment/ioc/ServiceTypes";
import {SnackbarEvent} from "./views/components/snackbar/code/SnackbarEvent";
import i18next from "i18next";
import {checkAppUpdate} from "./utilities/workbox/checkUpdate";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <GlobalStyle/>
                <CssBaseline/>
                <Theme>
                    <Suspense fallback="">
                        <App/>
                    </Suspense>
                </Theme>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

function renderRefreshUI(registration : any, { _ }) {
    const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE)
    const event : SnackbarEvent = {
        message : i18next.t('new_version'),
        alertType : "info"
    }
    eventBus.send('SHOW_NEW_VERSION_EVENT',event)
}

window.onerror = function unhandledExceptionErrorHandler(errorMsg, url, lineNumber) {
    alert("Error occured: " + errorMsg);//or any message
    return false;
}

serviceWorker.register({
         onUpdate: (registration: any) => {
             console.log("New Version")
             // @ts-ignore
             return checkAppUpdate(registration, {render: renderRefreshUI});
         }
})
