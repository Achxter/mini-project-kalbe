import React from "react";

export default function Dashboard() {
	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-4">Dashboard</h1>
			<div className="grid">
				<div className="bg-white p-4 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-2 text-gray-700">Inventory Overview</h2>
					<p className="text-gray-700">View and manage your inventory levels, track stock, and ensure you never run out of essential items.</p>
				</div>
			</div>
		</div>
	);
}