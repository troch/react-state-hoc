import { createRenderer, renderIntoDocument, findRenderedComponentWithType } from 'react-dom/test-utils';
import { expect } from 'chai';
import React, { Component } from 'react';
import h from 'react-hyperscript';
import state from './state';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>');

global.document = window.document;
global.window = window;

describe('State hoc', function() {
    it('should abstract state away', function() {
        class TestComponent extends Component {
            constructor(props) {
                super(props);
                this.parentSetState = props.setState;
            }

            render() {
                const { a } = this.props;
                return h('div', {}, a);
            }
        }

        const WrappedTestComponent = state({ a: 1 })(TestComponent);
        expect(WrappedTestComponent.displayName).to.equal('Stateful[TestComponent]');

        const wrappedTestComponent = renderIntoDocument(h(WrappedTestComponent, { b: 2 }));
        let statefulComp = findRenderedComponentWithType(wrappedTestComponent, TestComponent);
        expect(statefulComp.props.a).to.equal(1);
        expect(statefulComp.props.b).to.equal(2);

        statefulComp.props.setState({a: 2});
        statefulComp = findRenderedComponentWithType(wrappedTestComponent, TestComponent);
        expect(statefulComp.props.a).to.equal(2);
    });
});
