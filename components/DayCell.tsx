export default function DayCell({
  day,
  onClick,
  isStart,
  isEnd,
  inRange,
  isToday,
}: any) {
  if (!day) return <div />;

  return (
    <div
      onClick={() => onClick(day)}
      className={`
        p-2 rounded-lg text-center cursor-pointer transition-all duration-200
        hover:bg-blue-100

        ${isStart ? "bg-blue-500 text-white" : ""}
        ${isEnd ? "bg-blue-500 text-white" : ""}
        ${inRange ? "bg-blue-200 text-black" : "text-gray-800"}

        ${isToday ? "border-2 border-blue-500 font-bold" : ""}
      `}
    >
      {day.getDate()}

      {/* 🎯 Holiday marker (example: 1st of month) */}
      {day.getDate() === 1 && (
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mx-auto mt-1"></div>
      )}
    </div>
  );
}