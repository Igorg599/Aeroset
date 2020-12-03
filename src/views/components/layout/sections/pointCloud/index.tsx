import React, {Fragment} from "react";
import {useAppDispatch} from "../../../../../store/store";
import {
    pointCloudLoadFile,
    showPointCloudFiltersPanel
} from "../../../../../store/ui/sections/pointCloudSection/pointCloudSection";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {withTheme} from "styled-components";
import {Theme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {ClearPointCloudIcon, OpenPointCloudFiltersIcon, AppPublishIcon} from "../../../shared/icons";

const PointCloudSection: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    return (
        <div>
            <Fragment>
                <input
                    color="primary"
                    type="file"
                    onChange={(e) => {
                        e.preventDefault();
                        const file: File = e.target.files?.[0] as File;
                        if (file && file !== undefined) {
                            dispatch(pointCloudLoadFile(file));
                        }
                        e.preventDefault()
                    }}
                    id="icon-button-file"
                    style={{display: 'none',}}/>
                <Tooltip title={t('load_file_with_point_cloud')}>
                    <label htmlFor="icon-button-file">
                        <IconButton
                            component="span"
                            size="small"
                            color="primary">
                            <AppPublishIcon/>
                        </IconButton>
                    </label>
                </Tooltip>
            </Fragment>
            <Tooltip title={t('open_panel_point_cloud_filters')}>
                <IconButton size={"small"}
                            color={"primary"}
                            onClick={() =>
                                dispatch(showPointCloudFiltersPanel())}
                            style={{verticalAlign: "bottom", marginLeft: 8}}>
                    <OpenPointCloudFiltersIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={t('point_cloud_clear')}>
                <IconButton size={"small"}
                            color={"primary"}
                            onClick={() => null}
                            style={{verticalAlign: "bottom", marginLeft: 8}}>
                    <ClearPointCloudIcon/>
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default withTheme(PointCloudSection);