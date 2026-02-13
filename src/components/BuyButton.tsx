'use client';

interface BuyButtonProps {
    studyName: string;
    price: number;
}

export default function BuyButton({ studyName, price }: BuyButtonProps) {
    const handleBuyNow = async () => {
        const email = prompt('Por favor ingrese su correo electrónico:');
        if (!email) return;

        if (!email.includes('@')) {
            alert('Por favor ingrese un correo electrónico válido');
            return;
        }

        try {
            const response = await fetch('/api/pagos/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: [{
                        name: studyName,
                        price: price,
                    }],
                    email: email,
                    user_id: 'guest',
                }),
            });

            const data = await response.json();

            if (data.success && data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                alert('Error al crear el link de pago. Por favor intente de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar el pago. Por favor intente de nuevo.');
        }
    };

    return (
        <button
            onClick={handleBuyNow}
            className="flex-1 min-w-[200px] bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
        >
            <span className="text-xl">🛒</span>
            <span>Agregar al carrito</span>
        </button>
    );
}
