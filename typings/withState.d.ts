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
    ExtraP extends {} = {
        setState?: SetState<P, S>
    },
    MergedP extends {} = P & S & ExtraP
>(
    initialState: InitialState<P, S>,
    mapSetStateToProps?:
        | MapSetStateToProps<P, S, ExtraP>
        | MapStateCreatorsToProps<P, S, ExtraP>,
    mergeProps?: MergeProps<P, S, ExtraP, MergedP>
): (BaseComponent: React.ComponentType<MergedP>) => React.ComponentClass<P>
export default withState
