import { useOutletContext, Link } from 'react-router-dom';
import { Products } from '../App';
import Button from '../components/Button';

const ProductList = ({ filterCategory, products, onClickProps }: { filterCategory: (categoryId: string) => void; products: Products[]; onClickProps: () => void }) => {
  const { category } = useOutletContext<{ category: string | null }>();

  const storedProduct = localStorage.getItem('product');
  console.log('product', storedProduct);

  const filteredProducts = category ? products.filter((product) => product.category.name.toLowerCase().includes(category.toLowerCase())) : products;

  return (
    <>
      <h1 className="text-start text-4xl m-5 ms-0">Product List</h1>

      <div className="flex flex-col justify-between md:flex-row">
        <aside className=" mt-3 p-3  md:h-full  gap-2 bg-zinc-900 border border-zinc-700 rounded-xl">
          <h2>Categories:</h2>
          <ul className="flex flex-col gap-1 mt-1">
            <Link to="/product" className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full" onClick={() => filterCategory('')}>
              All
            </Link>
            <Link to="/product?category=clothes" className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full" onClick={() => filterCategory('1')}>
              Clothes
            </Link>
            <Link to="/product?category=electronics" className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full" onClick={() => filterCategory('2')}>
              Electronics
            </Link>
            <Link to="/product?category=furniture" className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full" onClick={() => filterCategory('3')}>
              Furniture
            </Link>
            <Link to="/product?category=shoes" className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full" onClick={() => filterCategory('4')}>
              Shoes
            </Link>
            <Link to="/product?category=miscellaneous" className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full" onClick={() => filterCategory('5')}>
              Miscellaneous
            </Link>
          </ul>
        </aside>

        <section>
          <div className="p-3 flex flex-wrap gap-3 rounded-xl max-w-4xl justify-center">
            {filteredProducts.map((products) => (
              <div key={products.id} className="p-4 max-w-64 items justify-between flex flex-col gap-4 bg-zinc-900 rounded-xl border border-zinc-700">
                <div>
                  <Link to={`${products.id}`}>
                    <img src={products.images[0]} alt={products.title} className="rounded-lg w-72 self-stretch mb-2 object-cover" />
                  </Link>

                  <h2 className="font-semibold text-start">{products.title}</h2>
                  {/* <p>{products.description}</p> */}
                  <span className="bg-neutral-900 mt-2 flex items-start w-max border border-zinc-600 rounded-2xl text-xs p-1 px-2">{products.category.name.replace(/\d+/g, '')}</span>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold text-start">$ {products.price}</p>

                    <Button onClickProps={onClickProps}>Add to cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductList;
