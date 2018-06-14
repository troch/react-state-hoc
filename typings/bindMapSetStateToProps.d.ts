import { MapSetStateToProps, MapStateCreatorsToProps, SetState } from './types'

export default function bindSetMapStateToProps<P, S, ExtraP>(
    mapSetStateToProps:
        | MapSetStateToProps<P, S, ExtraP>
        | MapStateCreatorsToProps<S, ExtraP>,
    setState: SetState<P, S>,
    initialProps: P
): ExtraP
