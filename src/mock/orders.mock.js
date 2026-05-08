export const mockOrders = [
  { 
    id: 'ORD-8935', 
    date: '2026-05-06T10:30:00Z', 
    customerSupplier: 'Emily Davis', 
    type: 'Outgoing', 
    amount: 3600, 
    status: 'Pending',
    items: [
      { productId: 'PRD-104', name: 'Sony WH-1000XM5', quantity: 10, unitPrice: 348, total: 3480 },
      { productId: 'PRD-102', name: 'Logitech MX Master 3', quantity: 1, unitPrice: 99, total: 99 }
    ],
    notes: 'Urgent delivery required.'
  },
  { 
    id: 'ORD-8934', 
    date: '2026-05-05T14:15:00Z', 
    customerSupplier: 'Apple Direct', 
    type: 'Incoming', 
    amount: 8500, 
    status: 'Processing',
    items: [
      { productId: 'PRD-101', name: 'MacBook Pro M2 14"', quantity: 5, unitPrice: 1700, total: 8500 }
    ],
    notes: 'Warehouse restock.'
  },
  { 
    id: 'ORD-8933', 
    date: '2026-05-04T09:00:00Z', 
    customerSupplier: 'Tech Distributors Inc.', 
    type: 'Incoming', 
    amount: 1500, 
    status: 'Completed',
    items: [
      { productId: 'PRD-102', name: 'Logitech MX Master 3', quantity: 25, unitPrice: 60, total: 1500 }
    ],
    notes: 'Received in full.'
  },
  { 
    id: 'ORD-8932', 
    date: '2026-05-03T16:45:00Z', 
    customerSupplier: 'Alice Smith', 
    type: 'Outgoing', 
    amount: 1299, 
    status: 'Cancelled',
    items: [
      { productId: 'PRD-103', name: 'Herman Miller Chair', quantity: 1, unitPrice: 1299, total: 1299 }
    ],
    notes: 'Customer cancelled due to out of stock.'
  },
  { 
    id: 'ORD-8931', 
    date: '2026-05-01T11:20:00Z', 
    customerSupplier: 'Robert Johnson', 
    type: 'Outgoing', 
    amount: 650, 
    status: 'Completed',
    items: [
      { productId: 'PRD-105', name: 'Dell UltraSharp 27"', quantity: 1, unitPrice: 650, total: 650 }
    ],
    notes: ''
  }
];
