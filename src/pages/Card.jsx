import { Trash2, ShoppingCart, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCardSummary, selectLanguageSummary } from "../store/selector";
import { removeFromCard, clearCard, addToCard } from "../store/slices/cardSlice";
import products from "../data/product.json";
import { translations } from "../translation/translation";

export function Card() {
  const dispatch = useDispatch();

  const { items, totalPrice, totalQuantity, isEmpty } = useSelector(selectCardSummary);
  const { lang } = useSelector(selectLanguageSummary);

  const t = translations[lang]?.card ?? translations.tr.card;
  const tCat = translations[lang]?.categories ?? translations.tr.categories;

  const getItemTotal = (item) => (item.price ?? 0) * (item.quantity ?? 0);

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col gap-12">
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100 transition-colors duration-300">
          {t.productsTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
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

                <div className="mt-auto flex items-center justify-between">
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
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors">
            {t.cartTitle}
          </h2>

          {!isEmpty && (
            <button
              onClick={() => dispatch(clearCard())}
              className="text-sm font-medium hover:underline transition-colors
              text-red-600 hover:text-red-700
              dark:text-red-400 dark:hover:text-red-300"
            >
              {t.clearCart}
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-60 rounded-xl border transition-colors
            bg-slate-50 border-slate-200 text-slate-400
            dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500">
            <ShoppingCart size={48} />
            <p className="mt-4 text-lg font-medium">{t.emptyTitle}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.cardItemId}
                  className="flex items-center gap-4 rounded-xl p-4 shadow-sm border transition-colors
                  bg-white border-slate-200 
                  dark:bg-slate-900 dark:border-slate-700"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover bg-slate-100 dark:bg-slate-800"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">
                      {t.quantityLabel}: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-slate-100 transition-colors">
                      ₺{getItemTotal(item).toLocaleString("tr-TR")}
                    </p>

                    <button
                      onClick={() => dispatch(removeFromCard(item.cardItemId))}
                      className="mt-2 text-sm hover:underline flex items-center gap-1 ml-auto transition-colors
                      text-red-600 hover:text-red-700
                      dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 size={16} />
                      {t.removeBtn}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl p-6 flex items-center justify-between border transition-colors
              bg-slate-50 border-slate-200 
              dark:bg-slate-800 dark:border-slate-700">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">
                  {t.totalProducts}
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100 transition-colors">
                  {totalQuantity}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">
                  {t.totalAmount}
                </p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 transition-colors">
                  ₺{totalPrice.toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Card;