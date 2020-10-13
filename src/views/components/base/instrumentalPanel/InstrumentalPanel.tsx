import IoC from "../../../../environment/ioc/IoC";
import 'reflect-metadata';
import React, {Fragment} from "react";
import IconButton from "@material-ui/core/IconButton";
import {ThemeProvider} from "styled-components";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from "@material-ui/core/colors/green";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import Tooltip from "@material-ui/core/Tooltip";
import WindowPanelsProvider from "../../../../services/windowPanelsService/windowPanels/WindowPanelProvider";
import WindowPanelTypes from "../../../../services/windowPanelsService/WindowPanelTypes";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState, useAppDispatch} from "../../../../store/store";
import {pcsLoadFileAction} from "../../../../store/domains/instrumentalPanel/sections/pointCloudSystemSection/reductors/pointCloudSystemSectionReducer";

export const InstrumentalPanel = () => {
    const instrumentalPanelState = useSelector<ApplicationState>(state => state);
    const dispatch = useAppDispatch();

    function showCloudSystemFiltersPanel() {
        const windowPanelsProvider: WindowPanelsProvider = IoC.get(Symbol.for("WINDOW_PANELS_SERVICE"));

        if (!windowPanelsProvider.windowIsOpened(WindowPanelTypes.PointCloudFiltersWindow))
            windowPanelsProvider.showWindowPanel(WindowPanelTypes.PointCloudFiltersWindow);
    }

    const redTheme = createMuiTheme({palette: {primary: green}});
    return (

        <ThemeProvider theme={redTheme}>
            <div style={{height: 35, background: "#ef8354"}}>
                <Fragment>
                    <input
                        color="primary"
                        type="file"
                        onChange={(e) => {
                            e.preventDefault();
                            const file: File = e.target.files?.[0] as File;
                            if (file && file !== undefined) {
                                const loadFileAction = pcsLoadFileAction(file);
                                dispatch(loadFileAction);
                            }
                        }}
                        id="icon-button-file"
                        style={{display: 'none',}}/>
                    <Tooltip title="Загрузить файл с облаком точек" style={{marginLeft: 5}}>
                        <label htmlFor="icon-button-file">
                            <IconButton
                                component="span"
                                size="small"
                                color="primary">
                                <CloudUploadIcon style={{color: "white"}}/>
                            </IconButton>
                        </label>
                    </Tooltip>
                </Fragment>
                <Tooltip title="Открыть панель с фильтрами облака точек">
                    <IconButton size={"small"}
                                color={"primary"}
                                onClick={showCloudSystemFiltersPanel}
                                style={{verticalAlign: "bottom", marginLeft: 10}}>
                        <FilterTiltShiftIcon style={{color: "white"}}/>
                    </IconButton>
                </Tooltip>
            </div>
        </ThemeProvider>
    );
};