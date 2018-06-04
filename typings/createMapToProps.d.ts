import { MapToProps, MapStateToProps, MapStateCreatorsToProps } from './types'
export default function createMapToProps<P, S, ExtraP>(
    initialProps: P,
    mapStateToProps?:
        | MapStateToProps<P, S, ExtraP>
        | MapStateCreatorsToProps<S, ExtraP>
): MapToProps<P, S, ExtraP>
