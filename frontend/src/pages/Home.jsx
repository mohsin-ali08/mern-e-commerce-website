import Hero from "../components/Layout/Hero"
import FeaturedCollection from "../components/Products/FeaturedCollection"
import FeaturesSection from "../components/Products/FeaturesSection"
import GenderCollectionSection from "../components/Products/GenderCollectionSection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductDetails from "../components/Products/ProductDetails"
import ProductGrid from "../components/Products/ProductGrid"


const Home = () => {

  const placeholderProducts = [
    { _id: 1, name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/400/500?random=1", altText: "Stylish Jacket" }] },
    { _id: 2, name: "Casual Hoodie", price: 100, images: [{ url: "https://picsum.photos/400/500?random=2", altText: "Casual Hoodie" }] },
    { _id: 3, name: "Trendy Sneakers", price: 150, images: [{ url: "https://picsum.photos/400/500?random=3", altText: "Trendy Sneakers" }] },
    { _id: 4, name: "Denim Jeans", price: 90, images: [{ url: "https://picsum.photos/400/500?random=4", altText: "Denim Jeans" }] },
    { _id: 5, name: "Classic Watch", price: 200, images: [{ url: "https://picsum.photos/400/500?random=5", altText: "Classic Watch" }] },
    { _id: 6, name: "Leather Bag", price: 180, images: [{ url: "https://picsum.photos/400/500?random=6", altText: "Leather Bag" }] },
    { _id: 7, name: "Summer Dress", price: 130, images: [{ url: "https://picsum.photos/400/500?random=7", altText: "Summer Dress" }] },
    { _id: 8, name: "Formal Shirt", price: 110, images: [{ url: "https://picsum.photos/400/500?random=8", altText: "Formal Shirt" }] },
  ]
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>

        {/* Best Seller Section! */}
         <h2 className="text-3xl text-center font-bold mb-4">Best Seller!</h2>
         <ProductDetails/>

         <div className="container mx-auto ">
          <h2 className="text-center font-bold mb-8 text-3xl">
            Top Wears for women!
          </h2>
          <ProductGrid products={placeholderProducts} />
         </div>
         <FeaturedCollection/>
         <FeaturesSection/>
    </div>
    
  )
}

export default Home