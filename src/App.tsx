import React from 'react';
import './App.css';
import Toolbar from "./components/Toolbar/Toolbar";
import {Provider} from 'mobx-react';
import LeftBar from './components/Sidebar/LeftBar/LeftBar';
import RightBar from './components/Sidebar/RightBar/RightBar';
import {app} from './Models/Application';
import MorphDialog from './components/Morph/MorphDialog';
import ContainerOfContainer from './components/WebglContainer/ContainerOfContainer';
import MousePoint from './components/Sidebar/MousePoint/MousePoint';

const App: React.FC = () => {
    return (
        <>
            <div>
                <Toolbar/>

                <Provider shapeStore={app.storeInstance}>
                    <ContainerOfContainer/>
                    <MorphDialog/>
                    <LeftBar/>
                    <RightBar/>
                    <MousePoint/>
                </Provider>

            </div>


        </>
    );
}

export default App;
