import React, {FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';

interface OptionProps {
    optionType: string
}

export default ({ optionType }: OptionProps): ReturnType<FunctionComponent> => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    
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
    
    //@ts-ignore
    const optionItems = items.map(item => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />);

    return (
        <Row>{optionItems}</Row>
    )
}