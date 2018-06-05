import { MapSetStateToProps, MapStateCreatorsToProps, SetState } from './types'

export default function bindSetMapStateToProps<P, S, ExtraP>(
    mapStateToProps:
        | MapSetStateToProps<P, S, ExtraP>
        | MapStateCreatorsToProps<S, ExtraP>,
    setState: SetState<P, S>,
    initialProps: P
): ExtraP {
    if (typeof mapStateToProps === 'function') {
        return mapStateToProps(initialProps)(setState)
    }

    if (typeof mapStateToProps === 'object') {
        return Object.keys(mapStateToProps).reduce(
            (mappedProps: Partial<ExtraP>, propName: string) => {
                const stateFactory = mapStateToProps[propName]

                mappedProps[propName] = (...args) =>
                    setState(stateFactory(...args) as Partial<S>)

                return mappedProps
            },
            {}
        ) as ExtraP
    }

    return {} as ExtraP
}
