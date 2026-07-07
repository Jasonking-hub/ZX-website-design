import type { ProductSpecRow } from "@/data/products";

type SpecTableProps = {
  rows: ProductSpecRow[];
};

const headers = ["型号", "连续推力", "峰值推力", "电机常数", "电阻", "电感", "质量", "尺寸", "推荐应用"];

export function SpecTable({ rows }: SpecTableProps) {
  return (
    <div className="table-scroll rounded-[28px] border border-navy/10 bg-white shadow-sm">
      <table className="min-w-[980px] w-full border-collapse text-left text-sm">
        <thead className="bg-blueprint text-navy">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-navy/10 px-4 py-4 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.model} className="align-top">
              <td className="border-b border-navy/8 px-4 py-4 font-semibold text-navy">{row.model}</td>
              <td className="border-b border-navy/8 px-4 py-4 text-ink/76">{row.continuousForce}</td>
              <td className="border-b border-navy/8 px-4 py-4 text-ink/76">{row.peakForce}</td>
              <td className="border-b border-navy/8 px-4 py-4 text-ink/76">{row.motorConstant}</td>
              <td className="border-b border-navy/8 px-4 py-4 text-ink/76">{row.resistance}</td>
              <td className="border-b border-navy/8 px-4 py-4 text-ink/76">{row.inductance}</td>
              <td className="border-b border-navy/8 px-4 py-4 text-ink/76">{row.mass}</td>
              <td className="border-b border-navy/8 px-4 py-4 text-ink/76">{row.size}</td>
              <td className="border-b border-navy/8 px-4 py-4 text-ink/76">{row.recommendedUse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
