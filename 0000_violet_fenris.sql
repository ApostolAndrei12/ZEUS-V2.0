import { trpc } from "@/lib/trpc";
import ZeusTable, { ColumnDef } from "@/components/ZeusTable";

const COLUMNS: ColumnDef[] = [
  { key: "client", label: "Client", width: 180 },
  { key: "produs", label: "Produs", width: 200 },
  { key: "judet", label: "Judet", width: 120 },
  { key: "localitate", label: "Localitate", width: 150 },
  { key: "feedback", label: "Feedback", width: 250 },
];

export default function InchisePage() {
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.inchise.list.useQuery();

  const updateMutation = trpc.inchise.update.useMutation({
    onSuccess: () => utils.inchise.list.invalidate(),
  });

  const createMutation = trpc.inchise.create.useMutation({
    onSuccess: () => utils.inchise.list.invalidate(),
  });

  const deleteMutation = trpc.inchise.delete.useMutation({
    onSuccess: () => utils.inchise.list.invalidate(),
  });

  return (
    <ZeusTable
      title="INCHISE"
      titleColor="#00695C"
      columns={COLUMNS}
      data={data || []}
      isLoading={isLoading}
      onUpdate={(id, d) => updateMutation.mutate({ id, data: d })}
      onCreate={(d) => createMutation.mutate({ data: d })}
      onDelete={(id) => deleteMutation.mutate({ id })}
    />
  );
}
