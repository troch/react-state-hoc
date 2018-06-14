import bindMapSetStateToProps from '../bindMapSetStateToProps'
import { SetState } from '../types'

describe('bindMapSetStateToProps', () => {
    describe('when mapSetStateToProps is a function', () => {
        it('should return mapped props', () => {
            const mapSetStateToProps = initialProps => setState => ({
                ...initialProps,
                initialProps,
                setState,
                setVisible: () => setState({ visible: true })
            })
            const fn = jest.fn()
            const props = { foo: 'bar' }

            const boundProps = bindMapSetStateToProps(
                mapSetStateToProps,
                fn,
                props
            )

            expect(boundProps.foo).toBe('bar')
            expect(boundProps.initialProps).toEqual(props)
            expect(boundProps.setState).toBe(fn)
            expect(boundProps.setVisible).toBeDefined()

            boundProps.setState({ baz: 'qux' })

            expect(fn).toHaveBeenCalledWith({ baz: 'qux' })

            boundProps.setVisible()

            expect(fn).toHaveBeenCalledWith({ visible: true })
        })
    })

    describe('when mapSetStateToProps is an object', () => {
        it('should return bound state creators', () => {
            const mapSetStateToProps = {
                setVisibility: visible => ({ visible }),
                setVisible: () => ({ visible: true })
            }
            const fn = jest.fn()
            const props = { foo: 'bar' }

            const boundProps = bindMapSetStateToProps(
                mapSetStateToProps,
                fn,
                props
            ) as any

            expect(boundProps.setVisibility).toBeDefined()
            expect(boundProps.setVisible).toBeDefined()

            boundProps.setVisible()

            expect(fn).toHaveBeenCalledWith({ visible: true })

            boundProps.setVisibility('test')

            expect(fn).toHaveBeenCalledWith({ visible: 'test' })
        })
    })
})
