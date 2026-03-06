'use client';

import { Facebook, Twitter, Linkedin, MessageCircle, Link2, Mail } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const shareUrl = `https://laboratorio.delbienestar.com.mx${url}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description || title);

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = (platform: string, link: string) => {
        window.open(link, '_blank', 'width=600,height=400');

        // Track share event in Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'share', {
                method: platform,
                content_type: 'article',
                item_id: url
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Compartir artículo</h3>

            <div className="flex flex-wrap gap-3">
                {/* WhatsApp */}
                <button
                    onClick={() => handleShare('whatsapp', shareLinks.whatsapp)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    aria-label="Compartir en WhatsApp"
                >
                    <MessageCircle size={20} />
                    <span className="hidden sm:inline">WhatsApp</span>
                </button>

                {/* Facebook */}
                <button
                    onClick={() => handleShare('facebook', shareLinks.facebook)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    aria-label="Compartir en Facebook"
                >
                    <Facebook size={20} />
                    <span className="hidden sm:inline">Facebook</span>
                </button>

                {/* Twitter */}
                <button
                    onClick={() => handleShare('twitter', shareLinks.twitter)}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                    aria-label="Compartir en Twitter"
                >
                    <Twitter size={20} />
                    <span className="hidden sm:inline">Twitter</span>
                </button>

                {/* LinkedIn */}
                <button
                    onClick={() => handleShare('linkedin', shareLinks.linkedin)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
                    aria-label="Compartir en LinkedIn"
                >
                    <Linkedin size={20} />
                    <span className="hidden sm:inline">LinkedIn</span>
                </button>

                {/* Email */}
                <a
                    href={shareLinks.email}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    aria-label="Compartir por Email"
                >
                    <Mail size={20} />
                    <span className="hidden sm:inline">Email</span>
                </a>

                {/* Copy Link */}
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-colors"
                    aria-label="Copiar enlace"
                >
                    <Link2 size={20} />
                    <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Copiar'}</span>
                </button>
            </div>

            {/* Share Count (Optional - can be added later with API) */}
            <p className="text-sm text-gray-500">
                Comparte este artículo con quien pueda beneficiarse
            </p>
        </div>
    );
}

// Compact version for inline use
export function SocialShareCompact({ url, title }: SocialShareProps) {
    const shareUrl = `https://laboratorio.delbienestar.com.mx${url}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Compartir:</span>
            <a
                href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
                aria-label="Compartir en WhatsApp"
            >
                <MessageCircle size={18} />
            </a>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
                aria-label="Compartir en Facebook"
            >
                <Facebook size={18} />
            </a>
            <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 hover:text-sky-600"
                aria-label="Compartir en Twitter"
            >
                <Twitter size={18} />
            </a>
        </div>
    );
}
