export default function Notes({ notes, setNotes, hasSelection }: any) {
  return (
    <div className="mt-5">
      <p className="text-sm font-semibold mb-2 text-gray-700">Notes</p>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={
          hasSelection
            ? "Write notes for selected range..."
            : "Select dates to add notes..."
        }
        className="w-full border border-gray-300 p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}