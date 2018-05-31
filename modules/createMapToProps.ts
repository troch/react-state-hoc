import {
    MapToProps,
    MapStateToProps,
    MapStateCreatorsToProps,
    SetState
} from './types'

export default function bindMapStateToProps<P, S, ExtraP>(
    initialProps: P,
    mapStateToProps?:
        | MapStateToProps<P, S, ExtraP>
        | MapStateCreatorsToProps<S, ExtraP>
): MapToProps<P, S, ExtraP> {
    if (typeof mapStateToProps === 'function') {
        return mapStateToProps(initialProps)
    }

    if (typeof mapStateToProps === 'object') {
        return (state, setState) =>
            Object.keys(mapStateToProps).reduce(
                (mappedProps: Partial<ExtraP>, propName: string) => {
                    const stateFactory = mapStateToProps[propName]

                    mappedProps[propName] = (...args) =>
                        setState(stateFactory(...args) as Partial<S>)

                    return mappedProps
                },
                Object.assign({}, state, { setState })
            ) as ExtraP
    }

    const fallback = (state, setState) => ({ ...state, setState })

    return fallback as MapToProps<P, S, ExtraP>
}
