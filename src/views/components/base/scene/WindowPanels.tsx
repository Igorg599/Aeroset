import * as React from "react";
import Draggable from 'react-draggable';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {Button, TextField} from "@material-ui/core";
import {
    closePointCloudFiltersPanel, pointCloudFiltersPanelActivitySelector,
    showPointCloudFiltersPanel
} from "../../../../store/ui/sections/pointCloudSection/pointCloudSection";
import {ApplicationState, useAppDispatch} from "../../../../store/store";
import {createSelector, Selector} from "@reduxjs/toolkit";
import {
    changeXFromLimit,
    changeXToLimit,
    changeYFromLimit,
    changeYToLimit,
    changeZFromLimit,
    changeZToLimit,
    getPointCloudFiltersPanelSelector,
    PointCloudFiltersState
} from "../../../../store/ui/panels/pointCloudFiltersPanel/pointCloudFiltersPanel";
import {useSelector} from "react-redux";
import {isNumeric} from "rxjs/internal-compatibility";

const dataSelector = createSelector([pointCloudFiltersPanelActivitySelector,
    getPointCloudFiltersPanelSelector], (isActive: boolean, filtersState: PointCloudFiltersState) =>
    ({
        isActive,
        filtersState
    })
);

const WindowPanels = () => {
    const dispatch = useAppDispatch()
    const props = useSelector(dataSelector)
    const filter = props.filtersState

    return (
        <div style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            background: "transparent",
            pointerEvents: "none"
        }}>
            <Draggable bounds="parent">
                <div className="box" style={
                    {
                        height: 255,
                        width: 250,
                        background: "#e8e8e8",
                        borderRadius: 5,
                        pointerEvents: "auto",
                        visibility: props.isActive ? "visible" : "hidden"
                    }}>
                    <div>
                        <div style={{
                            cursor: "move",
                            background: "#e6739f",
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            color: "white",
                            textAlign: "center",
                            height: 30
                        }}>
                            <text style={{
                                marginTop: "4px",
                                alignContent: "center"
                            }}>
                                Фильтр облака точек
                            </text>
                            <Tooltip title="Закрыть"
                                     style={{
                                         float: "right"
                                     }}>
                                <label>
                                    <IconButton
                                        component="span"
                                        size="small"
                                        onClick={() => dispatch(closePointCloudFiltersPanel())}
                                        color="primary">
                                        <CloseIcon style={{color: "white"}}/>
                                    </IconButton>
                                </label>
                            </Tooltip>
                        </div>
                        <div style={{marginLeft: "13px"}}>
                            <div style={{marginTop: 16}}>
                                <TextField
                                    id="outlined-number"
                                    label="X FROM"
                                    type="number"
                                    name={"x-from"}
                                    step="0.1"
                                    value={filter.filterXFromLimit}
                                    onChange={event => {
                                        const value = event.target.value;
                                        if (isNumeric(value))
                                            dispatch(changeXFromLimit(value))
                                    }}
                                    style={{width: 100, height: 20}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 0.1
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    id="outlined-number"
                                    label="X TO"
                                    type="number"
                                    name={"x-to"}
                                    step="0.1"
                                    value={filter.filterXToLimit}
                                    onChange={event => dispatch(changeXToLimit(event.target.value))}
                                    style={{width: 100, marginLeft: 24}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 0.1
                                    }}
                                    variant="outlined"/>
                            </div>
                            <div style={{marginTop: 12}}>
                                <TextField
                                    id="outlined-number"
                                    label="Y FROM"
                                    type="number"
                                    name={"y-from"}
                                    step="0.1"
                                    value={filter.filterYFromLimit}
                                    onChange={event => dispatch(changeYFromLimit(event.target.value))}
                                    style={{width: 100, height: 20}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 0.1
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Y TO"
                                    type="number"
                                    name={"y-to"}
                                    step="0.1"
                                    value={filter.filterYToLimit}
                                    onChange={event => dispatch(changeYToLimit(event.target.value))}
                                    style={{width: 100, marginLeft: 24}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 0.1
                                    }}
                                    variant="outlined"/>
                            </div>
                            <div style={{marginTop: 12}}>
                                <TextField
                                    id="outlined-number"
                                    label="Z FROM"
                                    type="number"
                                    name={"z-from"}
                                    step="0.1"
                                    value={filter.filterZFromLimit}
                                    onChange={event => dispatch(changeZFromLimit(event.target.value))}
                                    style={{width: 100, height: 20}}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    inputProps={{
                                        step: 0.1
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Z TO"
                                    type="number"
                                    name={"z-to"}
                                    step="0.1"
                                    value={filter.filterZToLimit}
                                    onChange={event => dispatch(changeZToLimit(event.target.value))}
                                    style={{width: 100, marginLeft: 24}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 0.1
                                    }}
                                    variant="outlined"/>
                            </div>
                        </div>
                    </div>

                </div>
            </Draggable>
        </div>
    );
}

export default WindowPanels;