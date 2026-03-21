import { Loader2 } from 'lucide-react';

export default function LoadingCategoryPage() {
    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            <div className="max-w-7xl mx-auto">
                {/* Skeleton Banner Header */}
                <div className="relative h-80 bg-green-800 overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                        <div className="w-32 h-6 bg-green-700 rounded-md mb-4" />
                        <div className="w-3/4 md:w-1/2 h-16 bg-green-700 rounded-lg mb-4" />
                        <div className="w-full md:w-2/3 h-6 bg-green-700 rounded-md mb-2" />
                        <div className="w-48 h-4 bg-green-700 rounded-md" />
                    </div>
                </div>

                {/* Skeleton Filters */}
                <div className="px-4 py-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 h-40 flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
                    </div>

                    {/* Skeleton List */}
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-6 flex items-start gap-6">
                                <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="w-1/3 h-6 bg-gray-200 rounded-md mb-4" />
                                    <div className="w-full h-4 bg-gray-200 rounded-md mb-2" />
                                    <div className="w-5/6 h-4 bg-gray-200 rounded-md mb-6" />
                                    <div className="w-24 h-8 bg-gray-200 rounded-md" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
