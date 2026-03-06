'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    showHome?: boolean;
}

export function Breadcrumbs({ items, showHome = true }: BreadcrumbsProps) {
    const allItems = showHome
        ? [{ name: 'Inicio', url: '/' }, ...items]
        : items;

    return (
        <nav aria-label="Breadcrumb" className="breadcrumbs py-3">
            <ol className="flex items-center flex-wrap gap-2 text-sm">
                {allItems.map((item, index) => {
                    const isLast = index === allItems.length - 1;
                    const isHome = index === 0 && showHome;

                    return (
                        <li key={index} className="flex items-center gap-2">
                            {index > 0 && (
                                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                            )}

                            {isLast ? (
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {isHome && <Home className="w-4 h-4 inline mr-1" />}
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    href={item.url}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
                                >
                                    {isHome && <Home className="w-4 h-4 inline mr-1" />}
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
