(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.state = mod.exports;
    }
})(this, function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function state() {
        var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return function (StatelessComponent) {
            var StateHoc = function (_Component) {
                _inherits(StateHoc, _Component);

                function StateHoc(props) {
                    _classCallCheck(this, StateHoc);

                    var _this = _possibleConstructorReturn(this, (StateHoc.__proto__ || Object.getPrototypeOf(StateHoc)).call(this, props));

                    _this.state = typeof initialState === 'function' ? initialState(props) : initialState;
                    _this.setState = _this.setState.bind(_this);
                    return _this;
                }

                _createClass(StateHoc, [{
                    key: 'render',
                    value: function render() {
                        var state = this.state,
                            props = this.props,
                            setState = this.setState;


                        return (0, _react.createElement)(StatelessComponent, _extends({}, props, state, {
                            setState: setState
                        }));
                    }
                }]);

                return StateHoc;
            }(_react.Component);

            var componentName = StatelessComponent.displayName || StatelessComponent.name || 'Component';
            StateHoc.displayName = 'Stateful[' + componentName + ']';

            return StateHoc;
        };
    }

    exports.default = state;
});
