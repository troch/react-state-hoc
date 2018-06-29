import * as React from 'react'
import { mount } from 'enzyme'
import withState from '../withState'

describe('withState', () => {
    it('should handle state as a HoC', () => {
        const Component: any = ({ visible, setState }) => (
            <button onClick={() => setState({ visible: !visible })}>
                Toggle
            </button>
        )

        const ComponentWithState = withState({ visible: false })(Component)

        const wrapper = mount(<ComponentWithState />)
        const component = wrapper.find(Component)

        expect(component.prop('setState')).toBeDefined()
        expect(component.prop('visible')).toBe(false)
        expect(wrapper.instance().state).toEqual({ visible: false })

        component.find('button').prop('onClick')({} as any)

        expect(wrapper.instance().state).toEqual({ visible: true })
    })

    it('should accept an object of state creators', () => {
        const Component: any = ({ visible, setVisibility }) => (
            <button onClick={() => setVisibility(!visible)}>Toggle</button>
        )

        const ComponentWithState = withState<{}, {}, {}>(
            { visible: false },
            {
                setVisibility: visible => ({ visible })
            }
        )(Component)

        const wrapper = mount(<ComponentWithState />)
        const component = wrapper.find(Component)

        expect(component.prop('setVisibility')).toBeDefined()
        expect(wrapper.instance().state).toEqual({ visible: false })

        component.find('button').prop('onClick')({} as any)

        expect(wrapper.instance().state).toEqual({ visible: true })
    })

    it('should accept a mapSetStateToProps function', () => {
        const Component: any = ({ visible, setVisibility }) => (
            <button onClick={() => setVisibility(!visible)}>Toggle</button>
        )

        const ComponentWithState = withState<{}, {}, {}>(
            { visible: false },
            () => setState => ({
                setVisibility: visible => setState({ visible })
            })
        )(Component)

        const wrapper = mount(<ComponentWithState />)
        const component = wrapper.find(Component)

        expect(component.prop('setVisibility')).toBeDefined()
        expect(wrapper.instance().state).toEqual({ visible: false })

        component.find('button').prop('onClick')({} as any)

        expect(wrapper.instance().state).toEqual({ visible: true })
    })

    it('should accept a custom mergeProps function', () => {
        const Component: any = ({ visible, setVisibility }) => (
            <button onClick={() => setVisibility(!visible)}>Toggle</button>
        )

        const ComponentWithState = withState(
            { visible: false },
            null,
            (props, state, mappedProps) => ({
                state,
                props,
                ...mappedProps
            })
        )(Component)

        const wrapper = mount(<ComponentWithState />)
        const component = wrapper.find(Component)

        expect(component.prop('state')).toEqual({ visible: false })
        expect(component.prop('props')).toEqual({})
        expect(typeof component.prop('setState')).toBe('function')
    })
})
