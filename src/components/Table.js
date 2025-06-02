import "./Table.css";

export default function Table({ columns, data }) {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          {columns.map((col, idx) => <th key={idx}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {row.map((cell, i) => <td key={i}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
