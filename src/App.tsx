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
const App: React.FC = () => {
    return (
        <>

            <div className="container">
                <Provider shapeStore={shapeStore}>


                    <SvgContainer />
                    <Sidebar />

                </Provider>


            </div>
            <Toolbar />

        </>
    );
}

export default App;
