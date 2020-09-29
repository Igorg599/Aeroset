import React from 'react';
import './App.css';
import Scene from "./components/scene/Scene";
import StatePanel from "./components/statePanel/StatePanel";
import InstrumentalPanel from "./components/instrumentalPanel/InstrumentalPanel";
import HeaderPanel from "./components/headerPanel/HeaderPanel";
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import {ThemeProvider} from 'styled-components'
import Flex, {FlexItem} from 'styled-flex-component';
import {maxHeight} from "styled-system";

const theme = {
    flexboxgrid: {
        // Defaults
        gridSize: 12, // columns
        gutterWidth: 1, // rem
        outerMargin: 0, // rem
        mediaQuery: 'only screen',
        height: 1000,
        container: {
            sm: 46, // rem
            md: 61, // rem
            lg: 76  // rem
        },
        breakpoints: {
            xs: 0,  // em
            sm: 48, // em
            md: 64, // em
            lg: 75  // em
        }
    }
}

function App() {
    const {innerWidth: windowWidth, innerHeight: windowHeight} = window;

    return (
        <ThemeProvider theme={theme}>
            <Flex left full alignStretch contentStretch column wrap>
                <FlexItem order="1">
                    <HeaderPanel/>
                </FlexItem>
                <FlexItem order="2">
                    <InstrumentalPanel/>
                </FlexItem>
                <FlexItem order="3">
                    <Scene/>
                </FlexItem>
                <FlexItem order="4">
                    <StatePanel/>
                </FlexItem>
            </Flex>

            {/*<Grid fluid={true}>*/}
            {/*    <Row top="xs">*/}
            {/*        <Col xs={12} sm={12} md={12} lg={true}>*/}

            {/*        </Col>*/}
            {/*        <Col xs>*/}
            {/*            <HeaderPanel/>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*    <Row>*/}
            {/*        <Col xs={12} sm={12} md={12} lg={true}>*/}
            {/*            <InstrumentalPanel/>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*    <Row >*/}
            {/*        <Col xs>*/}
            {/*            <Scene/>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*    <Row>*/}
            {/*        <Col xs={12} sm={12} md={12} lg={true}>*/}
            {/*            <StatePanel/>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Grid>*/}
        </ThemeProvider>
    );
}

export default App;
