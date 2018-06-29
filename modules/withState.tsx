import * as React from 'react'
import {
    InitialState,
    MergeProps,
    MapSetStateToProps,
    MapStateCreatorsToProps,
    SetState,
    SetStateProp
} from './types'
import bindMapSetStateToProps from './bindMapSetStateToProps'

const defaultMapSetStateToProps: MapSetStateToProps<{}, {}, {}> = () => {
    return setState => ({ setState })
}

const defaultMergeProps = (state, mappedProps, props) => ({
    ...props,
    ...state,
    ...mappedProps
})

function withState<
    P extends {},
    S extends {},
    ExtraP extends {} = { setState?: SetState<P, S> },
    MergedP extends {} = P & S & ExtraP
>(
    initialState: InitialState<P, S>,
    mapSetStateToProps?:
        | MapSetStateToProps<P, S, ExtraP>
        | MapStateCreatorsToProps<P, S, ExtraP>,
    mergeProps?: MergeProps<P, S, ExtraP, MergedP>
) {
    return (
        BaseComponent: React.ComponentType<MergedP>
    ): React.ComponentClass<P> => {
        return class StateHoc extends React.Component<P, S> {
            public static displayName: string = 'WithState'

            public mappedProps: ExtraP
            public merge: MergeProps<P, S, ExtraP, MergedP>

            constructor(props) {
                super(props)
                this.state =
                    typeof initialState === 'function'
                        ? initialState(props)
                        : initialState

                this.setState = this.setState.bind(this)

                this.mappedProps = bindMapSetStateToProps(
                    mapSetStateToProps ||
                        (defaultMapSetStateToProps as MapSetStateToProps<
                            P,
                            S,
                            ExtraP
                        >),
                    this.setState as SetState<P, S>,
                    this.props
                )

                this.merge = mergeProps || defaultMergeProps
            }

            public render() {
                const { state, props, setState, mappedProps, merge } = this

                return React.createElement(
                    BaseComponent,
                    merge(props, state, mappedProps)
                )
            }
        }
    }
}

export default withState
