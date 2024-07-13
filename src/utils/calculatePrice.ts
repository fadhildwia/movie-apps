export const calculatePrice = (releaseYearRange: string) => {
  const years = releaseYearRange.split('-');
  const startYear = parseInt(years[0]);

  const currentYear = new Date().getFullYear();
  const yearDifference = currentYear - startYear;

  const basePrice = 100000;

  const priceIncreasePer5Year = 100000;

  if (yearDifference <= 0) {
    return basePrice;
  } else {
    const decadeCount = Math.floor(yearDifference / 5);
    let priceIncrease = decadeCount * priceIncreasePer5Year;

    if (basePrice + priceIncrease > 1000000) {
      priceIncrease = 1000000 - basePrice;
    }

    return basePrice + priceIncrease;
  }
};
