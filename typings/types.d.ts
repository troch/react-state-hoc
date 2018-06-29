export declare type SetState<P, S> = (
    state: ((prevState: Readonly<S>, props: P) => Partial<S>) | Partial<S>,
    callback?: () => void
) => void
export interface SetStateProp<P, S> {
    setState: SetState<P, S>
}
export declare type MergeProps<P, S, ExtraP, MergedP> = (
    state?: S,
    setStateProps?: ExtraP,
    initialProps?: P
) => MergedP
export declare type MapSetStateToProps<P, S, ExtraP> = (
    initialProps: P
) => (setState: SetState<P, S>) => ExtraP
export declare type MapStateCreatorsToProps<P, S, ExtraP> = {
    [K in keyof ExtraP]: (
        ...args: any[]
    ) => ((prevState: Readonly<S>, props: P) => Partial<S>) | Partial<S>
}
export declare type InitialState<P, S> =
    | S
    | ((initialProps: Readonly<P>) => S | null)
