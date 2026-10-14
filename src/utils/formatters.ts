import { Currency, BulkTier } from '../types';
import { CURRENCY_RATES } from '../data/products';

export function formatPrice(amountUSD: number, currency: Currency = 'USD'): string {
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = amountUSD * rateInfo.rate;

  if (currency === 'COP') {
    return `${rateInfo.symbol} ${Math.round(converted).toLocaleString('es-CO')}`;
  }
  if (currency === 'MXN') {
    return `${rateInfo.symbol} ${converted.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (currency === 'EUR') {
    return `${rateInfo.symbol}${converted.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${rateInfo.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getTierForQuantity(quantity: number, tiers: BulkTier[], basePrice: number): { unitPrice: number, tierLabel: string, discount: number } {
  // Sort tiers by minQty descending
  const sorted = [...tiers].sort((a, b) => b.minQty - a.minQty);
  for (const tier of sorted) {
    if (quantity >= tier.minQty) {
      return {
        unitPrice: tier.pricePerUnit,
        tierLabel: tier.label,
        discount: tier.discountPercent
      };
    }
  }
  return { unitPrice: basePrice, tierLabel: 'Precio Regular', discount: 0 };
}
