import PercentageDifference from "../../components/Admin/OrderWidget";
import Widget from "../../components/Admin/Widgets";
import OrdersMonthbyChart from "../../components/Admin/OrdersChart";
import { NewUsersWidget } from "../../components/Admin/NewUserWidgets";
import RecentOrders from "../../components/Admin/RecentOrders";
import AdminHeader from "../../components/Admin/AdminHeader";

function Dashboard() {
  return (
    <div className="w-full lg:w-[78%] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent overflow-y-scroll flex flex-col h-screen bg-gray-50 lg:px-6">
      <AdminHeader />
      
      <div className="flex flex-col p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Overview of your store performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <PercentageDifference />
          <Widget mode="orders" />
          <Widget mode="users" />
          <Widget mode="products" />
        </div>

        {/* Charts Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          <OrdersMonthbyChart />
          <NewUsersWidget />
        </div>

        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </div>
  );
}

export default Dashboard;