/// <reference types="react" />
import * as React from 'react';
import { InitialState, MapSetStateToProps, MapStateCreatorsToProps, SetState } from './types';
declare function withState<P extends {}, S extends {}, ExtraP extends {} = {}>(initialState: InitialState<P, S>, mapSetStateToProps: MapSetStateToProps<P, S, ExtraP> | MapStateCreatorsToProps<S, ExtraP>): (BaseComponent: React.ComponentType<P & S & ExtraP & {
    setState: SetState<P, S>;
}>) => React.ComponentClass<P>;
export default withState;
