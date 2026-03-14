import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Trash2,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ColumnDef = {
  key: string;
  label: string;
  width?: number;
};

type ZeusTableProps = {
  title: string;
  titleColor?: string;
  columns: ColumnDef[];
  data: any[];
  isLoading: boolean;
  onUpdate: (id: number, data: Record<string, any>) => void;
  onCreate: (data: Record<string, any>) => void;
  onDelete: (id: number) => void;
  filterOptions?: { label: string; value: string }[];
  onFilter?: (value: string) => void;
  currentFilter?: string;
};

const ROWS_PER_PAGE = 50;

export default function ZeusTable({
  title,
  titleColor = "#005C4B",
  columns,
  data,
  isLoading,
  onUpdate,
  onCreate,
  onDelete,
  filterOptions,
  onFilter,
  currentFilter,
}: ZeusTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCell, setEditingCell] = useState<{
    rowId: number;
    colKey: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [page, setPage] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const filteredData = data.filter((row) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return columns.some((col) => {
      const val = row[col.key];
      return val && String(val).toLowerCase().includes(term);
    });
  });

  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const pagedData = filteredData.slice(
    page * ROWS_PER_PAGE,
    (page + 1) * ROWS_PER_PAGE
  );

  const handleCellClick = useCallback(
    (rowId: number, colKey: string, currentValue: string) => {
      setEditingCell({ rowId, colKey });
      setEditValue(currentValue || "");
    },
    []
  );

  const handleSave = useCallback(() => {
    if (editingCell) {
      onUpdate(editingCell.rowId, { [editingCell.colKey]: editValue });
      setEditingCell(null);
      toast.success("Celula actualizata");
    }
  }, [editingCell, editValue, onUpdate]);

  const handleCancel = useCallback(() => {
    setEditingCell(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleSave();
      if (e.key === "Escape") handleCancel();
    },
    [handleSave, handleCancel]
  );

  const handleAddRow = useCallback(() => {
    const emptyRow: Record<string, any> = {};
    columns.forEach((col) => {
      emptyRow[col.key] = "";
    });
    onCreate(emptyRow);
    toast.success("Rand nou adaugat");
  }, [columns, onCreate]);

  return (
    // Full-height flex column — fills the parent (which is already full-screen)
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-3 py-2 border-b bg-white shrink-0">
        <div className="flex items-center gap-3">
          <h1
            className="text-lg font-bold tracking-tight"
            style={{ color: titleColor, fontFamily: "'Montserrat', sans-serif" }}
          >
            {title}
          </h1>
          {/* Stats inline */}
          <span className="text-xs text-muted-foreground">
            Total: <strong className="text-foreground">{data.length}</strong>
          </span>
          {searchTerm && (
            <span className="text-xs text-muted-foreground">
              Filtrate:{" "}
              <strong className="text-foreground">{filteredData.length}</strong>
            </span>
          )}
          {currentFilter && (
            <span className="bg-[#E0F2F1] text-[#005C4B] px-2 py-0.5 rounded-full text-xs font-medium">
              {currentFilter}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {filterOptions && onFilter && (
            <Select
              value={currentFilter || "all"}
              onValueChange={(val) => onFilter(val === "all" ? "" : val)}
            >
              <SelectTrigger className="w-[160px] h-8 text-xs">
                <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="ZEUS Control" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toti angajatii</SelectItem>
                {filterOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Cauta..."
              className="pl-7 h-8 w-[180px] text-xs"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
            />
          </div>
          <Button
            size="sm"
            onClick={handleAddRow}
            className="h-8 text-xs bg-[#005C4B] hover:bg-[#004A3C]"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Rand Nou
          </Button>
        </div>
      </div>

      {/* ── Table area — scrollable both directions, fills remaining height ── */}
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005C4B]" />
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-auto">
          <table className="text-sm border-collapse" style={{ minWidth: "max-content", width: "100%" }}>
            <thead className="sticky top-0 z-20">
              <tr className="bg-[#005C4B] text-white">
                <th className="px-3 py-2 text-left font-semibold text-xs w-[46px] sticky left-0 bg-[#005C4B] z-30">
                  #
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-3 py-2 text-left font-semibold text-xs whitespace-nowrap"
                    style={{ minWidth: col.width || 140 }}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-3 py-2 text-center font-semibold text-xs w-[56px]">
                  Act.
                </th>
              </tr>
            </thead>
            <tbody>
              {pagedData.map((row, idx) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-[#F0F7F5] transition-colors"
                >
                  <td className="px-3 py-1 text-muted-foreground text-xs sticky left-0 bg-white z-10 border-r border-border/40">
                    {page * ROWS_PER_PAGE + idx + 1}
                  </td>
                  {columns.map((col) => {
                    const isEditing =
                      editingCell?.rowId === row.id &&
                      editingCell?.colKey === col.key;
                    return (
                      <td
                        key={col.key}
                        className="px-1 py-0.5"
                        style={{ minWidth: col.width || 140 }}
                      >
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <Input
                              ref={inputRef}
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={handleKeyDown}
                              className="h-7 text-xs"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-green-600"
                              onClick={handleSave}
                            >
                              <Save className="w-3 h-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-red-500"
                              onClick={handleCancel}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <div
                            className="px-2 py-1 rounded cursor-pointer hover:bg-[#E0F2F1] min-h-[26px] text-xs leading-relaxed break-words max-w-[300px]"
                            onClick={() =>
                              handleCellClick(row.id, col.key, row[col.key])
                            }
                            title={row[col.key] || ""}
                          >
                            {row[col.key] || (
                              <span className="text-muted-foreground/40">—</span>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-1 py-0.5 text-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-red-400 hover:text-red-600"
                      onClick={() => {
                        if (confirm("Sigur doriti sa stergeti acest rand?")) {
                          onDelete(row.id);
                          toast.success("Rand sters");
                        }
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </td>
                </tr>
              ))}
              {pagedData.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="text-center py-12 text-muted-foreground"
                  >
                    {searchTerm ? "Niciun rezultat gasit" : "Nicio inregistrare"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-3 py-1.5 border-t bg-white text-xs shrink-0">
          <span className="text-muted-foreground">
            Pagina {page + 1} din {totalPages}
          </span>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
