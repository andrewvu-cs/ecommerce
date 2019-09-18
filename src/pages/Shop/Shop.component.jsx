import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverviewContainer from "../../components/CollectionsOverview/CollectionsOverview.container";
import CollectionPageContainer from "../Collection/Collection.container";


import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
  // state = {
  //   loading: true
  // };

  // unsubscribeFromSnapshot = null;

  // componentDidMount() {
  //   const { updateCollections } = this.props;
  //   const collectionRef = firestore.collection("collections");

  //   // Observerable pattern
  //   // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
  //   //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   //   // console.log(snapshot);
  //   //   updateCollections(collectionsMap);
  //   //   this.setState({ loading: false });
  //   // });

  //   // Promise pattern
  //   collectionRef.get().then(snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     // console.log(snapshot);
  //     updateCollections(collectionsMap);
  //     this.setState({ loading: false });
  //   });
  // }

  componentDidMount(){
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
