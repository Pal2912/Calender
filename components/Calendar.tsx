"use client";

import { useState, useEffect } from "react";
import DayCell from "./DayCell";
import Notes from "./Notes";
import { getDaysInMonth, isSameDay } from "../utils/dateUtils";

export default function Calendar() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // ✅ NOTES PER RANGE (key = start-end)
  const [notesMap, setNotesMap] = useState<{ [key: string]: string }>({});

  const days = getDaysInMonth(currentMonth);

  const monthImages = [
    "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.webp",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    "https://media.istockphoto.com/id/1550071750/photo/green-tea-tree-leaves-camellia-sinensis-in-organic-farm-sunlight-fresh-young-tender-bud.jpg?s=612x612&w=0&k=20&c=RC_xD5DY5qPH_hpqeOY1g1pM6bJgGJSssWYjVIvvoLw=",
    "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
  ];

  const currentMonthIndex = currentMonth.getMonth();

  // ✅ LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("notesMap");
    if (saved) setNotesMap(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("notesMap", JSON.stringify(notesMap));
  }, [notesMap]);

  // ✅ RANGE KEY
  const getKey = () => {
    if (!startDate) return "default";
    return `${startDate?.toDateString()}-${endDate?.toDateString()}`;
  };

  const currentKey = getKey();

  const notes = notesMap[currentKey] || "";

  const setNotes = (value: string) => {
    setNotesMap((prev) => ({
      ...prev,
      [currentKey]: value,
    }));
  };

  // ✅ RANGE LOGIC
  const handleClick = (day: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (day >= startDate) {
      setEndDate(day);
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  const isInRange = (day: Date | null) => {
    if (!day || !startDate || !endDate) return false;
    return day > startDate && day < endDate;
  };

  // ✅ CLEAR SELECTION
  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl mx-auto mt-10 overflow-hidden transition-all duration-300">

      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* IMAGE */}
        <div className="relative h-60 md:h-full">
          <img
            src={monthImages[currentMonthIndex]}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-bold">
              {currentMonth.toLocaleString("default", { month: "long" })}
            </h2>
            <p>{currentMonth.getFullYear()}</p>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="p-6">

          {/* NAV */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1
                  )
                )
              }
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              ◀
            </button>

            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1
                  )
                )
              }
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              ▶
            </button>
          </div>

          {/* WEEK */}
          <div className="grid grid-cols-7 text-sm text-gray-600 mb-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* DAYS */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => (
              <DayCell
                key={i}
                day={day}
                onClick={handleClick}
                isStart={isSameDay(day, startDate)}
                isEnd={isSameDay(day, endDate)}
                inRange={isInRange(day)}
                isToday={isSameDay(day, today)}
              />
            ))}
          </div>

          {/* CLEAR BUTTON */}
          <button
            onClick={clearSelection}
            className="mt-3 text-sm text-red-500 hover:underline"
          >
            Clear Selection
          </button>

          {/* NOTES */}
          <Notes
            notes={notes}
            setNotes={setNotes}
            hasSelection={!!startDate}
          />
        </div>
      </div>
    </div>
  );
}