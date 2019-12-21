import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import earcut from 'earcut';
import { TriangulateAlgo } from './Models/Shapes/ TriangulateAlg';
import { MuhinAlgo } from './Models/MuhinAlgo';
import Point3D from './Models/Point3D';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//const algo = new MuhinAlgo(new Point3D(2, 2), new Point3D(4, 1), new Point3D(7, 3), new Point3D(5, 4), new Point3D(7, 6));
//console.log(algo);