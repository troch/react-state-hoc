import * as React from 'react'
import { shallow } from 'enzyme'
import withState from '../withState'

describe('withState', () => {
    it('should handle state as a HoC', () => {
        interface State {
            visible: boolean
        }

        interface ExtraProps {
            setVisibility: (visible: boolean) => { visible: boolean }
        }

        const Component = ({ visible, setVisibility }) => (
            <button onClick={() => setVisibility(!visible)}>Toggle</button>
        )

        const FinalComponent = withState<{}, State, ExtraProps>(
            { visible: false },
            { setVisibility: visible => ({ visible }) }
        )(Component)

        expect(shallow(<FinalComponent />).prop('setState')).toBeDefined()
        expect(shallow(<FinalComponent />).prop('visible')).toBe(false)
        expect(shallow(<FinalComponent />).prop('setVisibility')).toBeDefined()
    })
})
