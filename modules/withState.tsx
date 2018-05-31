import * as React from 'react'
import {
    InitialState,
    MapToProps,
    MapStateToProps,
    MapStateCreatorsToProps,
    SetState,
    SetStateProp
} from './types'
import bindMapStateToProps from './bindMapStateToProps'

function withState<P extends {}, S extends {}, ExtraP extends {} = {}>(
    initialState: InitialState<P, S>,
    mapStateToProps:
        | MapStateToProps<P, S, ExtraP>
        | MapStateCreatorsToProps<S, ExtraP>,
) {
    type FinalProps = P & S & ExtraP & { setState: SetState<P, S> }

    return (
        BaseComponent: React.ComponentType<FinalProps>
    ): React.ComponentClass<P> => {
        return class StateHoc extends React.Component<P, S> {
            public static displayName: string = 'WithState'
            public static mapToProps: MapToProps<P, S, ExtraP>

            constructor(props) {
                super(props)
                this.state =
                    typeof initialState === 'function'
                        ? initialState(props)
                        : initialState

                this.setState = this.setState.bind(this)

                this.mapToProps = bindMapStateToProps(
                    mapStateToProps,
                    this.props,
                )
            }

            public render() {
                const { state, props, setState, mapToProps } = this

                return React.createElement(BaseComponent, {
                    ...props,
                    ...this.mapToProps(state, setState)
                })
            }
        }
    }
}

export default withState
