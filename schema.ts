import { trpc } from "@/lib/trpc";
import ZeusTable, { ColumnDef } from "@/components/ZeusTable";
import { useState, useMemo } from "react";

const COLUMNS: ColumnDef[] = [
  { key: "produs", label: "Produs", width: 180 },
  { key: "deComandat", label: "De Comandat", width: 120 },
  { key: "disponibilVanzare", label: "Disponibil Vanzare", width: 130 },
  { key: "vanzator", label: "Vanzator", width: 120 },
  { key: "status", label: "Status", width: 100 },
  { key: "cumparator", label: "Cumparator", width: 150 },
  { key: "raspunsuriVanzatori", label: "Raspunsuri Vanzatori", width: 180 },
  { key: "comenziDeLucru", label: "Comenzi de Lucru", width: 200 },
  { key: "valoareContract", label: "Valoare Contract", width: 130 },
  { key: "plata", label: "Plata", width: 120 },
  { key: "rata2", label: "Rata 2", width: 120 },
  { key: "rata3", label: "Rata 3", width: 120 },
  { key: "bonus", label: "Bonus", width: 100 },
  { key: "serviciiSuplimentare", label: "Servicii Suplimentare", width: 160 },
  { key: "rata2LivrareStructura", label: "Rata 2 Livrare Structura", width: 170 },
  { key: "dataApproxLivrare", label: "Data Approx Livrare", width: 150 },
  { key: "rataFinalaPif", label: "Rata Finala PIF", width: 130 },
  { key: "judet", label: "Judet", width: 100 },
  { key: "localitate", label: "Localitate", width: 120 },
  { key: "detalii", label: "Detalii", width: 200 },
  { key: "indexNr", label: "Index Nr", width: 80 },
  { key: "comentariiOperational", label: "Comentarii Operational", width: 200 },
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

export default function StocRealPage() {
  const [filter, setFilter] = useState("");
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.stocReal.list.useQuery(
    filter ? { filter } : undefined
  );

  const updateMutation = trpc.stocReal.update.useMutation({
    onSuccess: () => utils.stocReal.list.invalidate(),
  });

  const createMutation = trpc.stocReal.create.useMutation({
    onSuccess: () => utils.stocReal.list.invalidate(),
  });

  const deleteMutation = trpc.stocReal.delete.useMutation({
    onSuccess: () => utils.stocReal.list.invalidate(),
  });

  return (
    <ZeusTable
      title="STOC REAL"
      titleColor="#005C4B"
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
