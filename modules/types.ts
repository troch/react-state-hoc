export type SetState<P, S> = (
    state: ((prevState: Readonly<S>, props: P) => Partial<S>) | Partial<S>,
    callback?: () => void
) => void

export interface SetStateProp<P, S> {
    setState: SetState<P, S>
}

export type MapToProps<P, S, ExtraP> = (
    state: S,
    setState: SetState<P, S>
) => ExtraP

export type MapStateToProps<P, S, ExtraP> = (
    initialProps: P
) => MapToProps<P, S, ExtraP>

export type MapStateCreatorsToProps<S, ExtraP> = {
    [K in keyof ExtraP]: (...args: any[]) => Partial<S>
}

export type InitialState<P, S> = S | ((initialProps: Readonly<P>) => S | null)
