import { MapSetStateToProps, MapStateCreatorsToProps, SetState } from './types'

export default function bindMapSetStateToProps<P, S, ExtraP>(
    mapSetStateToProps:
        | MapSetStateToProps<P, S, ExtraP>
        | MapStateCreatorsToProps<P, S, ExtraP>,
    setState: SetState<P, S>,
    initialProps: P
): ExtraP {
    if (typeof mapSetStateToProps === 'function') {
        return mapSetStateToProps(initialProps)(setState)
    }

    if (typeof mapSetStateToProps === 'object') {
        return Object.keys(mapSetStateToProps).reduce(
            (mappedProps: Partial<ExtraP>, propName: string) => {
                const stateFactory = mapSetStateToProps[propName]

                mappedProps[propName] = (...args) =>
                    setState(stateFactory(...args) as Partial<S>)

                return mappedProps
            },
            {}
        ) as ExtraP
    }

    return {} as ExtraP
}
