export default function BlogPage() {
  return (
    <div className="container mx-auto my-8 px-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="col-span-1 grid grid-cols-1 gap-8 lg:col-span-8 lg:grid-cols-2 bg-green-300">
          <p className="bg-red-300">main1 </p>
          <p className="bg-red-300">main2 </p>
          <p className="bg-red-300">main3 </p>
          <p className="bg-red-300">main4 </p>
          <p className="bg-red-300">main5 </p>
        </div>
        <div className="col-span-1 lg:col-span-4 bg-gray-500">
          <div className="relative top-8 lg:sticky">
            <p>Categories </p>
            <p>Recientes </p>
          </div>
        </div>
      </div>
    </div>
  );
}
