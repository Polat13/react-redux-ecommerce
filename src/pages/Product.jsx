import { Plus, Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguageSummary } from "../store/selector";
import { addToCard } from "../store/slices/cardSlice";
import products from "../data/product.json";
import { translations } from "../translation/translation";

export function Product() {
    const dispatch = useDispatch();
    const { lang } = useSelector(selectLanguageSummary);
    const searchInputRef = useRef(null);

    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const t = translations[lang]?.product ?? translations.tr.product;
    const tCat = translations[lang]?.categories ?? translations.tr.categories;

    // Filter products based on search query
    const filteredProducts = searchQuery.trim()
        ? products.filter((product) => {
            const query = searchQuery.toLowerCase();
            const title = product.title.toLowerCase();
            const category = (tCat[product.category] || product.category).toLowerCase();
            return title.includes(query) || category.includes(query);
        })
        : products;

    // Auto-focus input when search expands
    useEffect(() => {
        if (isSearchExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchExpanded]);

    const handleClearSearch = () => {
        setSearchQuery("");
        setIsSearchExpanded(false);
    };

    const ProductCard = ({ product }) => (
        <div
            className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col border
      bg-white border-slate-200 
      dark:bg-slate-900 dark:border-slate-700"
        >
            <div className="relative w-full overflow-hidden pb-[75%] border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div className="p-5 flex flex-col gap-3 flex-1">
                <span className="text-xs font-semibold px-3 py-1 rounded-full w-fit border transition-colors
          bg-indigo-50 text-indigo-600 border-indigo-100
          dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800">
                    {tCat[product.category] || product.category}
                </span>

                <h3 className="font-semibold text-slate-900 dark:text-slate-100 transition-colors">
                    {product.title}
                </h3>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-100 transition-colors">
                        ₺{product.price.toLocaleString("tr-TR")}
                    </span>

                    <button
                        onClick={() =>
                            dispatch(
                                addToCard({
                                    id: product.id,
                                    title: product.title,
                                    price: product.price,
                                    image: product.image,
                                })
                            )
                        }
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition active:scale-95 text-white
            bg-indigo-600 hover:bg-indigo-700 
            dark:bg-indigo-600 dark:hover:bg-indigo-500"
                    >
                        <Plus size={18} />
                        {t.addBtn}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            <section className="flex flex-col gap-6">
                {/* Header with Expandable Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                        {t.title}
                    </h2>

                    {/* Expandable Search Bar */}
                    <div className="flex items-center gap-2 sm:flex-1 sm:justify-end">
                        <div
                            className={`flex items-center gap-2 rounded-xl border transition-all duration-300 overflow-hidden
              bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-700
              ${isSearchExpanded ? 'w-full sm:w-80' : 'w-0'}`}
                        >
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.searchPlaceholder}
                                className={`flex-1 px-4 py-2 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500
                focus:outline-none transition-all duration-300
                ${isSearchExpanded ? 'opacity-100' : 'opacity-0'}`}
                            />
                            {searchQuery && (
                                <button
                                    onClick={handleClearSearch}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 active:scale-95 shadow-lg whitespace-nowrap
              ${isSearchExpanded
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-slate-300/30 dark:shadow-slate-700/30'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30 dark:bg-indigo-600 dark:hover:bg-indigo-500'
                                }`}
                        >
                            <Search size={18} />
                            <span className="hidden sm:inline">{isSearchExpanded ? t.closeSearch : t.searchBtn}</span>
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center h-60 text-slate-400 dark:text-slate-500 gap-4">
                            <Search size={48} />
                            <p className="text-lg font-medium">{t.noResults}</p>
                            <p className="text-sm">{t.tryDifferent}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Product;
