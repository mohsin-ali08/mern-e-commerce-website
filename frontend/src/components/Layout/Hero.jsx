import { Link } from 'react-router-dom';
import heroImg from '../../assets/rabbit-hero.webp';

const Hero = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[600px] lg:h-[720px]">
      {/* Background Image */}
      <img 
        src={heroImg}  
        alt="Rabbit" 
        className="w-full h-full object-cover"
      />

      {/* Overlay (black filter) */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-8xl tracking-tighter uppercase font-bold mb-4">Vacation  <br /> Ready </h1>
        <p className="max-w-2xl text-base md:text-lg mb-6">
          Discover amazing places, book your trips, and create unforgettable memories.
        </p>
        <Link to="/collection/all" className="bg-white hover:text-white hover:bg-yellow-400 border-gray-700 text-black font-semibold px-8 py-2 rounded-lg shadow-md transition">
          Shop Now !
        </Link>
      </div>
    </section>
  );
};

export default Hero;
