import { Outlet } from "react-router";

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden" style={{ minHeight: '800px', maxHeight: '90vh' }}>
        <Outlet />
      </div>
    </div>
  );
}
