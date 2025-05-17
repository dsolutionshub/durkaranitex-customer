export default function Section({title, desc, section}) {
  return (
    <div className="h-full p-10">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-black">{title}</h2>
        {desc && <p className="text-lg text-black mt-2">{desc}</p>}
        <div className="mt-8">
        {section}
        </div>
      </div>
    </div>
  );
}
