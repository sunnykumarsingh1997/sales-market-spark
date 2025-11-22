export interface MarketingSpend {
    period: string;
    channel: string;
    amount: number;
}

export interface Customer {
    id: string;
    name: string;
    joinDate: string;
    status: 'Active' | 'Churned';
}

export interface Transaction {
    id: string;
    customerId: string;
    customerName: string; // Keep for display convenience
    product: string;
    amount: number;
    status: 'Completed' | 'Pending' | 'Failed';
    date: string;
}

export const revenueData = [
    { month: "Jan", actual: 120000, target: 130000 },
    { month: "Feb", actual: 135000, target: 135000 },
    { month: "Mar", actual: 148000, target: 140000 },
    { month: "Apr", actual: 125000, target: 145000 },
    { month: "May", actual: 160000, target: 150000 },
    { month: "Jun", actual: 140000, target: 140000 },
];

export const productData = [
    { name: "Cloud Services", revenue: 140000 },
    { name: "Analytics Platform", revenue: 105000 },
    { name: "Mobile App", revenue: 70000 },
    { name: "Consulting", revenue: 35000 },
    { name: "Enterprise Software", revenue: 25000 },
];

export const regionData = [
    { name: "Pacific", value: 24, color: "hsl(var(--chart-1))" },
    { name: "Europe", value: 14, color: "hsl(var(--chart-2))" },
    { name: "Americas", value: 32, color: "hsl(var(--chart-3))" },
    { name: "Asia", value: 18, color: "hsl(var(--chart-4))" },
    { name: "Africa", value: 12, color: "hsl(var(--chart-5))" },
];

export const marketingSpend: MarketingSpend[] = [
    { period: "2025-09", channel: "Google Ads", amount: 5000 },
    { period: "2025-09", channel: "LinkedIn", amount: 3000 },
    { period: "2025-09", channel: "Events", amount: 2000 },
    { period: "2025-10", channel: "Google Ads", amount: 5500 },
    { period: "2025-10", channel: "LinkedIn", amount: 3200 },
    { period: "2025-10", channel: "Events", amount: 1000 },
];

export const customers: Customer[] = [
    { id: "CUST-001", name: "Innovation Labs", joinDate: "2025-01-15", status: "Active" },
    { id: "CUST-002", name: "TechStart Inc", joinDate: "2025-02-20", status: "Active" },
    { id: "CUST-003", name: "Global Corp", joinDate: "2025-03-10", status: "Active" },
    { id: "CUST-004", name: "Digital Agency", joinDate: "2025-08-05", status: "Active" },
    { id: "CUST-005", name: "StartUp Hub", joinDate: "2025-09-12", status: "Churned" },
    // ... implied more customers for realistic CAC
];

export const transactions: Transaction[] = [
    { id: "TXN-0549", customerId: "CUST-001", customerName: "Innovation Labs", product: "Premium", amount: 4433, status: "Completed", date: "2025-10-01" },
    { id: "TXN-2081", customerId: "CUST-002", customerName: "TechStart Inc", product: "Pro Plan", amount: 2031, status: "Pending", date: "2025-09-30" },
    { id: "TXN-1847", customerId: "CUST-003", customerName: "Global Corp", product: "Enterprise", amount: 8750, status: "Completed", date: "2025-09-29" },
    { id: "TXN-3392", customerId: "CUST-004", customerName: "Digital Agency", product: "Standard", amount: 1250, status: "Completed", date: "2025-09-28" },
    { id: "TXN-4156", customerId: "CUST-005", customerName: "StartUp Hub", product: "Basic", amount: 599, status: "Failed", date: "2025-09-27" },
];

// Metrics Calculations

export const calculateCAC = (): number => {
    // Simplified: Total Spend (Oct) / New Customers (Oct - assumed 50 for demo)
    const totalSpend = marketingSpend
        .filter(s => s.period === "2025-10")
        .reduce((acc, curr) => acc + curr.amount, 0);

    const newCustomers = 50; // Mocked count
    return totalSpend / newCustomers;
};

export const calculateCLV = (): number => {
    // Simplified: Average Transaction Value * Average Frequency * Lifespan
    // For demo: Average of all completed transactions * 12 months * 3 years
    const completedTxns = transactions.filter(t => t.status === "Completed");
    const avgValue = completedTxns.reduce((acc, curr) => acc + curr.amount, 0) / completedTxns.length;

    // Mocking frequency and lifespan
    const purchaseFreqPerYear = 12;
    const lifespanYears = 3;

    return avgValue * purchaseFreqPerYear * lifespanYears;
};

