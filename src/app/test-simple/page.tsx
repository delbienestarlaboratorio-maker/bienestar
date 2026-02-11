export default function TestPage() {
    return (
        <div className="min-h-screen bg-white p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Test Page - Simple HTML
            </h1>
            <p className="text-lg text-gray-700">
                This is a completely simple test page with zero complexity.
                If this loads without errors, the problem is specific to the study pages.
            </p>
            <div className="mt-8 p-4 bg-blue-50 rounded">
                <h2 className="text-2xl font-semibold mb-2">Status</h2>
                <p>✅ Page loaded successfully</p>
                <p>✅ No server components errors</p>
                <p>✅ No database queries</p>
            </div>
        </div>
    );
}
