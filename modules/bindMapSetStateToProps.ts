import { MapSetStateToProps, MapStateCreatorsToProps, SetState } from './types'

export default function bindMapSetStateToProps<P, S, SCreators>(
    mapSetStateToProps:
        | MapSetStateToProps<P, S, SCreators>
        | MapStateCreatorsToProps<P, S, SCreators>,
    setState: SetState<P, S>,
    initialProps: P
): SCreators {
    if (typeof mapSetStateToProps === 'function') {
        return mapSetStateToProps(initialProps)(setState)
    }

    if (typeof mapSetStateToProps === 'object') {
        return Object.keys(mapSetStateToProps).reduce(
            (mappedProps: Partial<SCreators>, propName: string) => {
                const stateFactory = mapSetStateToProps[propName]

                mappedProps[propName] = (...args) =>
                    setState(stateFactory(...args) as Partial<S>)

                return mappedProps
            },
            {}
        ) as SCreators
    }

    return {} as SCreators
}
