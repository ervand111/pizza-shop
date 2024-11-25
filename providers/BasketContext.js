import React, { createContext, useEffect, useState } from 'react';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [baskets, setBaskets] = useState(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('basket')) || [];
        }
        return [];
    });

    const [favorites, setFavorites] = useState(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('favorites')) || [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('basket', JSON.stringify(baskets));
        }
    }, [baskets]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    function add(item) {
        const existingProductIndex = baskets.findIndex((x) => x.id === item.id);
        if (existingProductIndex !== -1) {
            const updatedBasket = [...baskets];
            updatedBasket[existingProductIndex] = {
                ...updatedBasket[existingProductIndex],
                quantity: updatedBasket[existingProductIndex].quantity + 1,
            };
            setBaskets(updatedBasket);
        } else {
            setBaskets([...baskets, { ...item, quantity: 1 }]);
        }
    }

    function addFavorite(item) {
        if (!favorites.some((x) => x.id === item.id)) {
            setFavorites([...favorites, item]);
        }
    }

    // Remove item from basket
    function remove(item) {
        const updatedBasket = baskets.filter((x) => x.id !== item.id);
        setBaskets(updatedBasket);
    }

    // Remove item from favorites
    function removeFromFavorite(item) {
        const updatedFavorites = favorites.filter((x) => x.id !== item.id);
        setFavorites(updatedFavorites);
    }

    // Check if item is in basket
    function isBasket(item) {
        if (!item || !item.id) return false;
        return baskets.some((x) => x.id === item.id);
    }

    function isFavorite(item) {
        if (!item || !item.id) return false;
        return favorites.some((x) => x.id === item.id);
    }
    return (
        <BasketContext.Provider
            value={{
                baskets,
                favorites,
                addFavorite,
                add,
                removeFromFavorite,
                remove,
                isFavorite,
                isBasket,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

export default BasketContext;
