import React, { Component } from 'react';

import SHOP_DATA from './shop.data';

import CollectionPreview from '../../components/CollectionPreview/CollectionPreview.component';

class ShopPage extends Component{

    state = {
        collections: SHOP_DATA
    }

    render(){
        const {collections} = this.state;
        return (
            <div className='shop-page'>
            {
                collections.map(({id, ...collectionProps}) => (
                    <CollectionPreview key={id} {...collectionProps}/>
                ))
            }
            </div>

        )
    }
}

export default ShopPage;