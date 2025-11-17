import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AppSidebar />

            <div className="flex flex-col flex-1 lg:pl-[280px] transition-all duration-300 overflow-x-hidden">
                <AppHeader />
                <main className="flex-1 pt-4">
                    <div className="bg-white rounded-md shadow-md p-4 lg:p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
