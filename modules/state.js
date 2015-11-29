import { createElement, Component } from 'react';

function state(initialState = {}) {
    return function (StatelessComponent) {
        class StateHoc extends Component {
            constructor(props) {
                super(props);
                this.state = typeof initialState === 'function' ? initialState(props) : initialState;
                this.setState = this.setState.bind(this);
            }

            render() {
                const { state, props, setState } = this;

                return createElement(StatelessComponent, {
                    ...props,
                    ...state,
                    setState
                });
            }
        }

        const componentName = StatelessComponent.displayName || StatelessComponent.name || 'Component';
        StateHoc.displayName = `Stateful[${componentName}]`;

        return StateHoc;
    };
}

export default state;
