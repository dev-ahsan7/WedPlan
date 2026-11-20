import type { Metadata } from 'next';
import { Receipt } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { getAdminTransactions } from '@/lib/dashboard';
import { formatDate } from '@/lib/formatDate';

export const metadata: Metadata = {
  title: 'Transactions',
};

const statusStyles: Record<string, string> = {
  paid: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-amber-100 text-amber-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-muted text-muted-foreground',
};

// Read only: payments come from verified Stripe webhooks, never from this page
export default async function TransactionsPage() {
  const transactions = await getAdminTransactions();

  return (
    <>
      <PageHeader
        title="Transactions"
        text="Premium subscription payments from vendors. These records come from Stripe and can't be edited."
      />

      {transactions.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-primary">
            <Receipt className="size-6" aria-hidden />
          </span>
          <h2 className="mt-5 text-3xl">No transactions yet</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            When a vendor upgrades to Premium, the payment shows up here.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-3xl border bg-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b text-xs tracking-wider text-muted-foreground uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">Vendor</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="px-5 py-4">
                    <p className="font-medium">
                      {transaction.vendor?.businessName || transaction.vendor?.name || 'Deleted vendor'}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.vendor?.email}</p>
                  </td>
                  <td className="px-5 py-4 capitalize">{transaction.plan}</td>
                  <td className="px-5 py-4">
                    {transaction.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: transaction.currency.toUpperCase(),
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs capitalize ${
                        statusStyles[transaction.status] ?? 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{formatDate(transaction.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
