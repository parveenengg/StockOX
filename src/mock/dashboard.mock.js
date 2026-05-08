export const mockChartData = {
  'Last 7 Days': [
    { name: 'Mon', revenue: 4000, profit: 2400 },
    { name: 'Tue', revenue: 3000, profit: 1398 },
    { name: 'Wed', revenue: 2000, profit: 9800 },
    { name: 'Thu', revenue: 2780, profit: 3908 },
    { name: 'Fri', revenue: 1890, profit: 4800 },
    { name: 'Sat', revenue: 2390, profit: 3800 },
    { name: 'Sun', revenue: 3490, profit: 4300 },
  ],
  'Last Month': [
    { name: 'Week 1', revenue: 14000, profit: 8400 },
    { name: 'Week 2', revenue: 12000, profit: 7000 },
    { name: 'Week 3', revenue: 18000, profit: 9800 },
    { name: 'Week 4', revenue: 22000, profit: 11000 },
  ],
  'Last 6 Months': [
    { name: 'Jan', revenue: 45000, profit: 22000 },
    { name: 'Feb', revenue: 42000, profit: 21000 },
    { name: 'Mar', revenue: 58000, profit: 29000 },
    { name: 'Apr', revenue: 49000, profit: 24000 },
    { name: 'May', revenue: 61000, profit: 31000 },
    { name: 'Jun', revenue: 75000, profit: 38000 },
  ],
  'Last Year': [
    { name: 'Q1', revenue: 145000, profit: 72000 },
    { name: 'Q2', revenue: 162000, profit: 81000 },
    { name: 'Q3', revenue: 158000, profit: 79000 },
    { name: 'Q4', revenue: 198000, profit: 99000 },
  ],
  'All Time': [
    { name: '2023', revenue: 450000, profit: 220000 },
    { name: '2024', revenue: 663000, profit: 331000 },
  ]
};

export const emptyChartData = [
  { name: 'Mon', revenue: 0, profit: 0 },
  { name: 'Tue', revenue: 0, profit: 0 },
  { name: 'Wed', revenue: 0, profit: 0 },
  { name: 'Thu', revenue: 0, profit: 0 },
  { name: 'Fri', revenue: 0, profit: 0 },
  { name: 'Sat', revenue: 0, profit: 0 },
  { name: 'Sun', revenue: 0, profit: 0 },
];

// Provide some activity details for the modal
export const mockRecentActivity = [
  { 
    id: 1, 
    type: 'Incoming',
    title: 'New order #ORD-8935', 
    timestamp: '2 minutes ago',
    details: {
      product: 'Wireless Headphones',
      quantity: 15,
      user: 'Alice Smith',
      totalValue: 1250,
      warehouse: 'Main Warehouse'
    }
  },
  { 
    id: 2, 
    type: 'Outgoing',
    title: 'Stock transfer to Downtown Hub', 
    timestamp: '15 minutes ago',
    details: {
      product: 'Gaming Mice',
      quantity: 50,
      user: 'Admin',
      totalValue: 2500,
      warehouse: 'Main Warehouse'
    }
  },
  { 
    id: 3, 
    type: 'Update',
    title: 'Product status updated', 
    timestamp: '1 hour ago',
    details: {
      product: 'Mechanical Keyboard',
      quantity: 0,
      user: 'Robert Johnson',
      totalValue: 0,
      warehouse: 'Downtown Hub',
      notes: 'Marked as Out of Stock'
    }
  },
  { 
    id: 4, 
    type: 'Incoming',
    title: 'New order #ORD-8936', 
    timestamp: '3 hours ago',
    details: {
      product: 'USB-C Hubs',
      quantity: 120,
      user: 'Emily Davis',
      totalValue: 3600,
      warehouse: 'Downtown Hub'
    }
  },
  { 
    id: 5, 
    type: 'Supplier',
    title: 'Received stock from Acme Corp', 
    timestamp: '5 hours ago',
    details: {
      product: 'Monitors',
      quantity: 30,
      user: 'Admin',
      totalValue: 9000,
      warehouse: 'Main Warehouse'
    }
  }
];

export const mockWarehouses = [
  { id: 1, name: 'Main Warehouse', location: 'New York' },
  { id: 2, name: 'Downtown Hub', location: 'Chicago' }
];
