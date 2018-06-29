/// <reference types="react" />
import * as React from 'react'
import {
    InitialState,
    MergeProps,
    MapSetStateToProps,
    MapStateCreatorsToProps,
    SetState
} from './types'
declare function withState<
    P extends {},
    S extends {},
    SCreators extends {} = {
        setState?: SetState<P, S>
    },
    MergedP extends {} = P & S & SCreators
>(
    initialState: InitialState<P, S>,
    mapSetStateToProps?:
        | MapSetStateToProps<P, S, SCreators>
        | MapStateCreatorsToProps<P, S, SCreators>,
    mergeProps?: MergeProps<P, S, SCreators, MergedP>
): (BaseComponent: React.ComponentType<MergedP>) => React.ComponentClass<P>
export default withState
