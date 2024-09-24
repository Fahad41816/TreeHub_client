 
import { NavLink } from "react-router-dom";

const CategoryProductCard = ({TreeData } : any) => {
  return (
    <> 
       
        <div className="max-w-[300px] cursor-pointer hover:shadow-lg bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          {/* <!-- Tree Image --> */}
          <NavLink to={`products?category=${TreeData.category}`}>
          <img className="w-full h-44 object-fill object-center" src={TreeData.image} alt="Tree Image"/>

          {/* <!-- Card Content --> */}
          <div className="p-4">
            {/* <!-- Title --> */}
            <h3 className="text-lg font-semibold text-gray-900">
                {TreeData.title}
            </h3> 
            {/* <!-- Price and Category --> */}
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">${TreeData.price}</span>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                {TreeData.category}
              </span>
            </div>

            <div className="mt-3 text-sm text-gray-500">
              <p>Height:  {TreeData.height} </p>
              <p>Age:  {TreeData.age} </p>
              <p>Sunlight:  {TreeData.sunlight_requirement}</p>
            </div>
 
          </div>
          </NavLink>
        </div>
 
    </>
  );
};

export default CategoryProductCard;
