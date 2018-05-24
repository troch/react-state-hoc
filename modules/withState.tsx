import * as React from 'react'
import {
    InitialState,
    MapSetStateToProps,
    MapStateCreatorsToProps,
    SetState,
    SetStateProp
} from './types'
import bindMapSetStateToProps from './bindMapSetStateToProps'

function withState<P extends {}, S extends {}, ExtraP extends {} = {}>(
    initialState: InitialState<P, S>,
    mapSetStateToProps:
        | MapSetStateToProps<P, S, ExtraP>
        | MapStateCreatorsToProps<S, ExtraP>
) {
    type FinalProps = P & S & ExtraP & { setState: SetState<P, S> }

    return (
        BaseComponent: React.ComponentType<FinalProps>
    ): React.ComponentClass<P> => {
        return class StateHoc extends React.Component<P, S> {
            public static displayName: string = 'WithState'

            public mappedProps: ExtraP

            constructor(props) {
                super(props)
                this.state =
                    typeof initialState === 'function'
                        ? initialState(props)
                        : initialState

                this.setState = this.setState.bind(this)

                this.mappedProps = bindMapSetStateToProps(
                    mapSetStateToProps,
                    this.props,
                    this.setState as SetState<P, S>
                )
            }

            public render() {
                const { state, props, setState, mappedProps } = this

                return (
                    <BaseComponent
                        {...props}
                        {...state}
                        {...mappedProps}
                        setState={setState as SetState<P, S>}
                    />
                )
            }
        }
    }
}

export default withState
