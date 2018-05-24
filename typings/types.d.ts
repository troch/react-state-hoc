export declare type SetState<P, S> = (state: ((prevState: Readonly<S>, props: P) => Partial<S> | null), callback?: () => void) => void;
export interface SetStateProp<P, S> {
    setState: SetState<P, S>;
}
export declare type MapSetStateToProps<P, S, ExtraP> = (initialProps: P) => (setState: SetState<P, S>) => ExtraP;
export declare type MapStateCreatorsToProps<S, ExtraP> = {
    [K in keyof ExtraP]: (...args: any[]) => Partial<S>;
};
export declare type InitialState<P, S> = S | ((initialProps: Readonly<P>) => S | null);
