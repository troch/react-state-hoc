import { createElement, Component } from 'react';

function state(initialState = {}, mapSetStateToProps = () => () => ({})) {
    return function (StatelessComponent) {
        class StateHoc extends Component {
            constructor(props) {
                super(props);
                this.state = typeof initialState === 'function' ? initialState(props) : initialState;
                this.setState = this.setState.bind(this);
                this.mappedProps = mapSetStateToProps(this.props)(this.setState);
            }

            render() {
                const { state, props, setState, mappedProps } = this;

                return createElement(StatelessComponent, {
                    ...props,
                    ...state,
                    ...mappedProps,
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
