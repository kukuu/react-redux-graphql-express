import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions/actions.js';

let Query = React.createClass({
  componentDidMount() {
    this.props.dispatch(getGraph("{goldberg(id: 1) {id, categories, tags, desc }}"));
  },
  render() {
    let dispatch = this.props.dispatch;
    let fetchInProgress = String(this.props.store.get('fetching'));
    let queryText;
    
    
    //toObject() Returns an object with each property name and value
    //corresponding to the entries in this collection.
   //For collections that are not maps, the generated property names correspond to each index.
    let goldberg = this.props.store.get('data').toObject();
    
    return (
      <div>
        <p>Fetch in progress: {fetchInProgress}</p>
        <h3>{ goldberg.categories }</h3>
        <p>{ goldberg.tags }</p>
        <p>{ goldberg.desc }</p>
        <input ref={node => {queryText = node}}></input>
        <button onClick={() => {dispatch(getGraph(queryText.value))}}>
          query
        </button>
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    store: state
  }
};

export const QueryContainer = connect(
  mapStateToProps
)(Query);


//{goldberg(_id: 1) {_id, categories, tags}}
