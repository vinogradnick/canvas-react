import React from 'react';
import logo from './logo.svg';
import './App.css';
import LineTool from "./components/Tools/LineTool";
import Toolbar from "./components/Toolbar/Toolbar";
import SvgContainer from "./components/SvgContainer/SvgContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import { shapeStore } from './Store/ShapeStore';
import { Provider } from 'mobx-react';
import WebGlContainer from "./components/WebglContainer/WebGlContainer";
const App: React.FC = () => {
    return (
        <>
            <div className="container">
                <Provider shapeStore={shapeStore}>
                    <div className="svg-flex-container">
                        <SvgContainer />
                    </div>

                    {/* <WebGlContainer/> */}
                    <Sidebar />

                </Provider>


            </div>

            <Toolbar />
        </>
    );
}

export default App;
