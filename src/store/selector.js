import { createSelector } from "@reduxjs/toolkit";

export const selectAuthSummary = createSelector(
  [
    (state) => state.auth.user,
    (state) => state.auth.isAuthenticated,
  ],
  (user, isAuthenticated) => ({
    user,
    username: user?.username ?? "",
    isAuthenticated,
  })
);

export const selectCardSummary = createSelector(
  [
    (state) => state.card.items,
    (state) => state.card.totalPrice,
    (state) => state.card.totalQuantity,
  ],
  (items, totalPrice, totalQuantity) => {
    // Calculate item totals in the selector
    const itemsWithTotal = items.map(item => ({
      ...item,
      itemTotal: (item.price ?? 0) * (item.quantity ?? 0)
    }));

    return {
      items: itemsWithTotal,
      totalPrice,
      totalQuantity,
      isEmpty: items.length === 0,
    };
  }
);

export const selectThemeSummary = createSelector(
  [
    (state) => state.theme.mode,
  ],
  (mode) => ({
    mode,
    isDarkMode: mode === "dark",
  })
);

export const selectLanguageSummary = createSelector(
  [
    (state) => state.language.lang,
  ],
  (lang) => ({
    lang,
    isTR: lang === "tr",
  })
);