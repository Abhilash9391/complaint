import { type JSX } from "react";

export function Segment({ title,onclick }: { title: string,onclick : any }): JSX.Element {
  return (
    <div className="flex justify-center items-center p-4 bg-blue-500 text-white text-xl font-semibold rounded-lg shadow-md">
       <button onClick = {onclick}>{title}</button>
    </div>
  );
}
