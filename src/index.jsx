import './scss/site.scss';
import Index from './script/components/index/Root';
// import MockProvider from './components/index/MockProvider'
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(
	<Index msg={window.initDatas} />,
	document.getElementById('react-index')
);