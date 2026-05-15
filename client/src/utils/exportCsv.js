export function exportLeadsToCsv(leads) {
  const headers = ['Name', 'Email', 'Phone', 'Company', 'Message', 'Contacted', 'Date'];
  const rows = leads.map((l) => [
    l.name,
    l.email,
    l.phone || '',
    l.company || '',
    (l.message || '').replace(/"/g, '""'),
    l.contacted ? 'Yes' : 'No',
    new Date(l.createdAt).toLocaleString(),
  ]);

  const csv = [
    headers.join(','),
    ...rows.map((r) => r.map((c) => `"${c}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
