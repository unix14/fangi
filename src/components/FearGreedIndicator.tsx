import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface FearGreedIndicatorProps {
  value: number;
  className?: string;
}

export const FearGreedIndicator = ({ value, className }: FearGreedIndicatorProps) => {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  const getStatusInfo = (value: number) => {
    if (value <= 20) return { label: "Extreme Fear", color: "text-financial-red" };
    if (value <= 40) return { label: "Fear", color: "text-orange-500" };
    if (value <= 60) return { label: "Neutral", color: "text-yellow-500" };
    if (value <= 80) return { label: "Greed", color: "text-lime-500" };
    return { label: "Extreme Greed", color: "text-financial-green" };
  };

  const status = getStatusInfo(normalizedValue);

  console.log('Rendering FearGreedIndicator with value:', normalizedValue);

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell className="text-2xl font-bold py-6">
              Fear & Greed Index
            </TableCell>
            <TableCell className="text-right">
              <span className={cn("text-4xl font-bold", status.color)}>
                {normalizedValue}
              </span>
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-transparent">
            <TableCell>Current Status</TableCell>
            <TableCell className="text-right">
              <span className={cn("font-semibold", status.color)}>
                {status.label}
              </span>
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-transparent">
            <TableCell className="text-sm text-muted-foreground" colSpan={2}>
              <div className="flex justify-between items-center mt-2">
                <span>Extreme Fear (0)</span>
                <span>Neutral (50)</span>
                <span>Extreme Greed (100)</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-financial-red via-yellow-500 to-financial-green"
                  style={{ width: `${normalizedValue}%` }}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};