import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { transactions } from "@/services/mockData";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SortableTransactionTable() {
    const [sortConfig, setSortConfig] = useState<{
        key: keyof typeof transactions[0] | null;
        direction: 'asc' | 'desc';
    }>({ key: null, direction: 'asc' });

    const sortedTransactions = [...transactions].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const requestSort = (key: keyof typeof transactions[0]) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            <Button variant="ghost" onClick={() => requestSort('id')}>
                                ID <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => requestSort('customerName')}>
                                Customer <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => requestSort('amount')}>
                                Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">
                            <Button variant="ghost" onClick={() => requestSort('date')}>
                                Date <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{transaction.customerName}</TableCell>
                            <TableCell>{transaction.product}</TableCell>
                            <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        transaction.status === "Completed"
                                            ? "default"
                                            : transaction.status === "Pending"
                                                ? "secondary"
                                                : "destructive"
                                    }
                                >
                                    {transaction.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">{transaction.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
