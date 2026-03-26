'use client';

import { useEffect, useRef } from 'react';

interface GoogleAdProps {
    slot: string;
    format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
    layout?: string;
    responsive?: boolean;
    className?: string;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export function GoogleAd({
    slot,
    format = 'auto',
    layout,
    responsive = true,
    className = '',
}: GoogleAdProps) {
    const adRef = useRef<HTMLDivElement>(null);
    const pushed = useRef(false);

    useEffect(() => {
        if (pushed.current) return;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushed.current = true;
        } catch (e) {
            // AdSense not loaded yet
        }
    }, []);

    return (
        <div className={`ad-container my-6 ${className}`}>
            <div className="text-center">
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-6867283748828267"
                    data-ad-slot={slot}
                    data-ad-format={format}
                    {...(layout ? { 'data-ad-layout': layout } : {})}
                    {...(responsive ? { 'data-full-width-responsive': 'true' } : {})}
                />
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-1 uppercase tracking-wider">
                Publicidad
            </p>
        </div>
    );
}
