import bindMapSetStateToProps from '../bindMapSetStateToProps'
import { SetState } from '../types'

interface S {
    a: number
    b: number
}

interface ExtraP {
    doA: () => void
    doB: (n: number) => void
}

describe('bindMapSetStateToProps', () => {
    it('should bind a function', () => {
        const setState = jest.fn()
        const bindedProps: ExtraP = bindMapSetStateToProps<{}, S, ExtraP>(
            ({}) => (setState: SetState<{}, S>) => ({
                doA: () => setState({ a: 1 }),
                doB: (b: number) => setState({ b })
            }),
            {},
            setState
        )

        expect(bindedProps.doA).toBeDefined()
        expect(bindedProps.doB).toBeDefined()

        bindedProps.doA()

        expect(setState).toHaveBeenCalledWith({ a: 1 })

        bindedProps.doB(2)

        expect(setState).toHaveBeenCalledWith({ b: 2 })
    })

    it('should bind state creators', () => {
        const setState = jest.fn()
        const bindedProps: ExtraP = bindMapSetStateToProps<{}, S, ExtraP>(
            {
                doA: () => ({ a: 1 }),
                doB: (b: number) => ({ b })
            },
            {},
            setState
        )

        expect(bindedProps.doA).toBeDefined()
        expect(bindedProps.doB).toBeDefined()

        bindedProps.doA()

        expect(setState).toHaveBeenCalledWith({ a: 1 })

        bindedProps.doB(2)

        expect(setState).toHaveBeenCalledWith({ b: 2 })
    })
})
