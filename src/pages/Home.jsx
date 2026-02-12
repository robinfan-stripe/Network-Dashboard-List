import ComponentExamples from './ComponentExamples';

export default function Home() {
  return (
    <div className="p-8 space-y-12">
      <div>
        <h1 className="text-2xl font-semibold text-default mb-2">Home</h1>
        <p className="text-subdued">Edit <code className="bg-offset px-2 py-1 rounded text-sm">src/pages/home.jsx</code> to edit this page.</p>
      </div>

      <ComponentExamples />
    </div>
  );
}
