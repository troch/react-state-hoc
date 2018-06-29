export type SetState<P, S> = (
    state: ((prevState: Readonly<S>, props: P) => Partial<S>) | Partial<S>,
    callback?: () => void
) => void

export interface SetStateProp<P, S> {
    setState: SetState<P, S>
}

export type MergeProps<P, S, SCreators, MergedP> = (
    props: P,
    state: S,
    setStateProps: SCreators
) => MergedP

export type MapSetStateToProps<P, S, SCreators> = (
    initialProps: P
) => (setState: SetState<P, S>) => SCreators

export type MapStateCreatorsToProps<P, S, SCreators> = {
    [K in keyof SCreators]: (
        ...args: any[]
    ) => ((prevState: Readonly<S>, props: P) => Partial<S>) | Partial<S>
}

export type InitialState<P, S> = S | ((initialProps: Readonly<P>) => S | null)
