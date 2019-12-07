import React from 'react';
import logo from './logo.svg';
import './App.css';
import LineTool from "./components/Tools/LineTool";
import Toolbar from "./components/Toolbar/Toolbar";
import SvgContainer from "./components/SvgContainer/SvgContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import { Provider } from 'mobx-react';
import WebGlContainer from "./components/WebglContainer/WebGlContainer";
import Header from './components/Header/Header';
import { ShapeStore, shapeStore } from './Store/ShapeStore';
import CameraView from './components/CameraView/CameraView';
const App: React.FC = () => {
    return (
        <>

            <div className="container">
                <CameraView>
                    <Provider shapeStore={shapeStore}>
                        <SvgContainer />
                    </Provider>
                </CameraView>


                <Provider shapeStore={shapeStore}>



                    <Sidebar />

                </Provider>


            </div>
            <Toolbar />

        </>
    );
}

export default App;
