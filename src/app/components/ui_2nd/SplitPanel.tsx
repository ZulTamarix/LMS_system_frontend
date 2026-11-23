interface SplitPanelProps {
    content_1: React.ReactNode;
    content_2: React.ReactNode;
}

export default function SplitPanel({ content_1, content_2 }: SplitPanelProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

            {/* Content 1 */}
            <div className="p-4">
                {content_1}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Content 2 */}
            <div className="p-4">
                {content_2}
            </div>

        </div>
    );
}