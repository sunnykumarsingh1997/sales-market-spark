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
    region: 'Pacific' | 'Europe' | 'Americas' | 'Asia' | 'Africa';
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

export interface Lead {
    id: string;
    source: string;
    date: string;
    status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';
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
    { id: "CUST-001", name: "Innovation Labs", joinDate: "2025-01-15", status: "Active", region: "Americas" },
    { id: "CUST-002", name: "TechStart Inc", joinDate: "2025-02-20", status: "Active", region: "Europe" },
    { id: "CUST-003", name: "Global Corp", joinDate: "2025-03-10", status: "Active", region: "Asia" },
    { id: "CUST-004", name: "Digital Agency", joinDate: "2025-08-05", status: "Active", region: "Pacific" },
    { id: "CUST-005", name: "StartUp Hub", joinDate: "2025-09-12", status: "Churned", region: "Americas" },
    { id: "CUST-006", name: "Alpha Omega", joinDate: "2025-09-15", status: "Active", region: "Europe" },
    { id: "CUST-007", name: "Beta Inc", joinDate: "2025-09-20", status: "Active", region: "Asia" },
];

export const transactions: Transaction[] = [
    { id: "TXN-0549", customerId: "CUST-001", customerName: "Innovation Labs", product: "Premium", amount: 4433, status: "Completed", date: "2025-10-01" },
    { id: "TXN-2081", customerId: "CUST-002", customerName: "TechStart Inc", product: "Pro Plan", amount: 2031, status: "Pending", date: "2025-09-30" },
    { id: "TXN-1847", customerId: "CUST-003", customerName: "Global Corp", product: "Enterprise", amount: 8750, status: "Completed", date: "2025-09-29" },
    { id: "TXN-3392", customerId: "CUST-004", customerName: "Digital Agency", product: "Standard", amount: 1250, status: "Completed", date: "2025-09-28" },
    { id: "TXN-4156", customerId: "CUST-005", customerName: "StartUp Hub", product: "Basic", amount: 599, status: "Failed", date: "2025-09-27" },
    { id: "TXN-5001", customerId: "CUST-006", customerName: "Alpha Omega", product: "Premium", amount: 5000, status: "Completed", date: "2025-09-26" },
    { id: "TXN-5002", customerId: "CUST-007", customerName: "Beta Inc", product: "Standard", amount: 1500, status: "Completed", date: "2025-09-25" },
];

export const leads: Lead[] = [
    { id: "LEAD-001", source: "Website", date: "2025-10-01", status: "New" },
    { id: "LEAD-002", source: "LinkedIn", date: "2025-10-02", status: "Converted" },
    { id: "LEAD-003", source: "Referral", date: "2025-10-03", status: "Qualified" },
    { id: "LEAD-004", source: "Website", date: "2025-10-04", status: "Lost" },
    { id: "LEAD-005", source: "Webinar", date: "2025-10-05", status: "Converted" },
    // ... assume more leads
];

// Metrics Calculations

export const calculateCAC = (): number => {
    const totalSpend = marketingSpend
        .filter(s => s.period === "2025-10")
        .reduce((acc, curr) => acc + curr.amount, 0);

    // Mocked count of new customers in Oct
    const newCustomers = 50;
    return totalSpend / newCustomers;
};

export const calculateCLV = (): number => {
    const completedTxns = transactions.filter(t => t.status === "Completed");
    const avgValue = completedTxns.reduce((acc, curr) => acc + curr.amount, 0) / completedTxns.length;

    const purchaseFreqPerYear = 12;
    const lifespanYears = 3;

    return avgValue * purchaseFreqPerYear * lifespanYears;
};

export const calculateLeadConversionRate = (): number => {
    // Leads vs Converted Leads (or Closed Deals)
    // For simplicity, let's use the 'leads' array status
    const totalLeads = leads.length + 45; // Mocking a larger pool
    const convertedLeads = leads.filter(l => l.status === "Converted").length + 10; // Mocking

    return (convertedLeads / totalLeads) * 100;
};

export const calculateAvgDealSizePerRegion = (): Record<string, number> => {
    const regionTotals: Record<string, { total: number; count: number }> = {};

    transactions.forEach(txn => {
        if (txn.status !== "Completed") return;
        const customer = customers.find(c => c.id === txn.customerId);
        if (customer) {
            if (!regionTotals[customer.region]) {
                regionTotals[customer.region] = { total: 0, count: 0 };
            }
            regionTotals[customer.region].total += txn.amount;
            regionTotals[customer.region].count += 1;
        }
    });

    const avgPerRegion: Record<string, number> = {};
    Object.keys(regionTotals).forEach(region => {
        avgPerRegion[region] = regionTotals[region].total / regionTotals[region].count;
    });

    return avgPerRegion;
};

export const calculateChurnRate = (): number => {
    const totalCustomers = customers.length;
    const churnedCustomers = customers.filter(c => c.status === "Churned").length;

    if (totalCustomers === 0) return 0;
    return (churnedCustomers / totalCustomers) * 100;
};

export const calculateMoMGrowth = (): number => {
    // Compare last month (Jun) to previous month (May) from revenueData
    // Assuming revenueData is sorted chronologically
    const currentMonth = revenueData[revenueData.length - 1].actual;
    const previousMonth = revenueData[revenueData.length - 2].actual;

    if (previousMonth === 0) return 100;
    return ((currentMonth - previousMonth) / previousMonth) * 100;
};

export const calculateOpenPipeline = (): number => {
    return transactions
        .filter(t => t.status === "Pending")
        .reduce((acc, curr) => acc + curr.amount, 0);
};

export const getAdvancedMetrics = () => {
    return {
        leadConversionRate: calculateLeadConversionRate(),
        avgDealSizePerRegion: calculateAvgDealSizePerRegion(),
        churnRate: calculateChurnRate(),
        momGrowth: calculateMoMGrowth(),
        cac: calculateCAC(),
        clv: calculateCLV(),
        openPipeline: calculateOpenPipeline()
    };
};
