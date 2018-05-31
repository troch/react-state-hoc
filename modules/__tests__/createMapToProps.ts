import createMapToProps from '../createMapToProps'
import { SetState } from '../types'

interface S {
    a: number
    b: number
}

interface ExtraP {
    doA: () => void
    doB: (n: number) => void
}

describe('createMapToProps', () => {
    describe('if mapStateToProps is a function', () => {
        it('should call mapStateToProps with the initialProps', () => {
            const mapStateToProps = jest.fn()
            const initialProps = { foo: 'bar' }
            const mapToProps = createMapToProps(initialProps, mapStateToProps)

            expect(mapStateToProps).toHaveBeenCalledWith(initialProps)
        })
    })

    describe('if mapStateToProps is an object', () => {
        it('should create a callback function', () => {
            const mapStateToProps = {
                doA: () => ({ a: 1 }),
                doB: (b: number) => ({ b })
            }
            const mapToProps = createMapToProps({}, mapStateToProps)

            expect(typeof mapToProps).toBe('function')

            const setState = jest.fn()
            const finalProps = mapToProps({}, setState) as {
                doA: Function
                doB: Function
            }

            expect(finalProps.doA).toBeDefined()
            expect(typeof finalProps.doA).toBe('function')
            expect(finalProps.doB).toBeDefined()
            expect(typeof finalProps.doB).toBe('function')

            finalProps.doA()

            expect(setState).toHaveBeenCalledWith({ a: 1 })

            finalProps.doB(2)

            expect(setState).toHaveBeenCalledWith({ b: 2 })
        })
    })

    describe('if mapStateToProps is undefined', () => {
        it('should spread state and pass setState', () => {
            const mapToProps = createMapToProps({})

            expect(typeof mapToProps).toBe('function')

            const state = { foo: 'bar', baz: 'qux' }
            const setState = jest.fn()
            const finalProps = mapToProps(state, setState) as any

            expect(finalProps.foo).toBe('bar')
            expect(finalProps.baz).toBe('qux')
            expect(finalProps.setState).toBeDefined()
            expect(finalProps.setState).toBe(setState)
        })
    })
})
