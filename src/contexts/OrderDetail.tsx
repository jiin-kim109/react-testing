import React, { FunctionComponent, useState, useMemo, useContext, createContext, useEffect } from 'react';
import { pricePerItem } from '../constants';

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
}

// @ts-ignore
const OrderDetails = createContext();

export function useOrderDetails() {
    const context = useContext(OrderDetails);

    if(!context){
        throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
    }

    return context;
}

// @ts-ignore
function calculateSubtotal(optionType, optionCounts) {
    let optionCount = 0;
    for(const count of optionCounts[optionType].values()){
        optionCount += count;
    }

    return optionCount * pricePerItem[optionType];
}

// @ts-ignore
export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCount] = useState({
        scoops: new Map(),
        toppings: new Map()
    });
    const zeroCurrency = formatCurrency(0);
    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    });

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal)
        });
    }, [optionCounts])
    
    const value = useMemo(() => {
        // @ts-ignore
        function updateItemCount(itemName, newItemCount, optionType) {
            const newOptionCounts = { ...optionCounts };

            const optionCountsMap = newOptionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionCount(newOptionCounts);
        }
        return [{...optionCounts, totals}, updateItemCount];
    }, []);

    return <OrderDetails.Provider value={value} {...props} />
}