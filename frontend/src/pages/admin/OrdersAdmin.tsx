import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import { api } from "../../services/api";

interface OrderItem {
  id: number;
  productName: string;
  price: string;
  quantity: number;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

const statuses = [
  "MENUNGGU",
  "DIPROSES",
  "DIKIRIM",
  "SELESAI",
  "DIBATALKAN"
];

export default function OrdersAdmin() {

  const [orders, setOrders] =
    useState<Order[]>([]);
  
  const [loading, setLoading] =
    useState(true);
  
  const [search, setSearch] =
    useState("");
  
  const [statusFilter, setStatusFilter] =
    useState("SEMUA");

  async function loadOrders() {

    try {

      const response =
        await api.get("/orders/admin/all");

      setOrders(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Gagal mengambil daftar pesanan"
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(
    orderNumber: string,
    status: string
  ) {

    try {

      await api.put(
        `/orders/admin/${orderNumber}/status`,
        {
          status
        }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.orderNumber === orderNumber
            ? {
                ...order,
                status
              }
            : order
        )
      );

    } catch (error: any) {
      console.error(error);
    
      alert(
        error.response?.data?.message ||
        "Gagal mengubah status"
      );
    }

  }

  const filteredOrders =
  orders.filter((order) => {

    const searchText =
      search.toLowerCase();

    const matchesSearch =
      order.orderNumber
        .toLowerCase()
        .includes(searchText) ||
      order.customerName
        .toLowerCase()
        .includes(searchText);

    const matchesStatus =
      statusFilter === "SEMUA" ||
      order.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );
  });

  if (loading) {

    return (
      <AdminLayout>
  
        <div className="p-8">
          Memuat pesanan...
        </div>
  
      </AdminLayout>
    );
  
  }

  return (

    <AdminLayout>
        <div className="p-8">

        <div className="flex justify-between items-center mb-8">

            <div>

            <h1 className="text-3xl font-bold">
                Pesanan
            </h1>

            <p className="text-gray-500 mt-1">
                Kelola pesanan pelanggan
            </p>

            </div>

            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg">

            Total Pesanan:{" "}
            <span className="font-bold">
                {orders.length}
            </span>

            </div>

        </div>

        <div className="bg-white border rounded-xl p-5 mb-6">

            <div className="flex flex-col md:flex-row gap-4">

                <input
                type="text"
                placeholder="Cari nomor pesanan atau nama pelanggan..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="flex-1 border rounded-lg px-4 py-2"
                />

                <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(e.target.value)
                }
                className="border rounded-lg px-4 py-2"
                >

                <option value="SEMUA">
                    Semua Status
                </option>

                {statuses.map((status) => (
                    <option
                    key={status}
                    value={status}
                    >
                    {status}
                    </option>
                ))}

                </select>

            </div>

        </div>


        {filteredOrders.length === 0 ? (

            <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
                {orders.length === 0
                    ? "Belum ada pesanan."
                    : "Tidak ada pesanan yang sesuai dengan pencarian atau filter."
                }
            </div>

        ) : (   

            <div className="space-y-5">

            {filteredOrders.map((order) => (

                <div
                key={order.id}
                className="bg-white border rounded-xl p-6"
                >

                {/* Header Order */}

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                    <div>

                    <p className="text-sm text-gray-500">
                        Nomor Pesanan
                    </p>

                    <h2 className="text-xl font-bold text-amber-700">
                        {order.orderNumber}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {new Date(
                        order.createdAt
                        ).toLocaleString("id-ID")}
                    </p>

                    </div>


                    <div>

                    <label className="block text-sm text-gray-500 mb-1">
                        Status
                    </label>

                    <select
                        value={order.status}
                        onChange={(e) =>
                        updateStatus(
                            order.orderNumber,
                            e.target.value
                        )
                        }
                        className="border rounded-lg px-4 py-2"
                    >

                        {statuses.map(
                        (status) => (
                            <option
                            key={status}
                            value={status}
                            >
                            {status}
                            </option>
                        )
                        )}

                    </select>

                    </div>

                </div>


                {/* Customer */}

                <div className="border-t mt-5 pt-5">

                    <h3 className="font-semibold mb-3">
                    Data Pelanggan
                    </h3>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">

                    <p>
                        <span className="font-medium">
                        Nama:
                        </span>{" "}
                        {order.customerName}
                    </p>

                    <p>
                        <span className="font-medium">
                        WhatsApp:
                        </span>{" "}
                        {order.customerPhone}
                    </p>

                    <p className="md:col-span-2">
                        <span className="font-medium">
                        Alamat:
                        </span>{" "}
                        {order.customerAddress}
                    </p>

                    </div>

                </div>


                {/* Items */}

                <div className="border-t mt-5 pt-5">

                    <h3 className="font-semibold mb-3">
                    Produk
                    </h3>

                    <div className="space-y-3">

                    {order.items.map(
                        (item) => (

                        <div
                            key={item.id}
                            className="flex justify-between gap-4 text-sm"
                        >

                            <div>

                            <p className="font-medium">
                                {item.productName}
                            </p>

                            <p className="text-gray-500">
                                {item.quantity} × Rp{" "}
                                {Number(
                                item.price
                                ).toLocaleString(
                                "id-ID"
                                )}
                            </p>

                            </div>

                            <p className="font-semibold">
                            Rp{" "}
                            {(
                                Number(
                                item.price
                                ) *
                                item.quantity
                            ).toLocaleString(
                                "id-ID"
                            )}
                            </p>

                        </div>

                        )
                    )}

                    </div>

                </div>


                {/* Total */}

                <div className="border-t mt-5 pt-5 flex justify-between">

                    <span className="font-semibold">
                    Total Pesanan
                    </span>

                    <span className="text-xl font-bold text-amber-700">
                    Rp{" "}
                    {Number(
                        order.total
                    ).toLocaleString(
                        "id-ID"
                    )}
                    </span>

                </div>

                </div>

            ))}

            </div>

        )}

        </div>
    </AdminLayout>

  );

}