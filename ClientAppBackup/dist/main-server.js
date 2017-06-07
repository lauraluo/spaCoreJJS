(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("./vendor");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(6);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(140);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(139);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(141);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    increment: function () { return ({ type: 'INCREMENT_COUNT' }); },
    decrement: function () { return ({ type: 'DECREMENT_COUNT' }); }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
exports.reducer = function (state, action) {
    switch (action.type) {
        case 'INCREMENT_COUNT':
            return { count: state.count + 1 };
        case 'DECREMENT_COUNT':
            return { count: state.count - 1 };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { count: 0 };
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var domain_task_1 = __webpack_require__(19);
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    requestWeatherForecasts: function (startDateIndex) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        if (startDateIndex !== getState().weatherForecasts.startDateIndex) {
            var fetchTask = domain_task_1.fetch("/api/SampleData/WeatherForecasts?startDateIndex=" + startDateIndex)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
            });
            domain_task_1.addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { startDateIndex: null, forecasts: [], isLoading: false };
exports.reducer = function (state, action) {
    switch (action.type) {
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,
                isLoading: true
            };
        case 'RECEIVE_WEATHER_FORECASTS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,
                    isLoading: false
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(21);
var redux_thunk_1 = __webpack_require__(20);
var react_router_redux_1 = __webpack_require__(4);
var store_1 = __webpack_require__(18);
function configureStore(history, initialState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    var windowIfDefined = typeof window === 'undefined' ? null : window;
    // If devTools is installed, connect to it
    var devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension;
    var createStoreWithMiddleware = redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default, react_router_redux_1.routerMiddleware(history)), devToolsExtension ? devToolsExtension() : function (f) { return f; })(redux_1.createStore);
    // Combine all reducers and instantiate the app-wide store instance
    var allReducers = buildRootReducer(store_1.reducers);
    var store = createStoreWithMiddleware(allReducers, initialState);
    // Enable Webpack hot module replacement for reducers
    if (false) {
        module.hot.accept('./store', function () {
            var nextRootReducer = require('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }
    return store;
}
exports.default = configureStore;
function buildRootReducer(allReducers) {
    return redux_1.combineReducers(Object.assign({}, allReducers, { routing: react_router_redux_1.routerReducer }));
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var react_router_dom_1 = __webpack_require__(2);
var Layout_1 = __webpack_require__(16);
var Home_1 = __webpack_require__(15);
var FetchData_1 = __webpack_require__(14);
var Counter_1 = __webpack_require__(13);
exports.routes = React.createElement(Layout_1.Layout, null,
    React.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: Home_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/counter', component: Counter_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/fetchdata/:startDateIndex?', component: FetchData_1.default }));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(131);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(136);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(138);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var react_redux_1 = __webpack_require__(3);
var server_1 = __webpack_require__(11);
var react_router_dom_1 = __webpack_require__(2);
var react_router_redux_1 = __webpack_require__(4);
var history_1 = __webpack_require__(10);
var aspnet_prerendering_1 = __webpack_require__(9);
var routes_1 = __webpack_require__(8);
var configureStore_1 = __webpack_require__(7);
exports.default = aspnet_prerendering_1.createServerRenderer(function (params) {
    return new Promise(function (resolve, reject) {
        // Prepare Redux store with in-memory history, and dispatch a navigation event
        // corresponding to the incoming URL
        var store = configureStore_1.default(history_1.createMemoryHistory());
        store.dispatch(react_router_redux_1.replace(params.location));
        // Prepare an instance of the application and perform an inital render that will
        // cause any async tasks (e.g., data access) to begin
        var routerContext = {};
        var app = (React.createElement(react_redux_1.Provider, { store: store },
            React.createElement(react_router_dom_1.StaticRouter, { context: routerContext, location: params.location.path, children: routes_1.routes })));
        server_1.renderToString(app);
        // If there's a redirection, just send this information back to the host application
        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }
        // Once any async tasks are done, we can perform the final render
        // We also send the redux store state, so the client can continue execution where the server left off
        params.domainTasks.then(function () {
            resolve({
                html: server_1.renderToString(app),
                globals: { initialReduxState: store.getState() }
            });
        }, reject); // Also propagate any errors back into the host application
    });
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var react_redux_1 = __webpack_require__(3);
var CounterStore = __webpack_require__(5);
var Counter = (function (_super) {
    __extends(Counter, _super);
    function Counter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Counter.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null,
            React.createElement("h1", null, "Counter"),
            React.createElement("p", null, "This is a simple example of a React component."),
            React.createElement("p", null,
                "Current count: ",
                React.createElement("strong", null, this.props.count)),
            React.createElement("button", { onClick: function () { _this.props.increment(); } }, "Increment"));
    };
    return Counter;
}(React.Component));
// Wire up the React component to the Redux store
exports.default = react_redux_1.connect(function (state) { return state.counter; }, // Selects which state properties are merged into the component's props
CounterStore.actionCreators // Selects which action creators are merged into the component's props
)(Counter);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var react_router_dom_1 = __webpack_require__(2);
var react_redux_1 = __webpack_require__(3);
var WeatherForecastsState = __webpack_require__(6);
var FetchData = (function (_super) {
    __extends(FetchData, _super);
    function FetchData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FetchData.prototype.componentWillMount = function () {
        // This method runs when the component is first added to the page
        var startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        this.props.requestWeatherForecasts(startDateIndex);
    };
    FetchData.prototype.componentWillReceiveProps = function (nextProps) {
        // This method runs when incoming props (e.g., route params) change
        var startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;
        this.props.requestWeatherForecasts(startDateIndex);
    };
    FetchData.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("h1", null, "Weather forecast"),
            React.createElement("p", null, "This component demonstrates fetching data from the server and working with URL parameters."),
            this.renderForecastsTable(),
            this.renderPagination());
    };
    FetchData.prototype.renderForecastsTable = function () {
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Date"),
                    React.createElement("th", null, "Temp. (C)"),
                    React.createElement("th", null, "Temp. (F)"),
                    React.createElement("th", null, "Summary"))),
            React.createElement("tbody", null, this.props.forecasts.map(function (forecast) {
                return React.createElement("tr", { key: forecast.dateFormatted },
                    React.createElement("td", null, forecast.dateFormatted),
                    React.createElement("td", null, forecast.temperatureC),
                    React.createElement("td", null, forecast.temperatureF),
                    React.createElement("td", null, forecast.summary));
            })));
    };
    FetchData.prototype.renderPagination = function () {
        var prevStartDateIndex = this.props.startDateIndex - 5;
        var nextStartDateIndex = this.props.startDateIndex + 5;
        return React.createElement("p", { className: 'clearfix text-center' },
            React.createElement(react_router_dom_1.Link, { className: 'btn btn-default pull-left', to: "/fetchdata/" + prevStartDateIndex }, "Previous"),
            React.createElement(react_router_dom_1.Link, { className: 'btn btn-default pull-right', to: "/fetchdata/" + nextStartDateIndex }, "Next"),
            this.props.isLoading ? React.createElement("span", null, "Loading...") : []);
    };
    return FetchData;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.weatherForecasts; }, // Selects which state properties are merged into the component's props
WeatherForecastsState.actionCreators // Selects which action creators are merged into the component's props
)(FetchData);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("h1", null, "Hello, world!"),
            React.createElement("p", null, "Welcome to your new single-page application, built with:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { href: 'https://get.asp.net/' }, "ASP.NET Core"),
                    " and ",
                    React.createElement("a", { href: 'https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' }, "C#"),
                    " for cross-platform server-side code"),
                React.createElement("li", null,
                    React.createElement("a", { href: 'https://facebook.github.io/react/' }, "React"),
                    ", ",
                    React.createElement("a", { href: 'http://redux.js.org' }, "Redux"),
                    ", and ",
                    React.createElement("a", { href: 'http://www.typescriptlang.org/' }, "TypeScript"),
                    " for client-side code"),
                React.createElement("li", null,
                    React.createElement("a", { href: 'https://webpack.github.io/' }, "Webpack"),
                    " for building and bundling client-side resources"),
                React.createElement("li", null,
                    React.createElement("a", { href: 'http://getbootstrap.com/' }, "Bootstrap"),
                    " for layout and styling")),
            React.createElement("p", null, "To help you get started, we've also set up:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("strong", null, "Client-side navigation"),
                    ". For example, click ",
                    React.createElement("em", null, "Counter"),
                    " then ",
                    React.createElement("em", null, "Back"),
                    " to return here."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Webpack dev middleware"),
                    ". In development mode, there's no need to run the ",
                    React.createElement("code", null, "webpack"),
                    " build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Hot module replacement"),
                    ". In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, rebuilt React components will be injected directly into your running application, preserving its live state."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Efficient production builds"),
                    ". In production mode, development-time features are disabled, and the ",
                    React.createElement("code", null, "webpack"),
                    " build tool produces minified static CSS and JavaScript files."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Server-side prerendering"),
                    ". To optimize startup time, your React application is first rendered on the server. The initial HTML and state is then transferred to the browser, where client-side code picks up where the server left off.")));
    };
    return Home;
}(React.Component));
exports.default = Home;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var NavMenu_1 = __webpack_require__(17);
var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return React.createElement("div", { className: 'container-fluid' },
            React.createElement("div", { className: 'row' },
                React.createElement("div", { className: 'col-sm-3' },
                    React.createElement(NavMenu_1.NavMenu, null)),
                React.createElement("div", { className: 'col-sm-9' }, this.props.children)));
    };
    return Layout;
}(React.Component));
exports.Layout = Layout;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var react_router_dom_1 = __webpack_require__(2);
var NavMenu = (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavMenu.prototype.render = function () {
        return React.createElement("div", { className: 'main-nav' },
            React.createElement("div", { className: 'navbar navbar-inverse' },
                React.createElement("div", { className: 'navbar-header' },
                    React.createElement("button", { type: 'button', className: 'navbar-toggle', "data-toggle": 'collapse', "data-target": '.navbar-collapse' },
                        React.createElement("span", { className: 'sr-only' }, "Toggle navigation"),
                        React.createElement("span", { className: 'icon-bar' }),
                        React.createElement("span", { className: 'icon-bar' }),
                        React.createElement("span", { className: 'icon-bar' })),
                    React.createElement(react_router_dom_1.Link, { className: 'navbar-brand', to: '/' }, "WebApplicationBasic")),
                React.createElement("div", { className: 'clearfix' }),
                React.createElement("div", { className: 'navbar-collapse collapse' },
                    React.createElement("ul", { className: 'nav navbar-nav' },
                        React.createElement("li", null,
                            React.createElement(react_router_dom_1.NavLink, { exact: true, to: '/', activeClassName: 'active' },
                                React.createElement("span", { className: 'glyphicon glyphicon-home' }),
                                " Home")),
                        React.createElement("li", null,
                            React.createElement(react_router_dom_1.NavLink, { to: '/counter', activeClassName: 'active' },
                                React.createElement("span", { className: 'glyphicon glyphicon-education' }),
                                " Counter")),
                        React.createElement("li", null,
                            React.createElement(react_router_dom_1.NavLink, { to: '/fetchdata', activeClassName: 'active' },
                                React.createElement("span", { className: 'glyphicon glyphicon-th-list' }),
                                " Fetch data"))))));
    };
    return NavMenu;
}(React.Component));
exports.NavMenu = NavMenu;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WeatherForecasts = __webpack_require__(6);
var Counter = __webpack_require__(5);
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
exports.reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(134);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(142);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(71);

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTZhMTE0YjIxYWY0ZGFmOGE4MTciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL0NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL1dlYXRoZXJGb3JlY2FzdHMudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9yb3V0ZXMudHN4Iiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQ291bnRlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRmV0Y2hEYXRhLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9Ib21lLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9MYXlvdXQudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL05hdk1lbnUudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9zdG9yZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2RvbWFpbi10YXNrL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7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QUFDLHVCQUFJLElBQUMsU0FBUyxFQUFDLGNBQWMsRUFBQyxFQUFFLEVBQUcsR0FBRywwQkFBNkIsQ0FDbEU7Z0JBQ04sNkJBQUssU0FBUyxFQUFDLFVBQVUsR0FBTztnQkFDaEMsNkJBQUssU0FBUyxFQUFDLDBCQUEwQjtvQkFDckMsNEJBQUksU0FBUyxFQUFDLGdCQUFnQjt3QkFDMUI7NEJBQ0ksb0JBQUMsMEJBQU8sSUFBQyxLQUFLLFFBQUMsRUFBRSxFQUFHLEdBQUcsRUFBRyxlQUFlLEVBQUMsUUFBUTtnQ0FDOUMsOEJBQU0sU0FBUyxFQUFDLDBCQUEwQixHQUFRO3dDQUM1QyxDQUNUO3dCQUNMOzRCQUNJLG9CQUFDLDBCQUFPLElBQUMsRUFBRSxFQUFHLFVBQVUsRUFBRyxlQUFlLEVBQUMsUUFBUTtnQ0FDL0MsOEJBQU0sU0FBUyxFQUFDLCtCQUErQixHQUFROzJDQUNqRCxDQUNUO3dCQUNMOzRCQUNJLG9CQUFDLDBCQUFPLElBQUMsRUFBRSxFQUFHLFlBQVksRUFBRyxlQUFlLEVBQUMsUUFBUTtnQ0FDakQsOEJBQU0sU0FBUyxFQUFDLDZCQUE2QixHQUFROzhDQUMvQyxDQUNULENBQ0osQ0FDSCxDQUNKLENBQ0osQ0FBQztJQUNYLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxDQXBDNEIsS0FBSyxDQUFDLFNBQVMsR0FvQzNDO0FBcENZLDBCQUFPOzs7Ozs7Ozs7O0FDSHBCLDhDQUF1RDtBQUN2RCxxQ0FBcUM7QUFRckMsc0dBQXNHO0FBQ3RHLHdHQUF3RztBQUN4Ryw0REFBNEQ7QUFDL0MsZ0JBQVEsR0FBRztJQUNwQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87SUFDeEIsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztDQUM3QyxDQUFDOzs7Ozs7O0FDZkYsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7QUNBQSw4QyIsImZpbGUiOiJtYWluLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU2YTExNGIyMWFmNGRhZjhhODE3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi92ZW5kb3JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCIuL3ZlbmRvclwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDYpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC9yZWFjdC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQwKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTM5KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDEpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItcmVkdXgvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEFjdGlvbiwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFNUQVRFIC0gVGhpcyBkZWZpbmVzIHRoZSB0eXBlIG9mIGRhdGEgbWFpbnRhaW5lZCBpbiB0aGUgUmVkdXggc3RvcmUuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvdW50ZXJTdGF0ZSB7XHJcbiAgICBjb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBQ1RJT05TIC0gVGhlc2UgYXJlIHNlcmlhbGl6YWJsZSAoaGVuY2UgcmVwbGF5YWJsZSkgZGVzY3JpcHRpb25zIG9mIHN0YXRlIHRyYW5zaXRpb25zLlxyXG4vLyBUaGV5IGRvIG5vdCB0aGVtc2VsdmVzIGhhdmUgYW55IHNpZGUtZWZmZWN0czsgdGhleSBqdXN0IGRlc2NyaWJlIHNvbWV0aGluZyB0aGF0IGlzIGdvaW5nIHRvIGhhcHBlbi5cclxuLy8gVXNlIEB0eXBlTmFtZSBhbmQgaXNBY3Rpb25UeXBlIGZvciB0eXBlIGRldGVjdGlvbiB0aGF0IHdvcmtzIGV2ZW4gYWZ0ZXIgc2VyaWFsaXphdGlvbi9kZXNlcmlhbGl6YXRpb24uXHJcblxyXG5pbnRlcmZhY2UgSW5jcmVtZW50Q291bnRBY3Rpb24geyB0eXBlOiAnSU5DUkVNRU5UX0NPVU5UJyB9XHJcbmludGVyZmFjZSBEZWNyZW1lbnRDb3VudEFjdGlvbiB7IHR5cGU6ICdERUNSRU1FTlRfQ09VTlQnIH1cclxuXHJcbi8vIERlY2xhcmUgYSAnZGlzY3JpbWluYXRlZCB1bmlvbicgdHlwZS4gVGhpcyBndWFyYW50ZWVzIHRoYXQgYWxsIHJlZmVyZW5jZXMgdG8gJ3R5cGUnIHByb3BlcnRpZXMgY29udGFpbiBvbmUgb2YgdGhlXHJcbi8vIGRlY2xhcmVkIHR5cGUgc3RyaW5ncyAoYW5kIG5vdCBhbnkgb3RoZXIgYXJiaXRyYXJ5IHN0cmluZykuXHJcbnR5cGUgS25vd25BY3Rpb24gPSBJbmNyZW1lbnRDb3VudEFjdGlvbiB8IERlY3JlbWVudENvdW50QWN0aW9uO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBQ1RJT04gQ1JFQVRPUlMgLSBUaGVzZSBhcmUgZnVuY3Rpb25zIGV4cG9zZWQgdG8gVUkgY29tcG9uZW50cyB0aGF0IHdpbGwgdHJpZ2dlciBhIHN0YXRlIHRyYW5zaXRpb24uXHJcbi8vIFRoZXkgZG9uJ3QgZGlyZWN0bHkgbXV0YXRlIHN0YXRlLCBidXQgdGhleSBjYW4gaGF2ZSBleHRlcm5hbCBzaWRlLWVmZmVjdHMgKHN1Y2ggYXMgbG9hZGluZyBkYXRhKS5cclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHtcclxuICAgIGluY3JlbWVudDogKCkgPT4gPEluY3JlbWVudENvdW50QWN0aW9uPnsgdHlwZTogJ0lOQ1JFTUVOVF9DT1VOVCcgfSxcclxuICAgIGRlY3JlbWVudDogKCkgPT4gPERlY3JlbWVudENvdW50QWN0aW9uPnsgdHlwZTogJ0RFQ1JFTUVOVF9DT1VOVCcgfVxyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBSRURVQ0VSIC0gRm9yIGEgZ2l2ZW4gc3RhdGUgYW5kIGFjdGlvbiwgcmV0dXJucyB0aGUgbmV3IHN0YXRlLiBUbyBzdXBwb3J0IHRpbWUgdHJhdmVsLCB0aGlzIG11c3Qgbm90IG11dGF0ZSB0aGUgb2xkIHN0YXRlLlxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXI6IFJlZHVjZXI8Q291bnRlclN0YXRlPiA9IChzdGF0ZTogQ291bnRlclN0YXRlLCBhY3Rpb246IEtub3duQWN0aW9uKSA9PiB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnSU5DUkVNRU5UX0NPVU5UJzpcclxuICAgICAgICAgICAgcmV0dXJuIHsgY291bnQ6IHN0YXRlLmNvdW50ICsgMSB9O1xyXG4gICAgICAgIGNhc2UgJ0RFQ1JFTUVOVF9DT1VOVCc6XHJcbiAgICAgICAgICAgIHJldHVybiB7IGNvdW50OiBzdGF0ZS5jb3VudCAtIDEgfTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGxpbmUgZ3VhcmFudGVlcyB0aGF0IGV2ZXJ5IGFjdGlvbiBpbiB0aGUgS25vd25BY3Rpb24gdW5pb24gaGFzIGJlZW4gY292ZXJlZCBieSBhIGNhc2UgYWJvdmVcclxuICAgICAgICAgICAgY29uc3QgZXhoYXVzdGl2ZUNoZWNrOiBuZXZlciA9IGFjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGb3IgdW5yZWNvZ25pemVkIGFjdGlvbnMgKG9yIGluIGNhc2VzIHdoZXJlIGFjdGlvbnMgaGF2ZSBubyBlZmZlY3QpLCBtdXN0IHJldHVybiB0aGUgZXhpc3Rpbmcgc3RhdGVcclxuICAgIC8vICAob3IgZGVmYXVsdCBpbml0aWFsIHN0YXRlIGlmIG5vbmUgd2FzIHN1cHBsaWVkKVxyXG4gICAgcmV0dXJuIHN0YXRlIHx8IHsgY291bnQ6IDAgfTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL0NvdW50ZXIudHMiLCJpbXBvcnQgeyBmZXRjaCwgYWRkVGFzayB9IGZyb20gJ2RvbWFpbi10YXNrJztcclxuaW1wb3J0IHsgQWN0aW9uLCBSZWR1Y2VyLCBBY3Rpb25DcmVhdG9yIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgeyBBcHBUaHVua0FjdGlvbiB9IGZyb20gJy4vJztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFNUQVRFIC0gVGhpcyBkZWZpbmVzIHRoZSB0eXBlIG9mIGRhdGEgbWFpbnRhaW5lZCBpbiB0aGUgUmVkdXggc3RvcmUuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdlYXRoZXJGb3JlY2FzdHNTdGF0ZSB7XHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgICBzdGFydERhdGVJbmRleDogbnVtYmVyO1xyXG4gICAgZm9yZWNhc3RzOiBXZWF0aGVyRm9yZWNhc3RbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWF0aGVyRm9yZWNhc3Qge1xyXG4gICAgZGF0ZUZvcm1hdHRlZDogc3RyaW5nO1xyXG4gICAgdGVtcGVyYXR1cmVDOiBudW1iZXI7XHJcbiAgICB0ZW1wZXJhdHVyZUY6IG51bWJlcjtcclxuICAgIHN1bW1hcnk6IHN0cmluZztcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQUNUSU9OUyAtIFRoZXNlIGFyZSBzZXJpYWxpemFibGUgKGhlbmNlIHJlcGxheWFibGUpIGRlc2NyaXB0aW9ucyBvZiBzdGF0ZSB0cmFuc2l0aW9ucy5cclxuLy8gVGhleSBkbyBub3QgdGhlbXNlbHZlcyBoYXZlIGFueSBzaWRlLWVmZmVjdHM7IHRoZXkganVzdCBkZXNjcmliZSBzb21ldGhpbmcgdGhhdCBpcyBnb2luZyB0byBoYXBwZW4uXHJcblxyXG5pbnRlcmZhY2UgUmVxdWVzdFdlYXRoZXJGb3JlY2FzdHNBY3Rpb24ge1xyXG4gICAgdHlwZTogJ1JFUVVFU1RfV0VBVEhFUl9GT1JFQ0FTVFMnLFxyXG4gICAgc3RhcnREYXRlSW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlY2VpdmVXZWF0aGVyRm9yZWNhc3RzQWN0aW9uIHtcclxuICAgIHR5cGU6ICdSRUNFSVZFX1dFQVRIRVJfRk9SRUNBU1RTJyxcclxuICAgIHN0YXJ0RGF0ZUluZGV4OiBudW1iZXI7XHJcbiAgICBmb3JlY2FzdHM6IFdlYXRoZXJGb3JlY2FzdFtdXHJcbn1cclxuXHJcbi8vIERlY2xhcmUgYSAnZGlzY3JpbWluYXRlZCB1bmlvbicgdHlwZS4gVGhpcyBndWFyYW50ZWVzIHRoYXQgYWxsIHJlZmVyZW5jZXMgdG8gJ3R5cGUnIHByb3BlcnRpZXMgY29udGFpbiBvbmUgb2YgdGhlXHJcbi8vIGRlY2xhcmVkIHR5cGUgc3RyaW5ncyAoYW5kIG5vdCBhbnkgb3RoZXIgYXJiaXRyYXJ5IHN0cmluZykuXHJcbnR5cGUgS25vd25BY3Rpb24gPSBSZXF1ZXN0V2VhdGhlckZvcmVjYXN0c0FjdGlvbiB8IFJlY2VpdmVXZWF0aGVyRm9yZWNhc3RzQWN0aW9uO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBQ1RJT04gQ1JFQVRPUlMgLSBUaGVzZSBhcmUgZnVuY3Rpb25zIGV4cG9zZWQgdG8gVUkgY29tcG9uZW50cyB0aGF0IHdpbGwgdHJpZ2dlciBhIHN0YXRlIHRyYW5zaXRpb24uXHJcbi8vIFRoZXkgZG9uJ3QgZGlyZWN0bHkgbXV0YXRlIHN0YXRlLCBidXQgdGhleSBjYW4gaGF2ZSBleHRlcm5hbCBzaWRlLWVmZmVjdHMgKHN1Y2ggYXMgbG9hZGluZyBkYXRhKS5cclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHtcclxuICAgIHJlcXVlc3RXZWF0aGVyRm9yZWNhc3RzOiAoc3RhcnREYXRlSW5kZXg6IG51bWJlcik6IEFwcFRodW5rQWN0aW9uPEtub3duQWN0aW9uPiA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICAgICAgLy8gT25seSBsb2FkIGRhdGEgaWYgaXQncyBzb21ldGhpbmcgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIChhbmQgYXJlIG5vdCBhbHJlYWR5IGxvYWRpbmcpXHJcbiAgICAgICAgaWYgKHN0YXJ0RGF0ZUluZGV4ICE9PSBnZXRTdGF0ZSgpLndlYXRoZXJGb3JlY2FzdHMuc3RhcnREYXRlSW5kZXgpIHtcclxuICAgICAgICAgICAgbGV0IGZldGNoVGFzayA9IGZldGNoKGAvYXBpL1NhbXBsZURhdGEvV2VhdGhlckZvcmVjYXN0cz9zdGFydERhdGVJbmRleD0keyBzdGFydERhdGVJbmRleCB9YClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPFdlYXRoZXJGb3JlY2FzdFtdPilcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1JFQ0VJVkVfV0VBVEhFUl9GT1JFQ0FTVFMnLCBzdGFydERhdGVJbmRleDogc3RhcnREYXRlSW5kZXgsIGZvcmVjYXN0czogZGF0YSB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYWRkVGFzayhmZXRjaFRhc2spOyAvLyBFbnN1cmUgc2VydmVyLXNpZGUgcHJlcmVuZGVyaW5nIHdhaXRzIGZvciB0aGlzIHRvIGNvbXBsZXRlXHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1JFUVVFU1RfV0VBVEhFUl9GT1JFQ0FTVFMnLCBzdGFydERhdGVJbmRleDogc3RhcnREYXRlSW5kZXggfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBSRURVQ0VSIC0gRm9yIGEgZ2l2ZW4gc3RhdGUgYW5kIGFjdGlvbiwgcmV0dXJucyB0aGUgbmV3IHN0YXRlLiBUbyBzdXBwb3J0IHRpbWUgdHJhdmVsLCB0aGlzIG11c3Qgbm90IG11dGF0ZSB0aGUgb2xkIHN0YXRlLlxyXG5cclxuY29uc3QgdW5sb2FkZWRTdGF0ZTogV2VhdGhlckZvcmVjYXN0c1N0YXRlID0geyBzdGFydERhdGVJbmRleDogbnVsbCwgZm9yZWNhc3RzOiBbXSwgaXNMb2FkaW5nOiBmYWxzZSB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXI6IFJlZHVjZXI8V2VhdGhlckZvcmVjYXN0c1N0YXRlPiA9IChzdGF0ZTogV2VhdGhlckZvcmVjYXN0c1N0YXRlLCBhY3Rpb246IEtub3duQWN0aW9uKSA9PiB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnUkVRVUVTVF9XRUFUSEVSX0ZPUkVDQVNUUyc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGFydERhdGVJbmRleDogYWN0aW9uLnN0YXJ0RGF0ZUluZGV4LFxyXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RzOiBzdGF0ZS5mb3JlY2FzdHMsXHJcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBjYXNlICdSRUNFSVZFX1dFQVRIRVJfRk9SRUNBU1RTJzpcclxuICAgICAgICAgICAgLy8gT25seSBhY2NlcHQgdGhlIGluY29taW5nIGRhdGEgaWYgaXQgbWF0Y2hlcyB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdC4gVGhpcyBlbnN1cmVzIHdlIGNvcnJlY3RseVxyXG4gICAgICAgICAgICAvLyBoYW5kbGUgb3V0LW9mLW9yZGVyIHJlc3BvbnNlcy5cclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5zdGFydERhdGVJbmRleCA9PT0gc3RhdGUuc3RhcnREYXRlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlSW5kZXg6IGFjdGlvbi5zdGFydERhdGVJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdHM6IGFjdGlvbi5mb3JlY2FzdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGxpbmUgZ3VhcmFudGVlcyB0aGF0IGV2ZXJ5IGFjdGlvbiBpbiB0aGUgS25vd25BY3Rpb24gdW5pb24gaGFzIGJlZW4gY292ZXJlZCBieSBhIGNhc2UgYWJvdmVcclxuICAgICAgICAgICAgY29uc3QgZXhoYXVzdGl2ZUNoZWNrOiBuZXZlciA9IGFjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGUgfHwgdW5sb2FkZWRTdGF0ZTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL1dlYXRoZXJGb3JlY2FzdHMudHMiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlLCBjb21iaW5lUmVkdWNlcnMsIEdlbmVyaWNTdG9yZUVuaGFuY2VyLCBTdG9yZSB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcclxuaW1wb3J0IHsgcm91dGVyUmVkdWNlciwgcm91dGVyTWlkZGxld2FyZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XHJcbmltcG9ydCAqIGFzIFN0b3JlTW9kdWxlIGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlLCByZWR1Y2VycyB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShoaXN0b3J5OiBIaXN0b3J5LCBpbml0aWFsU3RhdGU/OiBBcHBsaWNhdGlvblN0YXRlKSB7XHJcbiAgICAvLyBCdWlsZCBtaWRkbGV3YXJlLiBUaGVzZSBhcmUgZnVuY3Rpb25zIHRoYXQgY2FuIHByb2Nlc3MgdGhlIGFjdGlvbnMgYmVmb3JlIHRoZXkgcmVhY2ggdGhlIHN0b3JlLlxyXG4gICAgY29uc3Qgd2luZG93SWZEZWZpbmVkID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogd2luZG93IGFzIGFueTtcclxuICAgIC8vIElmIGRldlRvb2xzIGlzIGluc3RhbGxlZCwgY29ubmVjdCB0byBpdFxyXG4gICAgY29uc3QgZGV2VG9vbHNFeHRlbnNpb24gPSB3aW5kb3dJZkRlZmluZWQgJiYgd2luZG93SWZEZWZpbmVkLmRldlRvb2xzRXh0ZW5zaW9uIGFzICgpID0+IEdlbmVyaWNTdG9yZUVuaGFuY2VyO1xyXG4gICAgY29uc3QgY3JlYXRlU3RvcmVXaXRoTWlkZGxld2FyZSA9IGNvbXBvc2UoXHJcbiAgICAgICAgYXBwbHlNaWRkbGV3YXJlKHRodW5rLCByb3V0ZXJNaWRkbGV3YXJlKGhpc3RvcnkpKSxcclxuICAgICAgICBkZXZUb29sc0V4dGVuc2lvbiA/IGRldlRvb2xzRXh0ZW5zaW9uKCkgOiBmID0+IGZcclxuICAgICkoY3JlYXRlU3RvcmUpO1xyXG5cclxuICAgIC8vIENvbWJpbmUgYWxsIHJlZHVjZXJzIGFuZCBpbnN0YW50aWF0ZSB0aGUgYXBwLXdpZGUgc3RvcmUgaW5zdGFuY2VcclxuICAgIGNvbnN0IGFsbFJlZHVjZXJzID0gYnVpbGRSb290UmVkdWNlcihyZWR1Y2Vycyk7XHJcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUoYWxsUmVkdWNlcnMsIGluaXRpYWxTdGF0ZSkgYXMgU3RvcmU8QXBwbGljYXRpb25TdGF0ZT47XHJcblxyXG4gICAgLy8gRW5hYmxlIFdlYnBhY2sgaG90IG1vZHVsZSByZXBsYWNlbWVudCBmb3IgcmVkdWNlcnNcclxuICAgIGlmIChtb2R1bGUuaG90KSB7XHJcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vc3RvcmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSb290UmVkdWNlciA9IHJlcXVpcmU8dHlwZW9mIFN0b3JlTW9kdWxlPignLi9zdG9yZScpO1xyXG4gICAgICAgICAgICBzdG9yZS5yZXBsYWNlUmVkdWNlcihidWlsZFJvb3RSZWR1Y2VyKG5leHRSb290UmVkdWNlci5yZWR1Y2VycykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdG9yZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRSb290UmVkdWNlcihhbGxSZWR1Y2Vycykge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVSZWR1Y2VyczxBcHBsaWNhdGlvblN0YXRlPihPYmplY3QuYXNzaWduKHt9LCBhbGxSZWR1Y2VycywgeyByb3V0aW5nOiByb3V0ZXJSZWR1Y2VyIH0pKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29uZmlndXJlU3RvcmUudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IExheW91dCB9IGZyb20gJy4vY29tcG9uZW50cy9MYXlvdXQnO1xyXG5pbXBvcnQgSG9tZSBmcm9tICcuL2NvbXBvbmVudHMvSG9tZSc7XHJcbmltcG9ydCBGZXRjaERhdGEgZnJvbSAnLi9jb21wb25lbnRzL0ZldGNoRGF0YSc7XHJcbmltcG9ydCBDb3VudGVyIGZyb20gJy4vY29tcG9uZW50cy9Db3VudGVyJztcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0ZXMgPSA8TGF5b3V0PlxyXG4gICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy8nIGNvbXBvbmVudD17IEhvbWUgfSAvPlxyXG4gICAgPFJvdXRlIHBhdGg9Jy9jb3VudGVyJyBjb21wb25lbnQ9eyBDb3VudGVyIH0gLz5cclxuICAgIDxSb3V0ZSBwYXRoPScvZmV0Y2hkYXRhLzpzdGFydERhdGVJbmRleD8nIGNvbXBvbmVudD17IEZldGNoRGF0YSB9IC8+XHJcbjwvTGF5b3V0PjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3JvdXRlcy50c3giLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxMzEpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9hc3BuZXQtcHJlcmVuZGVyaW5nL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxMzYpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTM4KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtZG9tL3NlcnZlci5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XHJcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyByZXBsYWNlIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4JztcclxuaW1wb3J0IHsgY3JlYXRlTWVtb3J5SGlzdG9yeSB9IGZyb20gJ2hpc3RvcnknO1xyXG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXJSZW5kZXJlciwgUmVuZGVyUmVzdWx0IH0gZnJvbSAnYXNwbmV0LXByZXJlbmRlcmluZyc7XHJcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4vcm91dGVzJztcclxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vY29uZmlndXJlU3RvcmUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2VydmVyUmVuZGVyZXIocGFyYW1zID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxSZW5kZXJSZXN1bHQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAvLyBQcmVwYXJlIFJlZHV4IHN0b3JlIHdpdGggaW4tbWVtb3J5IGhpc3RvcnksIGFuZCBkaXNwYXRjaCBhIG5hdmlnYXRpb24gZXZlbnRcclxuICAgICAgICAvLyBjb3JyZXNwb25kaW5nIHRvIHRoZSBpbmNvbWluZyBVUkxcclxuICAgICAgICBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKGNyZWF0ZU1lbW9yeUhpc3RvcnkoKSk7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVwbGFjZShwYXJhbXMubG9jYXRpb24pKTtcclxuXHJcbiAgICAgICAgLy8gUHJlcGFyZSBhbiBpbnN0YW5jZSBvZiB0aGUgYXBwbGljYXRpb24gYW5kIHBlcmZvcm0gYW4gaW5pdGFsIHJlbmRlciB0aGF0IHdpbGxcclxuICAgICAgICAvLyBjYXVzZSBhbnkgYXN5bmMgdGFza3MgKGUuZy4sIGRhdGEgYWNjZXNzKSB0byBiZWdpblxyXG4gICAgICAgIGNvbnN0IHJvdXRlckNvbnRleHQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGFwcCA9IChcclxuICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXsgc3RvcmUgfT5cclxuICAgICAgICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgY29udGV4dD17IHJvdXRlckNvbnRleHQgfSBsb2NhdGlvbj17IHBhcmFtcy5sb2NhdGlvbi5wYXRoIH0gY2hpbGRyZW49eyByb3V0ZXMgfSAvPlxyXG4gICAgICAgICAgICA8L1Byb3ZpZGVyPlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmVuZGVyVG9TdHJpbmcoYXBwKTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlcmUncyBhIHJlZGlyZWN0aW9uLCBqdXN0IHNlbmQgdGhpcyBpbmZvcm1hdGlvbiBiYWNrIHRvIHRoZSBob3N0IGFwcGxpY2F0aW9uXHJcbiAgICAgICAgaWYgKHJvdXRlckNvbnRleHQudXJsKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeyByZWRpcmVjdFVybDogcm91dGVyQ29udGV4dC51cmwgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gT25jZSBhbnkgYXN5bmMgdGFza3MgYXJlIGRvbmUsIHdlIGNhbiBwZXJmb3JtIHRoZSBmaW5hbCByZW5kZXJcclxuICAgICAgICAvLyBXZSBhbHNvIHNlbmQgdGhlIHJlZHV4IHN0b3JlIHN0YXRlLCBzbyB0aGUgY2xpZW50IGNhbiBjb250aW51ZSBleGVjdXRpb24gd2hlcmUgdGhlIHNlcnZlciBsZWZ0IG9mZlxyXG4gICAgICAgIHBhcmFtcy5kb21haW5UYXNrcy50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICBodG1sOiByZW5kZXJUb1N0cmluZyhhcHApLFxyXG4gICAgICAgICAgICAgICAgZ2xvYmFsczogeyBpbml0aWFsUmVkdXhTdGF0ZTogc3RvcmUuZ2V0U3RhdGUoKSB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHJlamVjdCk7IC8vIEFsc28gcHJvcGFnYXRlIGFueSBlcnJvcnMgYmFjayBpbnRvIHRoZSBob3N0IGFwcGxpY2F0aW9uXHJcbiAgICB9KTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExpbmssIFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSB9ICBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCAqIGFzIENvdW50ZXJTdG9yZSBmcm9tICcuLi9zdG9yZS9Db3VudGVyJztcclxuaW1wb3J0ICogYXMgV2VhdGhlckZvcmVjYXN0cyBmcm9tICcuLi9zdG9yZS9XZWF0aGVyRm9yZWNhc3RzJztcclxuXHJcbnR5cGUgQ291bnRlclByb3BzID1cclxuICAgIENvdW50ZXJTdG9yZS5Db3VudGVyU3RhdGVcclxuICAgICYgdHlwZW9mIENvdW50ZXJTdG9yZS5hY3Rpb25DcmVhdG9yc1xyXG4gICAgJiBSb3V0ZUNvbXBvbmVudFByb3BzPHt9PjtcclxuXHJcbmNsYXNzIENvdW50ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Q291bnRlclByb3BzLCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGgxPkNvdW50ZXI8L2gxPlxyXG5cclxuICAgICAgICAgICAgPHA+VGhpcyBpcyBhIHNpbXBsZSBleGFtcGxlIG9mIGEgUmVhY3QgY29tcG9uZW50LjwvcD5cclxuXHJcbiAgICAgICAgICAgIDxwPkN1cnJlbnQgY291bnQ6IDxzdHJvbmc+eyB0aGlzLnByb3BzLmNvdW50IH08L3N0cm9uZz48L3A+XHJcblxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyAoKSA9PiB7IHRoaXMucHJvcHMuaW5jcmVtZW50KCkgfSB9PkluY3JlbWVudDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cclxuLy8gV2lyZSB1cCB0aGUgUmVhY3QgY29tcG9uZW50IHRvIHRoZSBSZWR1eCBzdG9yZVxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgKHN0YXRlOiBBcHBsaWNhdGlvblN0YXRlKSA9PiBzdGF0ZS5jb3VudGVyLCAvLyBTZWxlY3RzIHdoaWNoIHN0YXRlIHByb3BlcnRpZXMgYXJlIG1lcmdlZCBpbnRvIHRoZSBjb21wb25lbnQncyBwcm9wc1xyXG4gICAgQ291bnRlclN0b3JlLmFjdGlvbkNyZWF0b3JzICAgICAgICAgICAgICAgICAvLyBTZWxlY3RzIHdoaWNoIGFjdGlvbiBjcmVhdG9ycyBhcmUgbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCdzIHByb3BzXHJcbikoQ291bnRlcikgYXMgdHlwZW9mIENvdW50ZXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQ291bnRlci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExpbmssIFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSB9ICBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCAqIGFzIFdlYXRoZXJGb3JlY2FzdHNTdGF0ZSBmcm9tICcuLi9zdG9yZS9XZWF0aGVyRm9yZWNhc3RzJztcclxuXHJcbi8vIEF0IHJ1bnRpbWUsIFJlZHV4IHdpbGwgbWVyZ2UgdG9nZXRoZXIuLi5cclxudHlwZSBXZWF0aGVyRm9yZWNhc3RQcm9wcyA9XHJcbiAgICBXZWF0aGVyRm9yZWNhc3RzU3RhdGUuV2VhdGhlckZvcmVjYXN0c1N0YXRlICAgICAgICAvLyAuLi4gc3RhdGUgd2UndmUgcmVxdWVzdGVkIGZyb20gdGhlIFJlZHV4IHN0b3JlXHJcbiAgICAmIHR5cGVvZiBXZWF0aGVyRm9yZWNhc3RzU3RhdGUuYWN0aW9uQ3JlYXRvcnMgICAgICAvLyAuLi4gcGx1cyBhY3Rpb24gY3JlYXRvcnMgd2UndmUgcmVxdWVzdGVkXHJcbiAgICAmIFJvdXRlQ29tcG9uZW50UHJvcHM8eyBzdGFydERhdGVJbmRleDogc3RyaW5nIH0+OyAvLyAuLi4gcGx1cyBpbmNvbWluZyByb3V0aW5nIHBhcmFtZXRlcnMgICBcclxuXHJcbmNsYXNzIEZldGNoRGF0YSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxXZWF0aGVyRm9yZWNhc3RQcm9wcywge30+IHtcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICAvLyBUaGlzIG1ldGhvZCBydW5zIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBmaXJzdCBhZGRlZCB0byB0aGUgcGFnZVxyXG4gICAgICAgIGxldCBzdGFydERhdGVJbmRleCA9IHBhcnNlSW50KHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLnN0YXJ0RGF0ZUluZGV4KSB8fCAwO1xyXG4gICAgICAgIHRoaXMucHJvcHMucmVxdWVzdFdlYXRoZXJGb3JlY2FzdHMoc3RhcnREYXRlSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBXZWF0aGVyRm9yZWNhc3RQcm9wcykge1xyXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIHJ1bnMgd2hlbiBpbmNvbWluZyBwcm9wcyAoZS5nLiwgcm91dGUgcGFyYW1zKSBjaGFuZ2VcclxuICAgICAgICBsZXQgc3RhcnREYXRlSW5kZXggPSBwYXJzZUludChuZXh0UHJvcHMubWF0Y2gucGFyYW1zLnN0YXJ0RGF0ZUluZGV4KSB8fCAwO1xyXG4gICAgICAgIHRoaXMucHJvcHMucmVxdWVzdFdlYXRoZXJGb3JlY2FzdHMoc3RhcnREYXRlSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMT5XZWF0aGVyIGZvcmVjYXN0PC9oMT5cclxuICAgICAgICAgICAgPHA+VGhpcyBjb21wb25lbnQgZGVtb25zdHJhdGVzIGZldGNoaW5nIGRhdGEgZnJvbSB0aGUgc2VydmVyIGFuZCB3b3JraW5nIHdpdGggVVJMIHBhcmFtZXRlcnMuPC9wPlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyRm9yZWNhc3RzVGFibGUoKSB9XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYWdpbmF0aW9uKCkgfVxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlckZvcmVjYXN0c1RhYmxlKCkge1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPSd0YWJsZSc+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+RGF0ZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoPlRlbXAuIChDKTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoPlRlbXAuIChGKTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoPlN1bW1hcnk8L3RoPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5mb3JlY2FzdHMubWFwKGZvcmVjYXN0ID0+XHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PXsgZm9yZWNhc3QuZGF0ZUZvcm1hdHRlZCB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57IGZvcmVjYXN0LmRhdGVGb3JtYXR0ZWQgfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPnsgZm9yZWNhc3QudGVtcGVyYXR1cmVDIH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57IGZvcmVjYXN0LnRlbXBlcmF0dXJlRiB9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+eyBmb3JlY2FzdC5zdW1tYXJ5IH08L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICA8L3RhYmxlPjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlclBhZ2luYXRpb24oKSB7XHJcbiAgICAgICAgbGV0IHByZXZTdGFydERhdGVJbmRleCA9IHRoaXMucHJvcHMuc3RhcnREYXRlSW5kZXggLSA1O1xyXG4gICAgICAgIGxldCBuZXh0U3RhcnREYXRlSW5kZXggPSB0aGlzLnByb3BzLnN0YXJ0RGF0ZUluZGV4ICsgNTtcclxuXHJcbiAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT0nY2xlYXJmaXggdGV4dC1jZW50ZXInPlxyXG4gICAgICAgICAgICA8TGluayBjbGFzc05hbWU9J2J0biBidG4tZGVmYXVsdCBwdWxsLWxlZnQnIHRvPXsgYC9mZXRjaGRhdGEvJHsgcHJldlN0YXJ0RGF0ZUluZGV4IH1gIH0+UHJldmlvdXM8L0xpbms+XHJcbiAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT0nYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQnIHRvPXsgYC9mZXRjaGRhdGEvJHsgbmV4dFN0YXJ0RGF0ZUluZGV4IH1gIH0+TmV4dDwvTGluaz5cclxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmlzTG9hZGluZyA/IDxzcGFuPkxvYWRpbmcuLi48L3NwYW4+IDogW10gfVxyXG4gICAgICAgIDwvcD47XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICAoc3RhdGU6IEFwcGxpY2F0aW9uU3RhdGUpID0+IHN0YXRlLndlYXRoZXJGb3JlY2FzdHMsIC8vIFNlbGVjdHMgd2hpY2ggc3RhdGUgcHJvcGVydGllcyBhcmUgbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCdzIHByb3BzXHJcbiAgICBXZWF0aGVyRm9yZWNhc3RzU3RhdGUuYWN0aW9uQ3JlYXRvcnMgICAgICAgICAgICAgICAgIC8vIFNlbGVjdHMgd2hpY2ggYWN0aW9uIGNyZWF0b3JzIGFyZSBtZXJnZWQgaW50byB0aGUgY29tcG9uZW50J3MgcHJvcHNcclxuKShGZXRjaERhdGEpIGFzIHR5cGVvZiBGZXRjaERhdGE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL0ZldGNoRGF0YS50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Um91dGVDb21wb25lbnRQcm9wczx7fT4sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8aDE+SGVsbG8sIHdvcmxkITwvaDE+XHJcbiAgICAgICAgICAgIDxwPldlbGNvbWUgdG8geW91ciBuZXcgc2luZ2xlLXBhZ2UgYXBwbGljYXRpb24sIGJ1aWx0IHdpdGg6PC9wPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj0naHR0cHM6Ly9nZXQuYXNwLm5ldC8nPkFTUC5ORVQgQ29yZTwvYT4gYW5kIDxhIGhyZWY9J2h0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvNjdlZjhzYmQuYXNweCc+QyM8L2E+IGZvciBjcm9zcy1wbGF0Zm9ybSBzZXJ2ZXItc2lkZSBjb2RlPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPSdodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC8nPlJlYWN0PC9hPiwgPGEgaHJlZj0naHR0cDovL3JlZHV4LmpzLm9yZyc+UmVkdXg8L2E+LCBhbmQgPGEgaHJlZj0naHR0cDovL3d3dy50eXBlc2NyaXB0bGFuZy5vcmcvJz5UeXBlU2NyaXB0PC9hPiBmb3IgY2xpZW50LXNpZGUgY29kZTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj0naHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby8nPldlYnBhY2s8L2E+IGZvciBidWlsZGluZyBhbmQgYnVuZGxpbmcgY2xpZW50LXNpZGUgcmVzb3VyY2VzPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPSdodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS8nPkJvb3RzdHJhcDwvYT4gZm9yIGxheW91dCBhbmQgc3R5bGluZzwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDxwPlRvIGhlbHAgeW91IGdldCBzdGFydGVkLCB3ZSd2ZSBhbHNvIHNldCB1cDo8L3A+XHJcbiAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPkNsaWVudC1zaWRlIG5hdmlnYXRpb248L3N0cm9uZz4uIEZvciBleGFtcGxlLCBjbGljayA8ZW0+Q291bnRlcjwvZW0+IHRoZW4gPGVtPkJhY2s8L2VtPiB0byByZXR1cm4gaGVyZS48L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+V2VicGFjayBkZXYgbWlkZGxld2FyZTwvc3Ryb25nPi4gSW4gZGV2ZWxvcG1lbnQgbW9kZSwgdGhlcmUncyBubyBuZWVkIHRvIHJ1biB0aGUgPGNvZGU+d2VicGFjazwvY29kZT4gYnVpbGQgdG9vbC4gWW91ciBjbGllbnQtc2lkZSByZXNvdXJjZXMgYXJlIGR5bmFtaWNhbGx5IGJ1aWx0IG9uIGRlbWFuZC4gVXBkYXRlcyBhcmUgYXZhaWxhYmxlIGFzIHNvb24gYXMgeW91IG1vZGlmeSBhbnkgZmlsZS48L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+SG90IG1vZHVsZSByZXBsYWNlbWVudDwvc3Ryb25nPi4gSW4gZGV2ZWxvcG1lbnQgbW9kZSwgeW91IGRvbid0IGV2ZW4gbmVlZCB0byByZWxvYWQgdGhlIHBhZ2UgYWZ0ZXIgbWFraW5nIG1vc3QgY2hhbmdlcy4gV2l0aGluIHNlY29uZHMgb2Ygc2F2aW5nIGNoYW5nZXMgdG8gZmlsZXMsIHJlYnVpbHQgUmVhY3QgY29tcG9uZW50cyB3aWxsIGJlIGluamVjdGVkIGRpcmVjdGx5IGludG8geW91ciBydW5uaW5nIGFwcGxpY2F0aW9uLCBwcmVzZXJ2aW5nIGl0cyBsaXZlIHN0YXRlLjwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5FZmZpY2llbnQgcHJvZHVjdGlvbiBidWlsZHM8L3N0cm9uZz4uIEluIHByb2R1Y3Rpb24gbW9kZSwgZGV2ZWxvcG1lbnQtdGltZSBmZWF0dXJlcyBhcmUgZGlzYWJsZWQsIGFuZCB0aGUgPGNvZGU+d2VicGFjazwvY29kZT4gYnVpbGQgdG9vbCBwcm9kdWNlcyBtaW5pZmllZCBzdGF0aWMgQ1NTIGFuZCBKYXZhU2NyaXB0IGZpbGVzLjwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5TZXJ2ZXItc2lkZSBwcmVyZW5kZXJpbmc8L3N0cm9uZz4uIFRvIG9wdGltaXplIHN0YXJ0dXAgdGltZSwgeW91ciBSZWFjdCBhcHBsaWNhdGlvbiBpcyBmaXJzdCByZW5kZXJlZCBvbiB0aGUgc2VydmVyLiBUaGUgaW5pdGlhbCBIVE1MIGFuZCBzdGF0ZSBpcyB0aGVuIHRyYW5zZmVycmVkIHRvIHRoZSBicm93c2VyLCB3aGVyZSBjbGllbnQtc2lkZSBjb2RlIHBpY2tzIHVwIHdoZXJlIHRoZSBzZXJ2ZXIgbGVmdCBvZmYuPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE5hdk1lbnUgfSBmcm9tICcuL05hdk1lbnUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXItZmx1aWQnPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93Jz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtc20tMyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdk1lbnUgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbC1zbS05Jz5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9MYXlvdXQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZMaW5rLCBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2TWVudSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdtYWluLW5hdic+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2YmFyIG5hdmJhci1pbnZlcnNlJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXZiYXItaGVhZGVyJz5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3NOYW1lPSduYXZiYXItdG9nZ2xlJyBkYXRhLXRvZ2dsZT0nY29sbGFwc2UnIGRhdGEtdGFyZ2V0PScubmF2YmFyLWNvbGxhcHNlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzci1vbmx5Jz5Ub2dnbGUgbmF2aWdhdGlvbjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpY29uLWJhcic+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2ljb24tYmFyJz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naWNvbi1iYXInPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9J25hdmJhci1icmFuZCcgdG89eyAnLycgfT5XZWJBcHBsaWNhdGlvbkJhc2ljPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdmJhci1jb2xsYXBzZSBjb2xsYXBzZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT0nbmF2IG5hdmJhci1uYXYnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBleGFjdCB0bz17ICcvJyB9IGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2dseXBoaWNvbiBnbHlwaGljb24taG9tZSc+PC9zcGFuPiBIb21lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIHRvPXsgJy9jb3VudGVyJyB9IGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2dseXBoaWNvbiBnbHlwaGljb24tZWR1Y2F0aW9uJz48L3NwYW4+IENvdW50ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2TGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgdG89eyAnL2ZldGNoZGF0YScgfSBhY3RpdmVDbGFzc05hbWU9J2FjdGl2ZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdnbHlwaGljb24gZ2x5cGhpY29uLXRoLWxpc3QnPjwvc3Bhbj4gRmV0Y2ggZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZMaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL05hdk1lbnUudHN4IiwiaW1wb3J0ICogYXMgV2VhdGhlckZvcmVjYXN0cyBmcm9tICcuL1dlYXRoZXJGb3JlY2FzdHMnO1xyXG5pbXBvcnQgKiBhcyBDb3VudGVyIGZyb20gJy4vQ291bnRlcic7XHJcblxyXG4vLyBUaGUgdG9wLWxldmVsIHN0YXRlIG9iamVjdFxyXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aW9uU3RhdGUge1xyXG4gICAgY291bnRlcjogQ291bnRlci5Db3VudGVyU3RhdGUsXHJcbiAgICB3ZWF0aGVyRm9yZWNhc3RzOiBXZWF0aGVyRm9yZWNhc3RzLldlYXRoZXJGb3JlY2FzdHNTdGF0ZVxyXG59XHJcblxyXG4vLyBXaGVuZXZlciBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCwgUmVkdXggd2lsbCB1cGRhdGUgZWFjaCB0b3AtbGV2ZWwgYXBwbGljYXRpb24gc3RhdGUgcHJvcGVydHkgdXNpbmdcclxuLy8gdGhlIHJlZHVjZXIgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZS4gSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgbmFtZXMgbWF0Y2ggZXhhY3RseSwgYW5kIHRoYXQgdGhlIHJlZHVjZXJcclxuLy8gYWN0cyBvbiB0aGUgY29ycmVzcG9uZGluZyBBcHBsaWNhdGlvblN0YXRlIHByb3BlcnR5IHR5cGUuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VycyA9IHtcclxuICAgIGNvdW50ZXI6IENvdW50ZXIucmVkdWNlcixcclxuICAgIHdlYXRoZXJGb3JlY2FzdHM6IFdlYXRoZXJGb3JlY2FzdHMucmVkdWNlclxyXG59O1xyXG5cclxuLy8gVGhpcyB0eXBlIGNhbiBiZSB1c2VkIGFzIGEgaGludCBvbiBhY3Rpb24gY3JlYXRvcnMgc28gdGhhdCBpdHMgJ2Rpc3BhdGNoJyBhbmQgJ2dldFN0YXRlJyBwYXJhbXMgYXJlXHJcbi8vIGNvcnJlY3RseSB0eXBlZCB0byBtYXRjaCB5b3VyIHN0b3JlLlxyXG5leHBvcnQgaW50ZXJmYWNlIEFwcFRodW5rQWN0aW9uPFRBY3Rpb24+IHtcclxuICAgIChkaXNwYXRjaDogKGFjdGlvbjogVEFjdGlvbikgPT4gdm9pZCwgZ2V0U3RhdGU6ICgpID0+IEFwcGxpY2F0aW9uU3RhdGUpOiB2b2lkO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9zdG9yZS9pbmRleC50cyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDEzNCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2RvbWFpbi10YXNrL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgtdGh1bmsvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoNzEpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9