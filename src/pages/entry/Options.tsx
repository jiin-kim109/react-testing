import React, {FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetail';

interface OptionProps {
    optionType: string
}

export default ({ optionType }: OptionProps): ReturnType<FunctionComponent> => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    // @ts-ignore
    const [orderDetails, updateItemCount] = useOrderDetails();
    
    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch(error => {
                setError(error);
            })
    }, [optionType]);

    if (error) {
        return <AlertBanner />;
    }

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
    
    //@ts-ignore
    const optionItems = items.map(item => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}/>);

    return (
        <>
            <h2>{title}</h2>
            <p>{pricePerItem[optionType]} each</p>
            <p>{title} total: {orderDetails.totals[optionType]}</p>
            <Row>{optionItems}</Row>
        </>
    )
}