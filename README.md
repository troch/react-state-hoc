[![npm version](https://badge.fury.io/js/react-state-hoc.svg)](https://badge.fury.io/js/react-state-hoc)
[![Build Status](https://travis-ci.org/troch/react-state-hoc.svg?branch=v1.0.4)](https://travis-ci.org/troch/react-state-hoc)

# React state component (higher-order)

> A React higher-order component for abstracting away state

Keep your components simple, testable and composable by using higher-order components.
This higher-order component will abstract state away from components so you can keep using functional stateless components.

## Installation

```sh
npm install --save react-state-hoc
# or
yarn add react-state-hoc
```

## withState(initialState, mapSetStateToProps)(BaseComponent)

Create a new component by wrapping your component with `state` HOC. Alongside the properties you specify, the created component will receive its state as props with a `setState` function.

*   `initialState`: an object or a function of initial props returning an object
*   `mapSetStateToProps`:
  * A function returning additional props (`initialProps => setState => props`)
  * Or an object of state creators

```js
const mapSetStateToProps = () => setState => ({
    setCounter: counter => setState({ counter })
})
```

or

```js
const mapSetStateToProps = {
    setCounter: counter => ({ counter })
}
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
