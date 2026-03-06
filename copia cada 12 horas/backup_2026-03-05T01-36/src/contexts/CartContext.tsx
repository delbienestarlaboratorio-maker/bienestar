'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { visitorIntelligence } from '@/lib/tracking/visitor-intelligence';

interface CartItem {
    id: string;
    name: string;
    price: number;
    priceRegular: number;
    promotionalPrice?: number;
    category: string;
    slug: string;
    quantity: number;
    turnaroundTime?: string;
    preparation?: string;
}

interface CartContextType {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    total: number;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isClient, setIsClient] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        setIsClient(true);
        const savedCart = localStorage.getItem('lab-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Error loading cart:', e);
            }
        }
    }, []);

    // Save to localStorage whenever cart changes
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('lab-cart', JSON.stringify(items));
        }
    }, [items, isClient]);

    // Detect cart abandonment on page unload
    useEffect(() => {
        const handleUnload = () => {
            if (items.length > 0) {
                visitorIntelligence?.trackCartAbandonment();
            }
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, [items]);

    const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
        // Track in visitor intelligence
        visitorIntelligence?.trackCartAdd(newItem.slug);

        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === newItem.id);

            if (existingItem) {
                // Increment quantity if already in cart
                return prevItems.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item
                return [...prevItems, { ...newItem, quantity: 1 }];
            }
        });
    };

    const removeItem = (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    const subtotal = items.reduce((total, item) => {
        const price = item.promotionalPrice || item.price;
        return total + (price * item.quantity);
    }, 0);

    const total = subtotal; // Aquí puedes agregar descuentos, impuestos, etc.

    const isInCart = (id: string) => {
        return items.some(item => item.id === id);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                itemCount,
                subtotal,
                total,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
