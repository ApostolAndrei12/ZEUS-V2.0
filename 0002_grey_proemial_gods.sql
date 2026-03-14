import { trpc } from "@/lib/trpc";
import ZeusTable, { ColumnDef } from "@/components/ZeusTable";

const COLUMNS: ColumnDef[] = [
  { key: "cazNumarul", label: "Caz Numarul", width: 100 },
  { key: "client", label: "Client", width: 150 },
  { key: "comandaDeLucru", label: "Comanda de Lucru", width: 180 },
  { key: "raspunsuriComenzi", label: "Raspunsuri Comenzi", width: 180 },
  { key: "produs", label: "Produs", width: 180 },
  { key: "serie", label: "Serie", width: 120 },
  { key: "problema", label: "Problema", width: 250 },
  { key: "dataSesizare", label: "Data Sesizare", width: 120 },
  { key: "dataReceptie", label: "Data Receptie", width: 120 },
  { key: "solutionare", label: "Solutionare", width: 250 },
  { key: "motivGarantie", label: "Motiv Garantie", width: 180 },
  { key: "dataIesire", label: "Data Iesire", width: 120 },
  { key: "finalizat", label: "Finalizat", width: 100 },
];

export default function ServicePage() {
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.service.list.useQuery();

  const updateMutation = trpc.service.update.useMutation({
    onSuccess: () => utils.service.list.invalidate(),
  });

  const createMutation = trpc.service.create.useMutation({
    onSuccess: () => utils.service.list.invalidate(),
  });

  const deleteMutation = trpc.service.delete.useMutation({
    onSuccess: () => utils.service.list.invalidate(),
  });

  return (
    <ZeusTable
      title="SERVICE"
      titleColor="#00796B"
      columns={COLUMNS}
      data={data || []}
      isLoading={isLoading}
      onUpdate={(id, d) => updateMutation.mutate({ id, data: d })}
      onCreate={(d) => createMutation.mutate({ data: d })}
      onDelete={(id) => deleteMutation.mutate({ id })}
    />
  );
}
