[![npm version](https://badge.fury.io/js/react-state-hoc.svg)](https://badge.fury.io/js/react-state-hoc)
[![Build Status](https://travis-ci.org/troch/react-state-hoc.svg?branch=v1.0.4)](https://travis-ci.org/troch/react-state-hoc)

# React state component (higher-order)

> A React higher-order component for abstracting away state

Keep your components simple, testable and composable by using higher-order components.
This higher-order component will abstract state away from components so you can keep using functional stateless components.

> A higher-order component is just a function that takes an existing component and returns another component that wraps it.

Read about higher-order components here (applies to deku as well): __[Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.c8wftb16t)__.


### Installation

```sh
npm install --save react-state-hoc
```


### withState(initialState, mapSetStateToProps)(BaseComponent)

Create a new component by wrapping your component with `state` HOC. Alongside the properties you specify, the created component will receive its state as props with a `setState` function.

- `initialState`: an object or a function of initial props returning an object
- `mapSetStateToProps`: a function returning additional props (`initialProps => setState => props`)


```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function StatelessButton({ counter, setCounter }) {
    return (
        <button onClick={ () => setCounter(counter + 1) }>
            Clicked { counter } times.
        </button>
    );
}

const mapSetStateToProps = () => setState => ({
    setCounter: (counter) => setState({ counter })
})

const StatefulButton1 = state({ counter: 0 }, mapSetStateToProps)(StatelessButton);
const StatefulButton2 = state({ counter: 10 }, mapSetStateToProps)(StatelessButton);

ReactDOM.render(
    <div>
        <StatefulButton1 />
        <StatefulButton2 />
    </div>,
    document.getElementById('app')
);
```
