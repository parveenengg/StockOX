export const mockCustomers = [
  { 
    id: 'CUST-101', 
    name: 'Alice Smith', 
    email: 'alice.smith@example.com', 
    phone: '+1 555-0101', 
    totalOrders: 14, 
    lifetimeValue: 12450, 
    lastActive: '2 days ago', 
    status: 'Active',
    address: '123 Main St, New York, NY 10001',
    company: 'Tech Innovators Inc',
    notes: 'Key client, prefers email communication.',
    purchaseHistory: [
      { id: 'ORD-8935', date: '2026-05-04', amount: 1250, items: 15, status: 'Completed' },
      { id: 'ORD-8712', date: '2026-04-12', amount: 3400, items: 40, status: 'Completed' },
    ]
  },
  { 
    id: 'CUST-102', 
    name: 'Robert Johnson', 
    email: 'robert.j@example.com', 
    phone: '+1 555-0102', 
    totalOrders: 3, 
    lifetimeValue: 850, 
    lastActive: '1 week ago', 
    status: 'Active',
    address: '456 Elm St, Chicago, IL 60601',
    company: 'Johnson Retail',
    notes: 'Small retailer.',
    purchaseHistory: [
      { id: 'ORD-8601', date: '2026-03-21', amount: 850, items: 10, status: 'Completed' }
    ]
  },
  { 
    id: 'CUST-103', 
    name: 'Emily Davis', 
    email: 'emily.davis@example.com', 
    phone: '+1 555-0103', 
    totalOrders: 28, 
    lifetimeValue: 45200, 
    lastActive: 'Just now', 
    status: 'VIP',
    address: '789 Oak Ave, San Francisco, CA 94107',
    company: 'Enterprise Solutions',
    notes: 'Premium enterprise account. Provide immediate support.',
    purchaseHistory: [
      { id: 'ORD-8936', date: '2026-05-06', amount: 3600, items: 120, status: 'Processing' },
      { id: 'ORD-8850', date: '2026-04-28', amount: 8400, items: 300, status: 'Completed' },
      { id: 'ORD-8700', date: '2026-04-05', amount: 12000, items: 450, status: 'Completed' }
    ]
  },
  { 
    id: 'CUST-104', 
    name: 'Michael Brown', 
    email: 'mbrown@example.com', 
    phone: '+1 555-0104', 
    totalOrders: 1, 
    lifetimeValue: 120, 
    lastActive: '2 months ago', 
    status: 'Inactive',
    address: '101 Pine St, Austin, TX 73301',
    company: 'Individual',
    notes: 'One-time buyer.',
    purchaseHistory: [
      { id: 'ORD-7500', date: '2026-02-14', amount: 120, items: 2, status: 'Completed' }
    ]
  },
  { 
    id: 'CUST-105', 
    name: 'Sarah Wilson', 
    email: 'sarah.w@example.com', 
    phone: '+1 555-0105', 
    totalOrders: 8, 
    lifetimeValue: 3100, 
    lastActive: '3 days ago', 
    status: 'Active',
    address: '222 Maple Dr, Seattle, WA 98101',
    company: 'Wilson Tech',
    notes: '',
    purchaseHistory: [
      { id: 'ORD-8900', date: '2026-05-01', amount: 450, items: 5, status: 'Completed' },
      { id: 'ORD-8820', date: '2026-04-22', amount: 2650, items: 25, status: 'Completed' }
    ]
  },
];
