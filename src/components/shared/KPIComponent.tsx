export function KpiCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
      <div>
        <h3 className="text-sm font-medium ">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      {icon}
    </div>
  );
}
