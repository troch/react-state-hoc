[![npm version](https://badge.fury.io/js/react-state-hoc.svg)](https://badge.fury.io/js/react-state-hoc)
[![Build Status](https://travis-ci.org/troch/react-state-hoc.svg?branch=v1.0.4)](https://travis-ci.org/troch/react-state-hoc)

# React state component (higher-order)

> A React higher-order component for abstracting away state

Keep your components simple, testable, and composable by using higher-order components. This higher-order component will abstract state away from components, so you can keep using functional stateless components.

## Installation

```sh
npm install --save react-state-hoc
# or
yarn add react-state-hoc
```

## API

### withState(initialState, mapSetStateToProps?, mergeProps?)(BaseComponent)

Wraps your `BaseComponent` with a stateful component, passing the state into the `BaseComponent` as props. By default, state will be spread into the component's props, plus the `setState` function is passed through.

Two optional arguments allow you to a) define state creators, and b) customise which props are passed into the `BaseComponent`.

*   `initialState` can be either:
    * An object, to be used as the component's initial state.

        ```js
        withState({ visible: true })(BaseComponent)
        ```

    * A function, which maps initial props to initial state.

        ```js
        withState(props => ({ visible: props.visible }))(BaseComponent)
        ```

*   `mapSetStateToProps` can be either:
    * An object, containing state creators. Each state creator is a function which maps input arguments to new state. State creators are a convenient shorthand which automatically binds `setState` into smaller functions.

        ```js
        withState(
            { visible: true },
            { setVisibility: visible => ({ visible }) }
        )(BaseComponent)
        ```

    * A function, mapping `initialProps` and `setState` to state creators.

        ```js
        withState({ state: null }, initialProps => setState => ({
            setValue: value => setState({
                someState: initialProps.mapValue(value)
            })
        }))(BaseComponent)
        ```

        **Default:**

        ```js
        () => setState => ({ setState })
        ```

* `mergeProps`: A function mapping the current `state`, `stateCreators`, and `props` into the `BaseComponent`'s props.

    ```js
    withState(
        { visible: true },
        { setVisibility: visible => ({ visible }) },
        (state, stateCreators, props) => ({
            ...state,
            ...stateCreators
            // deliberately not passing props through to BaseComponent
        })
    )(BaseComponent)
    ```

    **Default:**

    ```js
    (state, creators, props) => ({ ...props, ...creators, ...state })
    ```


## Example

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import withState from 'react-state-hoc'

function StatelessButton({ counter, setCounter }) {
    return (
        <button onClick={() => setCounter(counter + 1)}>
            Clicked {counter} times.
        </button>
    )
}

const mapSetStateToProps = () => setState => ({
    setCounter: counter => setState({ counter })
})

const StatefulButton1 = withState({ counter: 0 }, mapSetStateToProps)(
    StatelessButton
)

const StatefulButton2 = withState({ counter: 10 }, mapSetStateToProps)(
    StatelessButton
)

ReactDOM.render(
    <div>
        <StatefulButton1 />
        <StatefulButton2 />
    </div>,
    document.getElementById('app')
)
```
