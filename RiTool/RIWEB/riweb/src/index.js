import React from 'react';
import ReactDom from 'react-dom';
import App from './component/App';
import 'semantic-ui-css/semantic.min.css';

ReactDom.render(
    <App />,
    document.querySelector('#root')
);