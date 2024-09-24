/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroBanner from "../../components/HeroBanner";
import CategoryProductCard from "../../components/CategoryProductCard";
import Title from "../../components/Title";
import ProductCard from "../../components/ProductCard";
import { useGetProductQuery } from "../../redux/Products/Products";
import { Pagination } from "antd";
import { SetStateAction, useState } from "react";

const Home = () => {

  const [CurrentPage, setCurrentPage] = useState(1);
  
  const onChange = (page: SetStateAction<number>, pageSize: number) => {
    console.log(page, pageSize);
    setCurrentPage(page);
  };


  const { data: TreeData } = useGetProductQuery({ 
    page : CurrentPage,
    Limit: 10
  });

  const uniqueCategoryData = TreeData?.Data.reduce((acc: any[], current: { category: any; }) => {
    const categoryExists = acc.find(
      (item) => item.category === current.category
    );

    if (!categoryExists) {
      acc.push(current);
    }

    return acc;
  }, []);


   

  return (
    <section>
      <HeroBanner />

      {/* product category list  */}
      <div>
        <Title text={`"Browse Tree Categories"`} />
        <div className="w-full  grid grid-cols-1 md:grid-cols-3 p-5 items-center justify-center gap-5">
          {uniqueCategoryData?.map((data: any) => (
            <CategoryProductCard
              key={data.id}
              TreeData={data}
            ></CategoryProductCard>
          ))}
        </div>
      </div>

      {/* Products list  */}
      <div>
        <Title text={`"Explore Our Tree Collection"`} />
        <div className="w-full p-2 md:p-0  grid grid-cols-1 md:grid-cols-3  items-center justify-center gap-5">
          {TreeData?.Data.map((data: any) => (
            <ProductCard
              key={data.id}
              redirectLink={`Product/${data._id}`}
              TreeData={data}
            ></ProductCard>
          ))}
        </div>
        <div className="flex items-center justify-center mt-4">
          <Pagination
            total={TreeData?.total}
            current={CurrentPage}
            onChange={(page, pageSize) => onChange(page, pageSize)}
          />
        </div>
      </div>

      {/* tree gellary  */}
      <div>
        <Title text={`"mosaic view"`}></Title>
        <div className="w-full  flex flex-wrap p-5 items-center justify-center ">
          {TreeData?.Data.map((data: { image: string | undefined; }) => (
            <img className="w-60 h-60" src={data.image} alt="Image" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
