import mensCollectionImage from "../../assets/mens-collection.webp";
import womenCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className=" py-5 md:py-16 px-5">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Women Collection */}
        <div className="relative flex-1">
          <img
            src={womenCollectionImage}
            alt="womenCollection"
            className="w-full h-[500px] md:h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-80 px-6 py-3 rounded-lg shadow-lg">
            <h2 className="font-bold text-xl text-gray-900 mb-3">
              Women&apos;s Collection
            </h2>
            <button className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition">
              Shop Now
            </button>
          </div>
        </div>

        {/* Men Collection */}
        <div className="relative flex-1">
          <img
            src={mensCollectionImage}
            alt="mensCollection"
            className="w-full h-[500px] md:h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-60 px-5 py-3 rounded-lg shadow-lg">
            <h2 className="font-bold text-2xl text-gray-900 mb-3">
              Men&apos;s Collection
            </h2>
            <button className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
