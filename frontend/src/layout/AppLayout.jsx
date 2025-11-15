import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
            <AppSidebar />

            <div className="flex flex-col flex-1 lg:pl-[280px]">
                <AppHeader />
                <main className="flex-1 pt-4">
                    <div className="bg-white w-full h-full dark:bg-gray-800 rounded-md shadow-md p-4 lg:p-6 min-h-[calc(100vh-150px)]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
