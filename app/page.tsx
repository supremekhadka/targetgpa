"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/assets/logo.png";

type SemesterGPA = string;
type TargetGPA = string;

export default function Home() {
  const [semesters, setSemesters] = useState<SemesterGPA[]>(Array(8).fill(""));
  const [targetGPA, setTargetGPA] = useState<TargetGPA>("");
  const [result, setResult] = useState<string | null>(null);

  const handleSemesterChange = (index: number, value: SemesterGPA) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index] = value;
    setSemesters(updatedSemesters);
  };

  const calculateRemainingGPA = () => {
    const completedSemesters = semesters
      .filter((gpa) => gpa !== "")
      .map(Number);
    const nCompleted = completedSemesters.length;

    if (nCompleted === 0) {
      setResult("Please enter at least one GPA.");
      return;
    }

    const currentGPA =
      completedSemesters.reduce((acc, gpa) => acc + gpa, 0) / nCompleted;
    const remainingGPA =
      (parseFloat(targetGPA) * 8 - currentGPA * nCompleted) / (8 - nCompleted);

    if (remainingGPA > 4 || remainingGPA < 0) {
      setResult(
        `The target GPA isn't achievable (${remainingGPA.toFixed(
          2
        )} average). Adjust your target.`
      );
    } else {
      setResult(
        `You need an average GPA of ${remainingGPA.toFixed(
          2
        )} in the remaining semesters.`
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen min-h-max my-2">
      <div className="dark:bg-gray-950 bg-gray-50 shadow-md rounded-lg p-8 min-w-[20rem] w-[30rem]">
        <h1 className="text-2xl font-bold text-center mb-8 flex justify-center items-center gap-1">
          <Image src={logo} alt="TargetGPA Logo" width={35} height={35} />
          <span>TargetGPA</span>
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {semesters.map((gpa, index) => (
            <div key={index}>
              <label className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-50">
                Semester {index + 1} GPA:
              </label>
              <input
                type="number"
                value={gpa}
                min="0"
                max="4"
                step={0.01}
                onChange={(e) => handleSemesterChange(index, e.target.value)}
                className="border border-gray-300 p-2 rounded w-full appearance-none text-gray-950 "
              />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <label className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-50">
            Target GPA:
          </label>
          <input
            type="number"
            value={targetGPA}
            min="0"
            max="4"
            onChange={(e) => setTargetGPA(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full text-gray-950 "
          />
        </div>

        <button
          onClick={calculateRemainingGPA}
          className="mt-4 w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition-all duration-150"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 bg-white p-4 rounded shadow-md w-full text-gray-950 ">
            <h3 className="text-lg font-medium">{result}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
