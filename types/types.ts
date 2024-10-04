export type CoctailGlass = "Highball glass" | "Old-fashioned glass" | "Cocktail glass" | "Copper Mug" | "Whiskey Glass" | "Collins glass" | "Pousse cafe glass" | "Champagne flute" | "Whiskey sour glass" | "Brandy snifter" | "White wine glass" | "Nick and Nora Glass" | "Hurricane glass" | "Coffee mug" | "Shot glass" | "Jar" | "Irish coffee cup" | "Punch bowl" | "Pitcher" | "Pint glass" | "Cordial glass" | "Beer mug" | "Margarita/Coupette glass" | "Beer pilsner" | "Beer Glass" | "Parfait glass" | "Wine Glass" | "Mason jar" | "Margarita glass" | "Martini Glass" | "Balloon Glass" | "Coupe Glass"

export type CoctailCategory = "Cocktail" | "Ordinary Drink" | "Punch / Party Drink" | "Shake" | "Other / Unknown" | "Cocoa" | "Shot" | "Coffee / Tea" | "Homemade Liqueur" | "Soft Drink"

export type IngredientType = "Vodka" | "Gin" | "Rum" | "Spirit" | "Whisky" | "Syrup" | "Beer" | null | "Liqueur" | "Bitter" | "Brandy" | "Cider" | "Liquor" | "Beverage" | "Garnish" | "Sambuca" | "Whiskey" | "Liquer" | "Candy" | "Fruit" | "Soft Drink" | "Water" | "Mineral" | "Wine" | "Soda" | "Cream" | "Milk" | "Juice" | "Coffee" | "Sherry" | "Spice" | "Mix" | "Fortified Wine" | "Sauce" | "Tequila" | "Schnapps" | "Sugar" | "Stout" | "Alcopop" | "Cordial" | "Flower" | "Bitters" | "Aperitif" | "Cola" | "Rice wine" | "Sweet" | "Tea" | "Port" | "Vinegar" | "Confectionery" | "Vermouth" | "Mixer" | "Fruit Juice" | "Herb" | "Seasoning"

export type Ingredient = {
    id: number;
    name: string
    description: string
    alcohol: boolean
    type: IngredientType
    percentage: number
    imageUrl: string
    createdAt: Date
    updatedAt: Date
    measure: string
}

export type Coctail = {
    id: number;
    name: string
    instructions: string
    alcoholic: boolean
    category: CoctailCategory
    glass: CoctailGlass
    ingredients: Ingredient[]
    imageUrl: string
    createdAt: Date
    updatedAt: Date
}

export type Pagination = {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string
    previousPageUrl: string
}