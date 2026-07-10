import MainLayout from "../../layouts/MainLayout/MainLayout";
import Hero from "../../components/Hero/Hero";
import PopularCalculators from "../../components/popularCalculators/PopularCalculators";
import Features from "../../components/Features/Features";
import SearchBar from "../../components/SearchBar/SearchBar";
const Home = () => {
  return (
    <MainLayout>

   <Hero/>
    <PopularCalculators/>
    <Features/>
    <SearchBar/>
    </MainLayout>
  );
};

export default Home;