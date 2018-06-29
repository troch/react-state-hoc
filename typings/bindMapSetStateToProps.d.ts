import { MapSetStateToProps, MapStateCreatorsToProps, SetState } from './types'
export default function bindMapSetStateToProps<P, S, SCreators>(
    mapSetStateToProps:
        | MapSetStateToProps<P, S, SCreators>
        | MapStateCreatorsToProps<P, S, SCreators>,
    setState: SetState<P, S>,
    initialProps: P
): SCreators
