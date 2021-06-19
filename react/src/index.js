import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.rendersubapp1 = (containerId, history) => {
  console.log(containerId)
  ReactDOM.render(
    <App history={history} />,
    document.getElementById(containerId)
  );
};

// unmount micro frontend function
window.unmountsubapp1 = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

// // Mount to root if it is not a micro frontend
if (!document.getElementById("childapp1")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
