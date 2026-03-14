import { trpc } from "@/lib/trpc";
import ZeusTable, { ColumnDef } from "@/components/ZeusTable";
import { useState } from "react";

const COLUMNS: ColumnDef[] = [
  { key: "produs", label: "Produs", width: 180 },
  { key: "dataControl", label: "Data Control", width: 120 },
  { key: "vanzator", label: "Vanzator", width: 120 },
  { key: "status", label: "Status", width: 100 },
  { key: "cumparator", label: "Cumparator", width: 150 },
  { key: "raspunsuri", label: "Raspunsuri", width: 180 },
  { key: "comenziDeLucru", label: "Comenzi de Lucru", width: 200 },
  { key: "valoare", label: "Valoare", width: 130 },
  { key: "plata", label: "Plata", width: 120 },
  { key: "rata2", label: "Rata 2", width: 120 },
  { key: "rata3", label: "Rata 3", width: 120 },
  { key: "rata4", label: "Rata 4", width: 120 },
  { key: "bonus", label: "Bonus", width: 100 },
  { key: "serviciiSuplimentare", label: "Servicii Suplimentare", width: 160 },
  { key: "livrareCfContract", label: "Livrare cf. Contract", width: 150 },
  { key: "dataMontaj", label: "Data Montaj", width: 130 },
  { key: "pifCfContract", label: "PIF cf. Contract", width: 130 },
  { key: "judet", label: "Judet", width: 100 },
  { key: "localitate", label: "Localitate", width: 120 },
  { key: "detalii", label: "Detalii", width: 200 },
  { key: "mentiuni", label: "Mentiuni", width: 200 },
];

const FILTER_OPTIONS = [
  { label: "Alex Florian", value: "Alex Florian" },
  { label: "Dan (DD)", value: "DD" },
  { label: "Dan Dinescu", value: "Dan Dinescu" },
  { label: "Mihai Popa", value: "Mihai Popa" },
  { label: "Vlad", value: "Vlad" },
  { label: "Andrei", value: "Andrei" },
  { label: "Madalina", value: "Madalina" },
  { label: "Alex-Oltenia", value: "Alex-Oltenia" },
  { label: "Raluca-Muntenia", value: "Raluca" },
  { label: "Ionel-Moldova Nord", value: "Ionel" },
  { label: "Silviu-SudEst", value: "Silviu" },
  { label: "Andreea-Moldova Sud", value: "Andreea" },
  { label: "Razvan-Crisana", value: "Razvan" },
  { label: "Liana-Ardeal", value: "Liana" },
];

export default function ServiciiPage() {
  const [filter, setFilter] = useState("");
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.servicii.list.useQuery(
    filter ? { filter } : undefined
  );

  const updateMutation = trpc.servicii.update.useMutation({
    onSuccess: () => utils.servicii.list.invalidate(),
  });

  const createMutation = trpc.servicii.create.useMutation({
    onSuccess: () => utils.servicii.list.invalidate(),
  });

  const deleteMutation = trpc.servicii.delete.useMutation({
    onSuccess: () => utils.servicii.list.invalidate(),
  });

  return (
    <ZeusTable
      title="SERVICII"
      titleColor="#008060"
      columns={COLUMNS}
      data={data || []}
      isLoading={isLoading}
      onUpdate={(id, d) => updateMutation.mutate({ id, data: d })}
      onCreate={(d) => createMutation.mutate({ data: d })}
      onDelete={(id) => deleteMutation.mutate({ id })}
      filterOptions={FILTER_OPTIONS}
      onFilter={setFilter}
      currentFilter={filter}
    />
  );
}
