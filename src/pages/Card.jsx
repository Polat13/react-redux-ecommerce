import { Trash2, ShoppingCart, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCardSummary, selectLanguageSummary } from "../store/selector";
import { removeFromCard, clearCard, incrementQuantity, decrementQuantity } from "../store/slices/cardSlice";
import { translations } from "../translation/translation";

export function Card() {
  const dispatch = useDispatch();

  const { items, totalPrice, totalQuantity, isEmpty } = useSelector(selectCardSummary);
  const { lang } = useSelector(selectLanguageSummary);

  const t = translations[lang]?.card ?? translations.tr.card;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <section>
        <div className="flex items-center justify-between pb-6">
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
          <div className="flex flex-col items-center justify-center h-60 rounded-xl border transition-colors gap-4
            bg-slate-50 border-slate-200 text-slate-400
            dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500">
            <ShoppingCart size={48} />
            <p className="text-lg font-medium">{t.emptyTitle}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-8">
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

                    <div className="flex-1 flex flex-col gap-2">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 transition-colors">
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            item.quantity === 1
                              ? dispatch(removeFromCard(item.cardItemId))
                              : dispatch(decrementQuantity(item.cardItemId))
                          }
                          className={`p-1.5 rounded-lg transition-colors
                        ${item.quantity === 1
                              ? 'bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
                            }`}
                        >
                          {item.quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                        </button>

                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100 min-w-[3ch] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => dispatch(incrementQuantity(item.cardItemId))}
                          className="p-1.5 rounded-lg transition-colors
                        bg-indigo-100 hover:bg-indigo-200 text-indigo-700
                        dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 transition-colors">
                        ₺{item.itemTotal.toLocaleString("tr-TR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-6 flex items-center justify-between border transition-colors
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
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Card;