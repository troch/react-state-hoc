import { MapSetStateToProps, MapStateCreatorsToProps, SetState } from './types'

export default function bindSetMapStateToProps<P, S, ExtraP>(
    mapSetStateToProps:
        | MapSetStateToProps<P, S, ExtraP>
        | MapStateCreatorsToProps<S, ExtraP>,
    initialProps: P,
    setState: SetState<P, S>
): ExtraP {
    if (typeof mapSetStateToProps === 'function') {
        return (mapSetStateToProps as MapSetStateToProps<P, S, ExtraP>)(
            initialProps
        )(setState) as ExtraP
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
