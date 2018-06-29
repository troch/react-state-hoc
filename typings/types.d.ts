export declare type SetState<P, S> = (
    state: ((prevState: Readonly<S>, props: P) => Partial<S>) | Partial<S>,
    callback?: () => void
) => void
export interface SetStateProp<P, S> {
    setState: SetState<P, S>
}
export declare type MergeProps<P, S, SCreators, MergedP> = (
    props: P,
    state: S,
    setStateProps: SCreators
) => MergedP
export declare type MapSetStateToProps<P, S, SCreators> = (
    initialProps: P
) => (setState: SetState<P, S>) => SCreators
export declare type MapStateCreatorsToProps<P, S, SCreators> = {
    [K in keyof SCreators]: (
        ...args: any[]
    ) => ((prevState: Readonly<S>, props: P) => Partial<S>) | Partial<S>
}
export declare type InitialState<P, S> =
    | S
    | ((initialProps: Readonly<P>) => S | null)
