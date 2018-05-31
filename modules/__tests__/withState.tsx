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

        const component = shallow(<FinalComponent />)

        expect(component.prop('setState')).toBeDefined()
        expect(component.prop('visible')).toBe(false)
        expect(component.prop('setVisibility')).toBeDefined()
    })
})
