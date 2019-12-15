import React from 'react';
import logo from './logo.svg';
import './App.css';
import LineTool from "./components/Tools/LineTool";
import Toolbar from "./components/Toolbar/Toolbar";
import SvgContainer from "./components/SvgContainer/SvgContainer";
import { Provider } from 'mobx-react';
import WebGlContainer from "./components/WebglContainer/WebGlContainer";
import Header from './components/Header/Header';
import CameraView from './components/CameraView/CameraView';
import LeftBar from './components/Sidebar/LeftBar/LeftBar';
import RightBar from './components/Sidebar/RightBar/RightBar';
import MousePoint from './components/Sidebar/MousePoint/MousePoint';
import { $ShapeStore } from './Store/ShapeStore';
import { app } from './Models/Application';
import MorphDialog from './components/Morph/MorphDialog';
import UltraWebGLContainer from './components/WebglContainer/UltraWebGLContainer';
import ContainerOfContainer from './components/WebglContainer/ContainerOfContainer';
const App: React.FC = () => {
    return (
        <>
            <div>
                <Toolbar />

                <Provider shapeStore={app.storeInstance}>
                    <ContainerOfContainer />
                    <MorphDialog />
                    <LeftBar />
                    <RightBar />
                    <MousePoint />
                </Provider>

            </div>



        </>
    );
}

export default App;
