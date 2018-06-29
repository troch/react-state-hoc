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

const defaultMergeProps = (state, stateCreators, props) => ({
    ...props,
    ...state,
    ...stateCreators
})

function withState<
    P extends {},
    S extends {},
    SCreators extends {} = { setState?: SetState<P, S> },
    MergedP extends {} = P & S & SCreators
>(
    initialState: InitialState<P, S>,
    mapSetStateToProps?:
        | MapSetStateToProps<P, S, SCreators>
        | MapStateCreatorsToProps<P, S, SCreators>,
    mergeProps?: MergeProps<P, S, SCreators, MergedP>
) {
    return (
        BaseComponent: React.ComponentType<MergedP>
    ): React.ComponentClass<P> => {
        return class StateHoc extends React.Component<P, S> {
            public static displayName: string = 'WithState'

            public stateCreators: SCreators
            public merge: MergeProps<P, S, SCreators, MergedP>

            constructor(props) {
                super(props)
                this.state =
                    typeof initialState === 'function'
                        ? initialState(props)
                        : initialState

                this.setState = this.setState.bind(this)

                this.stateCreators = bindMapSetStateToProps(
                    mapSetStateToProps ||
                        (defaultMapSetStateToProps as MapSetStateToProps<
                            P,
                            S,
                            SCreators
                        >),
                    this.setState as SetState<P, S>,
                    this.props
                )

                this.merge = mergeProps || defaultMergeProps
            }

            public render() {
                const { state, props, setState, stateCreators, merge } = this

                return React.createElement(
                    BaseComponent,
                    merge(props, state, stateCreators)
                )
            }
        }
    }
}

export default withState
